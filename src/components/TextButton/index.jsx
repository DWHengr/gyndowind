import "./index.css"
import React from "react";

export default function TextButton({icon, label, onClick}) {
    return (

        <div
            className="text-button-container"
            onClick={() => {
                if (onClick) onClick();
            }}
        >
            {icon}
            <div style={{marginLeft: 1}}>{label}</div>
        </div>

    )
}