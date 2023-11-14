import "./index.css"
import BorderInput from "../../components/BorderInput/index.jsx";
import {useHistory} from "react-router";
import FullButton from "../../components/FullButton/index.jsx";
import React, {useState} from "react";
import User from "../../api/user.js";
import {setUser} from "../../store/user/action.js";
import {useDispatch} from "react-redux";
import {useMsg} from "../../components/Msg/index.jsx";

export default function Login() {

    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const h = useHistory();
    const dispatch = useDispatch();
    const Msg = useMsg();

    const onLogin = () => {
        if (!account) {
            Msg.onErrorMsg("用户名不能为空~")
            return;
        }
        if (!password) {
            Msg.onErrorMsg("密码不能为空~")
            return;
        }
        User.login({account, password})
            .then((res) => {
                if (res.code === 0) {
                    dispatch(setUser(res.data.token, res.data.username, res.data.avatar));
                    h.push("/home")
                } else {
                    Msg.onErrorMsg(res.msg)
                }
            })
            .catch((e) => {
                Msg.onErrorMsg(e.message)
            })
    }

    return (<div className="login-container">
        <BorderInput value={account} onChange={(v) => setAccount(v)} placeholder="用户名"/>
        <BorderInput value={password} onChange={(v) => setPassword(v)} placeholder="密码" type="password"/>
        <FullButton onClick={onLogin}>登 录</FullButton>
    </div>)
}