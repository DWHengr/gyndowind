import React, {useEffect, useState} from "react";
import "./index.css";
import BorderButton from "../../components/BorderButton/index.jsx";
import LabelInput from "../../components/LabelInput/index.jsx";
import Tunnel from "../../api/tunnel.js";
import TunnelList from "../../components/TunnelList/index.jsx";
import {useMsg} from "../../components/Msg/index.jsx";
import {useSelector} from "react-redux";
import {Empty, Tooltip} from "antd";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import TextButton from "../../components/TextButton/index.jsx";


export default function Home() {

    const userDate = useSelector((state) => state.userData);
    const [tunnels, setTunnels] = useState([]);
    const [currentTunnel, setCurrentTunnel] = useState(null);
    const Msg = useMsg();

    useEffect(() => {
        getTunnelList();
    }, [])

    const getTunnelList = () => {
        Tunnel.getTunnelList()
            .then(res => {
                if (res.code === 0) {
                    console.log(res)
                    setTunnels(res.data)
                } else {
                    Msg.onErrorMsg(res.msg)
                }
            })
            .catch(e => {
                Msg.onErrorMsg(e.message)
            })
    }

    return (<div className="home-container">
        <div className="left-container">
            <div style={{margin: "15px 10px 15px 20px"}}>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <div>内网穿透（{tunnels.length}）</div>
                    <div style={{display: "flex", marginRight: 20}}>
                        <TextButton icon={<PlusOutlined/>} label="新增"/>
                        <TextButton
                            icon={<SyncOutlined/>}
                            label="刷新"
                            onClick={() => {
                                getTunnelList()
                                Msg.onSucceedMsg("刷新成功~")
                            }}
                        />
                    </div>
                </div>
                {!tunnels.length && <Empty style={{marginTop: 80}} description="暂无隧道..." image="./empty.svg"/>}
                <div style={{overflowY: 'scroll', height: 360}}>
                    {tunnels.length && <TunnelList
                        onChecked={(v) => setCurrentTunnel(v)}
                        list={tunnels}
                        serviceIp={userDate.serviceIp}
                    />}
                </div>
            </div>
        </div>
        {currentTunnel && <div className="right-container">
            <div style={{margin: "15px 20px"}}>
                <div style={{display: "flex"}}>
                    <BorderButton style={{marginRight: 12}}>保存</BorderButton>
                    <BorderButton>删除</BorderButton>
                </div>
                <div style={{marginTop: 10}}>
                    <LabelInput value={userDate.serviceIp}>外网IP：</LabelInput>
                    <LabelInput value={currentTunnel.port}>外网端口：</LabelInput>
                    <LabelInput value={currentTunnel.mode}>类型:</LabelInput>
                    <LabelInput value={currentTunnel.remark} readOnly={false}>服务名称：</LabelInput>
                    <LabelInput value={currentTunnel.target.targetStr.split(':')[0]}
                                readOnly={false}>内网IP：</LabelInput>
                    <LabelInput value={currentTunnel.target.targetStr.split(':')[1]}
                                readOnly={false}>内网端口：</LabelInput>
                </div>
            </div>
        </div>}
    </div>);
}
