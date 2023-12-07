import {invoke} from "@tauri-apps/api/tauri";

export function runCmd(serviceIp, vKey) {
    return invoke("run_cmd", {serviceIp: serviceIp, vKey: vKey});
}

export function closeCmd() {
    invoke("close_cmd", {}).then((res) => {
    });
}