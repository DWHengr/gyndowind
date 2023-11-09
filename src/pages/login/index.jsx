import "./index.css"
import BorderInput from "../../components/BorderInput/index.jsx";
import {useHistory} from "react-router";
import FullButton from "../../components/FullButton/index.jsx";

export default function Login() {

    const h = useHistory();

    return (
        <div className="login-container">
            <BorderInput placeholder="用户名"/>
            <BorderInput placeholder="密码" type="password"/>
            <FullButton onClick={() => h.push("/home")}>登 录</FullButton>
        </div>
    )
}