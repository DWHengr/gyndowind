import * as type from "./type";

let defaultState = {
    token: "", isLogin: false, username: "", avatar: "", serviceIp: "",
};

export const userData = (state = defaultState, action) => {
    switch (action.type) {
        case type.Init_User:
            let tokenData = localStorage.getItem("token");
            let usernameDate = localStorage.getItem("username");
            let avatarDate = localStorage.getItem("avatar");
            let serviceIpData = localStorage.getItem("serviceIp");
            let isLoginData = false;
            if (tokenData) isLoginData = true;
            return {
                ...state, ...{
                    token: tokenData,
                    isLogin: isLoginData,
                    username: usernameDate,
                    avatar: avatarDate,
                    serviceIp: serviceIpData
                },
            };
        case type.Set_Token:
            localStorage.setItem("token", action.token);
            localStorage.setItem("username", action.username);
            localStorage.setItem("avatar", action.avatar);
            localStorage.setItem("serviceIp", action.serviceIp);
            return {...state, ...action, ...{isLogin: true}};
        case type.Clear_User:
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("avatar");
            localStorage.removeItem("serviceIp");
            return {...state, ...{token: "", isLogin: false, avatar: ""}};
        case type.Set_Avatar:
            localStorage.setItem("avatar", action.avatar);
            return {...state, ...{avatar: action.avatar}};
        default:
            return state;
    }
};
