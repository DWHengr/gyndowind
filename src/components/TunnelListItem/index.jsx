import {Switch, Tooltip} from "antd";
import {CopyTwoTone} from "@ant-design/icons";
import React from "react";
import "./index.css";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {useMsg} from "../Msg/index.jsx";

export default function TunnelListItem({item, serviceIp, checked, onSwitch}) {
    const Msg = useMsg();
    const onCopy = () => {
        Msg.onSucceedMsg("复制成功");
    }

    return (<>
        <div className={`tunnel-list-item ${checked ? "tunnel-list-item-checked" : ""}`}>
            <div style={{marginRight: 10, marginLeft: 10, width: "100%", display: "flex"}}>
                <div style={{width: 370}}>
                    <div style={{display: "flex", alignItems: 'center'}}>
                        <Tooltip placement="right" title={item.remark}>
                            <div style={{
                                fontSize: 18,
                                whiteSpace: "nowrap",
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: 120,
                                cursor: 'pointer'
                            }}>
                                {item.remark}
                            </div>
                        </Tooltip>
                        <div style={{
                            fontSize: 12, color: '#5d5f63', marginLeft: 8
                        }}>
                            外网IP:{serviceIp}
                        </div>
                        <div style={{
                            fontSize: 12, color: '#5d5f63', marginLeft: 8
                        }}>
                            外网端口:{item.port}
                        </div>
                        <CopyToClipboard text={`${serviceIp}:${item.port}`} onCopy={onCopy}>
                            <div style={{marginLeft: 5, cursor: 'pointer'}}>
                                <CopyTwoTone twoToneColor="#5d5f63"/>
                            </div>
                        </CopyToClipboard>
                    </div>
                    <div style={{verticalAlign: 'bottom', marginTop: 10}}>
                        <span>内网IP：{item.target.targetStr.split(':')[0]}</span>
                        <span style={{marginLeft: 15}}>内网端口：{item.target.targetStr.split(':')[1]}</span>
                    </div>
                </div>
                <div style={{
                    flexGrow: 1, display: "grid", placeItems: "center"
                }}>
                    <div>
                        <Switch checkedChildren="启用"
                                unCheckedChildren="关闭"
                                defaultChecked={item.status}
                                onChange={(checked) => {
                                    if (onSwitch) onSwitch(checked, item)
                                }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>)
}