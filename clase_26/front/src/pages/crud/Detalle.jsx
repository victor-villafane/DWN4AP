import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { useApiPersonajes } from "../../services/personajes.service"

const Detalle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [personaje, setPersonaje] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { getPersonajesById } = useApiPersonajes()

    useEffect(() => {
        getPersonajesById(id)
            .then(data => {
                setPersonaje(data)
        console.log(data)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return personaje && (
        <div className="card mb-3 border-0">
            <div className="row g-0">

                <div className="col-md-4">
                    <img
                        src={personaje.image.includes("imagekit") ? personaje.image : `http://localhost:2026/uploads/${personaje.image}` }
                        className="img-fluid rounded-start"
                        alt={personaje.name}
                    />
                </div>

                <div className="col-md-8">
                    <div className="card-body">

                        <h5 className="card-title">
                            {personaje.name}
                        </h5>

                        <p className="card-text">
                            <strong>Casa:</strong> {personaje.house}
                        </p>

                        <p className="card-text">
                            <strong>Actor:</strong> {personaje.actor}
                        </p>

                        <p className="card-text">
                            <strong>Especie:</strong> {personaje.species}
                        </p>

                        <p className="card-text">
                            <strong>Género:</strong> {personaje.gender}
                        </p>

                        <p className="card-text">
                            <strong>Patronus:</strong> {personaje.patronus}
                        </p>

                        <p className="card-text">
                            <strong>Fecha de nacimiento:</strong> {personaje.dateOfBirth}
                        </p>

                        <p className="card-text">
                            <small className="text-body-secondary">
                                {personaje.alive ? "Vivo" : "Muerto"}
                            </small>
                        </p>

                    </div>
                </div>
                <>
                    <Link className="btn btn-primary me-2" to="/">Volver</Link>
                </>
            </div>
        </div>
    )
}

export default Detalle