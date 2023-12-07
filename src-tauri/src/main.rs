// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use tauri::{
    api, AppHandle, CustomMenuItem, GlobalWindowEvent, Manager, SystemTray, SystemTrayEvent,
    SystemTrayMenu, SystemTrayMenuItem, Wry,
};

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

mod cmd;

use std::sync::{Arc, Mutex};

fn main() {
    let process_manager = Arc::new(Mutex::new(cmd::ProcessManager::new()));
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .manage(process_manager)
        .invoke_handler(tauri::generate_handler![cmd::run_cmd, cmd::close_cmd,])
        .system_tray(SystemTray::new().with_menu(tray_menu()))
        .on_system_tray_event(system_tray_event)
        .on_window_event(window_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn window_event(e: GlobalWindowEvent) {
    match e.event() {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            e.window().hide().unwrap();
            api.prevent_close();
        }
        _ => {}
    }
}

// tray menu
fn tray_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏");
    let show = CustomMenuItem::new("show".to_string(), "显示");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    tray_menu
}

// system tray event fn
fn system_tray_event(app: &AppHandle<Wry>, e: SystemTrayEvent) {
    match e {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                app.emit_all("quit", "").unwrap();
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            "show" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
