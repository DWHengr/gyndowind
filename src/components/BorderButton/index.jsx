import "./index.css"
import React from "react";

export default function BorderButton({style, children}) {
    return (
        <div style={style}>
            <div className="border-button-container">
                {children}
            </div>
        </div>

    )
}