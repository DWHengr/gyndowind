import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider} from "antd";
import {appWindow} from "@tauri-apps/api/window";
import store from "./store/index.jsx";
import {Provider} from "react-redux";

//居中
await appWindow.center();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
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
        </Provider>
    </React.StrictMode>,
);
