import { Navigate } from "react-router"
import { useLogout } from "../../context/session.context"

const Logout = () => {
    const logout = useLogout()
    logout()
    return <Navigate to="/login" />
}

export default Logout