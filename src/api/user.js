import Http from "../utils/api";

export default {
    login(param) {
        return Http.post("/api/user/login", param);
    }
};
