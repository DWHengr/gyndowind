import "./index.css"
import TunnelListItem from "../TunnelListItem/index.jsx";
import {useEffect, useState} from "react";

export default function TunnelList({list, serviceIp, onChecked}) {
    const [checked, setChecked] = useState(0);

    useEffect(() => {
        if (list && list.length > 0) {
            setChecked(list[0].id)
            if (onChecked) onChecked(list[0])
        }
    }, [list])

    return (<div>
        {list?.map(v => {
            return (<div onClick={() => {
                setChecked(v.id)
                if (onChecked) onChecked(v);
            }}>
                <TunnelListItem checked={checked === v.id} serviceIp={serviceIp} key={v.id} item={v}/>
            </div>)
        })}
    </div>)
}