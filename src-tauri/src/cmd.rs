use std::{os::windows::process::CommandExt, process::Command};

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use tokio::process::Command as AsyncCommand;

pub struct ProcessManager {
    processes: HashMap<String, u32>,
}

impl ProcessManager {
    pub fn new() -> Self {
        ProcessManager {
            processes: HashMap::new(),
        }
    }

    pub fn run_cmd_background(
        &mut self,
        key: &str,
        service_ip: String,
        v_key: String,
    ) -> Result<(), std::io::Error> {
        let mut command = AsyncCommand::new("cmd");
        command.creation_flags(0x08000000);
        let command_str = format!("npc -server={} -vkey={} -type=tcp", service_ip, v_key);
        let process = command
            .arg("/C")
            .arg(command_str)
            .arg("&&")
            .arg("pause")
            .spawn()?;
        if let Some(pid_result) = process.id() {
            self.processes.insert(key.to_string(), pid_result);
            println!("{}", pid_result)
        }
        Ok(())
    }

    fn close_cmd(&mut self, key: &str) -> Result<(), std::io::Error> {
        if let Some(pid) = self.processes.remove(key) {
            self.kill_cmd_process(pid)?;
        }
        Ok(())
    }

    fn kill_cmd_process(&self, pid: u32) -> Result<(), std::io::Error> {
        Command::new("taskkill")
            .creation_flags(0x08000000)
            .args(&["/F", "/T", "/PID", &pid.to_string()])
            .output()
            .expect("failed to execute taskkill");
        Ok(())
    }
}

#[tauri::command]
pub fn run_cmd(
    process_manager: tauri::State<Arc<Mutex<ProcessManager>>>,
    service_ip: String,
    v_key: String,
) -> i32 {
    let mut manager = process_manager.lock().unwrap();
    manager.close_cmd("gyndowind").expect("failed to close cmd");
    manager
        .run_cmd_background("gyndowind", service_ip, v_key)
        .expect("failed to run cmd");
    0
}

#[tauri::command]
pub fn close_cmd(process_manager: tauri::State<Arc<Mutex<ProcessManager>>>) {
    let mut manager = process_manager.lock().unwrap();
    manager.close_cmd("gyndowind").expect("failed to close cmd");
    std::process::exit(0);
}
