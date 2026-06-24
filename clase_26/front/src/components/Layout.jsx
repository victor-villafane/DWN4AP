import { Link, Outlet } from "react-router"
import NavBar from "./NavBar"
import { Bounce, ToastContainer } from "react-toastify"
const Layout = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <NavBar />
            <div className="container-fluid" ><Outlet /></div>
        </div>
    )
}

export default Layout