import Http from "../utils/api";

export default {
    getTunnelList() {
        return Http.get("/api/tunnel/list");
    },

    editTunnel(param) {
        console.log(param)
        return Http.post("/api/tunnel/edit", param);
    }
};
