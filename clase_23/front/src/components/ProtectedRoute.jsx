import { Navigate } from "react-router"

const ProtectedRoute = ({element}) => {
    const token = localStorage.getItem("token")
    if( token ) return element

    return <Navigate to="/login" />
}

export default ProtectedRoute