import { Link } from "react-router"

const NavBar = () => {
    const session = JSON.parse(localStorage.getItem("session"))
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        {
                            !session 
                                ? <Link className="nav-link" to="/login">Login</Link>
                                : <Link className="nav-link" to="/logout">Salir</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar