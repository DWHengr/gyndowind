import React, {useEffect} from "react";
import "./App.css";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import {Redirect, Route, Switch} from "react-router-dom";
import {App as AppAntd, Avatar} from 'antd';
import {CloseOutlined, MinusOutlined, UserOutlined} from "@ant-design/icons";
import ButtonIcon from "./components/ButtonIcon/index.jsx";
import {appWindow} from '@tauri-apps/api/window'
import OptionListPopover from "./components/OptionListPopover/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearUser, initUser} from "./store/user/action.js";
import Msg from "./components/Msg/index.jsx";
import {closeCmd} from "./utils/cmd.js";
import {listen} from '@tauri-apps/api/event'

await listen('quit', (event) => {
    closeCmd()
})

function App() {
    const userDate = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initUser());
    }, [])

    function PrivateRoute({component: Component, ...rest}) {
        const token = localStorage.getItem("token");
        if (!token) dispatch(clearUser());
        return (<Route
            {...rest}
            render={(props) => token ? <Component {...props} /> : <Redirect to="/login"/>}
        />);
    }

    const NavigationBar = () => {
        return (<div data-tauri-drag-region className="navigation-bar">
            <div style={{
                display: "flex",
                userSelect: 'none',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
            }}>
                <img style={{height: 50, marginLeft: 20}} src="/icon.png"/>
                <div style={{marginLeft: 5}}>
                    <div style={{color: "#060C21", fontSize: 18, fontWeight: 600, marginBottom: -8}}>筋斗云</div>
                    <div style={{color: "#060C21", fontSize: 12}}>Gyndowind</div>
                </div>
            </div>
            <div style={{justifyContent: 'end', display: "flex", alignItems: 'center'}}>
                {userDate.isLogin &&
                    <OptionListPopover
                        titleContent={<div>{userDate.username}</div>}
                        options={[{
                            label: '个人中心', onClick: () => console.log(2)
                        }, {
                            label: '退出登录', onClick: () => {
                                dispatch(clearUser());
                                h.push("/login");
                            }
                        },]}
                    >
                        <Avatar style={{margin: 8}} size={38} icon={<UserOutlined/>}/>
                    </OptionListPopover>
                }
                <ButtonIcon
                    icon={<MinusOutlined style={{fontSize: 25, color: "#060C21"}}/>}
                    onClick={() => {
                        appWindow.minimize()
                    }}
                />
                <ButtonIcon
                    icon={<CloseOutlined style={{fontSize: 25, color: "#060C21"}}/>}
                    onClick={() => {
                        appWindow.hide()
                    }}
                />
            </div>
        </div>)
    }

    return (
        <AppAntd>
            <Msg>
                <div className="main-container">
                    <NavigationBar/>
                    <div className="content-container">
                        <Switch>
                            <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
                            <Route path="/login" component={Login}></Route>
                            <Redirect path="/" to="/home"/>
                        </Switch>
                    </div>
                </div>
            </Msg>
        </AppAntd>
    )
}

export default App;
