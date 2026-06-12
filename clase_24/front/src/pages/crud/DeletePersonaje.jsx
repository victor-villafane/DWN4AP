import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useApiPersonajes } from '../../services/personajes.service'

const DeletePersonaje = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [personaje, setPersonaje] = useState(null)
    const { getPersonajesById, deletePersonajes } = useApiPersonajes()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

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
    const handleDelete = async () => {
        try {
            await deletePersonajes(id)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }
    return personaje && (
        <div className='d-flex justify-content-center align-items-center vh-100' >
            <div className="card mb-3 border-0">
                <h2>Desea borrar?</h2>
                <h3>{personaje?.name}</h3>
                <div>
                    <img
                        src={personaje.image}
                        className="img-fluid rounded-start"
                        alt={personaje.name}
                    />
                </div>
                <div className='d-flex' >
                    <button className='btn btn-danger m-2' onClick={handleDelete} >Borrar</button>
                    <Link to="/" className='btn btn-primary m-2' >Volver</Link>
                </div>
            </div>
        </div>
    )
}

export default DeletePersonaje