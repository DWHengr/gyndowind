import React from "react";
import "./index.css";
import TunnelListItem from "../../components/TunnelListItem/index.jsx";
import BorderButton from "../../components/BorderButton/index.jsx";
import LabelInput from "../../components/LabelInput/index.jsx";


export default function Home() {
    return (
        <div className="home-container">
            <div className="left-container">
                <div style={{margin: "15px 10px 15px 20px"}}>
                    <div>内网穿透（2）</div>
                    <div style={{overflowY: 'scroll', height: 360}}>
                        <TunnelListItem></TunnelListItem>
                        <TunnelListItem></TunnelListItem>
                        <TunnelListItem></TunnelListItem>
                        <TunnelListItem></TunnelListItem>
                        <TunnelListItem></TunnelListItem>
                        <TunnelListItem></TunnelListItem>
                    </div>
                </div>
            </div>
            <div className="right-container">
                <div style={{margin: "15px 20px"}}>
                    <div style={{display: "flex"}}>
                        <BorderButton style={{marginRight: 12}}>保存</BorderButton>
                        <BorderButton>删除</BorderButton>
                    </div>
                    <div style={{marginTop: 10}}>
                        <LabelInput value="192.123.12.1">外网IP：</LabelInput>
                        <LabelInput value="999">外网端口：</LabelInput>
                        <LabelInput value="TCP">类型:</LabelInput>
                        <LabelInput value="工单服务服务" readOnly={false}>服务名称：</LabelInput>
                        <LabelInput value="127.0.0.1" readOnly={false}>内网IP：</LabelInput>
                        <LabelInput value="8080" readOnly={false}>内网端口：</LabelInput>
                    </div>
                </div>
            </div>
        </div>
    );
}
