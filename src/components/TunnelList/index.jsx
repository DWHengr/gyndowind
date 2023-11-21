import "./index.css"
import TunnelListItem from "../TunnelListItem/index.jsx";
import {useEffect, useState} from "react";
import _ from 'lodash';

export default function TunnelList({list, serviceIp, onChecked, onSwitch}) {
    const [checked, setChecked] = useState(0);

    useEffect(() => {
        if (list && list.length > 0) {
            setChecked(list[0].id)
            if (onChecked) onChecked(_.cloneDeep(list[0]))
        }
    }, [list])

    return (<div>
        {list?.map(v => {
            return (<div onClick={() => {
                setChecked(v.id)
                if (onChecked) onChecked(_.cloneDeep(v));
            }}>
                <TunnelListItem
                    checked={checked === v.id}
                    serviceIp={serviceIp} key={v.id}
                    item={v}
                    onSwitch={(checked, item) => {
                        if (onSwitch) onSwitch(checked, item)
                    }}
                />
            </div>)
        })}
    </div>)
}