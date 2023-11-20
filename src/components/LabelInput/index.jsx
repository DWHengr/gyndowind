import "./index.css"
import {useEffect, useState} from "react";

export default function LabelInput({children, value, onChange, readOnly = true}) {
    const [txtValue, setTxtTxtValue] = useState(value)
    useEffect(() => {
        setTxtTxtValue(value);
    }, [value]);
    return (
        <div style={{display: 'flex', marginTop: 10}}>
            <div style={{width: 70}}>{children}</div>
            <div style={{flexGrow: 1}}>
                {readOnly ?
                    <div>{txtValue}</div> :
                    <input
                        className="text-input"
                        value={txtValue}
                        onChange={(e) => {
                            setTxtTxtValue(e.target.value)
                            if (onChange) onChange(e.target.value)
                        }}
                    ></input>
                }
            </div>
        </div>
    )
}

LabelInput.defaultProps = {
    type: "text",
};
