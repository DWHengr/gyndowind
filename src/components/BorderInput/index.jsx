import "./index.css"
import {useEffect, useState} from "react";

export default function BorderInput({value, placeholder, type, onChange}) {
    const [txtValue, setTxtTxtValue] = useState(value)
    useEffect(() => {
        setTxtTxtValue(value);
    }, [value]);
    return (

        <div className="border-input-container">
            <input
                value={txtValue}
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                    setTxtTxtValue(e.target.value)
                    if (onChange) onChange()
                }}
            ></input>
        </div>

    )
}

BorderInput.defaultProps = {
    type: "text",
};