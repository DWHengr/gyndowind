import "./index.css"
import React from "react";

export default function BorderButton({style, children, onClick}) {
    return (
        <div style={style}
             onClick={() => {
                 if (onClick) onClick();
             }}
        >
            <div className="border-button-container">
                {children}
            </div>
        </div>

    )
}