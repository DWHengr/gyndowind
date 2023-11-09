import "./index.css"

export default function FullButton({children, onClick}) {
    return (
        <div className="full-button-container">
            <div
                style={{fontSize: 20}}
                onClick={() => {
                    if (onClick) onClick()
                }}
            >
                {children}
            </div>
        </div>
    )
}