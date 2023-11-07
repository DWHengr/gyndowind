import React, {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {App as AppAntd} from 'antd';

function App() {
    return (
        <AppAntd>
            <div className="main-container">
                <div data-tauri-drag-region className="navigation-bar"></div>
                <div className="content-container">
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Redirect path="/" to="/home"/>
                    </Switch>
                </div>
            </div>
        </AppAntd>
    )
}

export default App;
