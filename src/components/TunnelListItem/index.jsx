import {Switch, Tooltip} from "antd";
import {CheckCircleTwoTone, CopyTwoTone} from "@ant-design/icons";
import React from "react";
import "./index.css";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {App} from 'antd';

export default function TunnelListItem() {
    const {message} = App.useApp();
    const onCopy = () => {
        message.open({
            type: 'success',
            content: '复制成功',

            duration: 1.2,
            icon: <CheckCircleTwoTone twoToneColor="#394773FF" style={{fontSize: 20}}/>
        })

    }

    return (
        <>
            <div className="tunnel-list-item">
                <div style={{marginRight: 10, marginLeft: 10, width: "100%", display: "flex"}}>
                    <div style={{width: 360}}>
                        <div style={{display: "flex", alignItems: 'center'}}>
                            <Tooltip placement="right" title="工单服务工单工单服务工单">
                                <div style={{
                                    fontSize: 18,
                                    whiteSpace: "nowrap",
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: 110,
                                    cursor: 'pointer'
                                }}>
                                    工单服务工单工单服务工单
                                </div>
                            </Tooltip>
                            <div style={{
                                fontSize: 12,
                                color: '#060c21',
                                marginLeft: 8
                            }}>
                                外网IP:192.123.12.1
                            </div>
                            <div style={{
                                fontSize: 12,
                                color: '#5d5f63',
                                marginLeft: 8
                            }}>
                                外网端口:34999
                            </div>
                            <CopyToClipboard text="测试数据111" onCopy={onCopy}>
                                <div style={{marginLeft: 5, cursor: 'pointer'}}>
                                    <CopyTwoTone twoToneColor="#5d5f63"/>
                                </div>
                            </CopyToClipboard>
                        </div>
                        <div style={{verticalAlign: 'bottom', marginTop: 10}}>
                            <span>内网IP：192.123.12.1</span>
                            <span style={{marginLeft: 15}}>内网端口：8080</span>
                        </div>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        display: "grid",
                        placeItems: "center"
                    }}>
                        <div>
                            <Switch checkedChildren="启用"
                                    unCheckedChildren="关闭"
                                    defaultChecked/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}