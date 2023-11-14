import "./index.css"

export default function FullButton({children, onClick}) {
    return (
        <div
            className="full-button-container"
            onClick={() => {
                if (onClick) onClick()
            }}
        >
            <div
                style={{fontSize: 20}}
            >
                {children}
            </div>
        </div>
    )
}