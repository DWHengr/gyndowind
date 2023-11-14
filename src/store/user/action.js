import * as type from "./type";

export const setUser = (token, username, avatar, serviceIp) => {
    return {
        type: type.Set_Token, token: token, username: username, avatar: avatar, serviceIp: serviceIp
    };
};

export const initUser = () => {
    return {
        type: type.Init_User,
    };
};

export const clearUser = () => {
    return {
        type: type.Clear_User,
    };
};

export const setUserAvatar = (avatar) => {
    return {
        type: type.Set_Avatar, avatar: avatar,
    };
};
