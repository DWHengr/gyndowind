import "./index.css"
import TunnelListItem from "../TunnelListItem/index.jsx";

export default function TunnelList({list, serviceIp}) {
    return (
        <div>
            {
                list?.map(v => {
                    return (
                        <TunnelListItem serviceIp={serviceIp} key={v.port} item={v}/>
                    )
                })
            }
        </div>
    )
}