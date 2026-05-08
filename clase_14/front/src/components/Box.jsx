const Box = ({letra}) => {
    return <div
        className="d-flex align-items-center justify-content-center border border-primary shadow-sm"
        style={{ width: "50px", height: "50px" }}
    >
        {letra}
    </div>
}

export default Box