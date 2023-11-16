import Http from "../utils/api";

export default {
    getTunnelList() {
        return Http.get("/api/tunnel/list");
    }
};
