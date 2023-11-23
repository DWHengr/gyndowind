import Http from "../utils/api";

export default {
    getTunnelList() {
        return Http.get("/api/tunnel/list");
    },

    editTunnel(param) {
        return Http.post("/api/tunnel/edit", param);
    },

    startTunnel(param) {
        return Http.post("/api/tunnel/start", param);
    },

    stopTunnel(param) {
        return Http.post("/api/tunnel/stop", param);
    }
};
