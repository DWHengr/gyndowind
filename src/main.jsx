import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider} from "antd";
import {appWindow} from "@tauri-apps/api/window";

//居中
await appWindow.center();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <ConfigProvider theme={
                {
                    components: {
                        Message: {
                            contentBg: '#d9d9d9'
                        }
                    }
                }
            }>
                <App/>
            </ConfigProvider>
        </Router>
    </React.StrictMode>,
);
