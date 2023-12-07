import {invoke} from "@tauri-apps/api/tauri";

export function runCmd(serviceIp, vKey) {
    invoke("run_cmd", {serviceIp: serviceIp, vKey: vKey}).then((res) => {
    });
}

export function closeCmd() {
    console.log(1)
    invoke("close_cmd", {}).then((res) => {
    });
}