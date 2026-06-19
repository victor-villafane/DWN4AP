import { Link, Outlet } from "react-router"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <div>
            <NavBar />
            <div className="container-fluid" ><Outlet /></div>
        </div>
    )
}

export default Layout