import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

const Detalle = () => {
    const { id } = useParams()

    const [personaje, setPersonaje] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:2026/api/personajes/"+id, {
            method: "GET",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error("Error!")
            })
            .then(data => {
                setPersonaje(data)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    if (!personaje) return <div>Personaje no encontrado</div>

    return (
        <div className="card mb-3 border-0">
            <div className="row g-0">

                <div className="col-md-4">
                    <img
                        src={personaje.image}
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
                <Link className="btn btn-primary"  to="/">Volver</Link>
            </div>
        </div>
    )
}

export default Detalle