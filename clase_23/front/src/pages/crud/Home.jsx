import { useState, useEffect } from "react"
import { Link } from "react-router"
import { useToken } from "../../context/session.context"
import { useApi } from "../../services/api.service"
import { useApiPersonajes } from "../../services/personajes.service"

const Home = () => {
    const [personajes, setPersonajes] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(null)
    const token = useToken()
    const { getPersonajes } = useApiPersonajes()

    useEffect(() => {
        setLoading(true)

        getPersonajes()
            .then(data => {
                // paginación manual
                const inicio = (page - 1) * 20
                const fin = inicio + 20

                setPersonajes(data.slice(inicio, fin))
                setTotal(Math.ceil(data.length / 20))
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))

    }, [page])

    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    if (error) return <h2>{error}</h2>

    function items() {
        const links = []

        for (let i = 1; i <= total; i++) {
            links.push(
                <li key={i} className="page-item">
                    <button
                        onClick={() => setPage(i)}
                        className={"page-link " + (page === i ? "active" : "")}
                    >
                        {i}
                    </button>
                </li>
            )
        }

        return links
    }

    const randomHexColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    const styleImg = (personaje) => {
        const style = { 
            width: "80px", 
            height: "80px", 
            border: `2px solid ${randomHexColor()}`,
            backgroundImage: `url(${personaje.image})`,
            backgroundSize: "cover",
            backgroundPosition: "top"
        }
        return style
    }

    return (
        <>
            <Link className="btn btn-primary" to="/nuevo-personaje" >Nuevo personaje</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Casa</th>
                        <th>Actor</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        personajes.map(personaje => (
                            <tr key={personaje._id}>
                                <td>{personaje?.name}</td>
                                <td>{personaje?.house}</td>
                                <td>{personaje?.actor}</td>
                                <td>
                                    {
                                        personaje?.image?.length > 0 ?
                                            <div style={styleImg(personaje)} >
                                            </div>
                                            : <div className="d-flex justify-content-center align-items-center" style={{ width: "80px", height: "80px", border: `2px solid ${randomHexColor()}` }} >
                                                <span >{personaje.name?.[0]}</span>
                                            </div>
                                    }
                                </td>

                                <td>
                                    <Link
                                        to={`/detalle/${personaje._id}`}
                                        className="btn btn-info"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        to={`/modificar/69e181fbe2cbc9dee9ae8267`}
                                        className="btn btn-warning"
                                    >
                                        Ver
                                    </Link>                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="page-link"
                        >
                            Previous
                        </button>
                    </li>

                    {items()}

                    <li className="page-item">
                        <button
                            disabled={page === total}
                            onClick={() => setPage(page + 1)}
                            className="page-link"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Home