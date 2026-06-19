import { Navigate } from "react-router"
import { useRol } from "../context/session.context"

const ProtectedRoute = ({element, rol}) => {
    const token = localStorage.getItem("token")
    const rolUser = useRol()

    if( !token ) return <Navigate to="/login" />

    if( rol.includes(rolUser) ) return element

    return <Navigate to="/" />
}

export default ProtectedRoute