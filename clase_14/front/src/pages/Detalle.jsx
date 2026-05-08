import { useParams } from "react-router";

const Detalle = () => {
    const { id } = useParams()
    return (
    <div>
        {id}
    </div>)
}

export default Detalle