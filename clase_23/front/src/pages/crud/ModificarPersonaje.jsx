import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useApiPersonajes } from "../../services/personajes.service"

const ModificarPersonaje = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getPersonajesById, updatePersonajes } = useApiPersonajes()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [initialData, setInitialData] = useState({})

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({ mode: "onChange" })

    useEffect(() => {
        getPersonajesById(id)
            .then(data => {
                setInitialData(data)
                reset(data) // populate form
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id, getPersonajesById, reset])

    const onSubmit = async (data) => {
        // Transform fields similar to creation
        if (data.alternate_names) data.alternate_names = data.alternate_names.split(',').map(s => s.trim())
        if (data.alternate_actors) data.alternate_actors = data.alternate_actors.split(',').map(s => s.trim())
        if (data.wand) {
            try { data.wand = JSON.parse(data.wand) } catch { delete data.wand }
        }
        data.wizard = !!data.wizard
        data.hogwartsStudent = !!data.hogwartsStudent
        data.hogwartsStaff = !!data.hogwartsStaff
        data.alive = !!data.alive
        data.id = id // backend expects _id in body or use param; include for safety
        try {
            await updatePersonajes(data)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4" style={{ maxWidth: "600px" }}>
            {/* ID (read‑only) */}
            <div className="mb-3">
                <label htmlFor="_id" className="form-label">ID</label>
                <input type="text" id="_id" className="form-control" defaultValue={initialData._id} readOnly />
            </div>
            {/* Nombre */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre *</label>
                <input type="text" id="name" className="form-control" {...register("name")} defaultValue={initialData.name} required />
            </div>
            {/* Nombres alternativos */}
            <div className="mb-3">
                <label htmlFor="alternate_names" className="form-label">Nombres alternativos (separados por coma)</label>
                <input type="text" id="alternate_names" className="form-control" {...register("alternate_names")} defaultValue={initialData.alternate_names?.join(', ')} />
            </div>
            {/* Species */}
            <div className="mb-3">
                <label htmlFor="species" className="form-label">Especie *</label>
                <input type="text" id="species" className="form-control" {...register("species")} defaultValue={initialData.species} required />
            </div>
            {/* Gender */}
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Genero *</label>
                <input type="text" id="gender" className="form-control" {...register("gender")} defaultValue={initialData.gender} required />
            </div>
            {/* House */}
            <div className="mb-3">
                <label htmlFor="house" className="form-label">Casa *</label>
                <select id="house" className="form-control" {...register("house")} defaultValue={initialData.house} required>
                    <option value="">Selecciona una casa</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                    <option value="Slytherin">Slytherin</option>
                </select>
            </div>
            {/* Date of Birth */}
            <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">Fecha de nacimiento</label>
                <input type="date" id="dateOfBirth" className="form-control" {...register("dateOfBirth")} defaultValue={initialData.dateOfBirth?.slice(0,10)} />
            </div>
            {/* Year of Birth */}
            <div className="mb-3">
                <label htmlFor="yearOfBirth" className="form-label">Año de nacimiento</label>
                <input type="number" id="yearOfBirth" className="form-control" {...register("yearOfBirth")} defaultValue={initialData.yearOfBirth} />
            </div>
            {/* Wizard */}
            <div className="form-check mb-3">
                <input type="checkbox" id="wizard" className="form-check-input" {...register("wizard")} defaultChecked={initialData.wizard} />
                <label htmlFor="wizard" className="form-check-label">Es mago/a</label>
            </div>
            {/* Ancestry */}
            <div className="mb-3">
                <label htmlFor="ancestry" className="form-label">Ancestro</label>
                <input type="text" id="ancestry" className="form-control" {...register("ancestry")} defaultValue={initialData.ancestry} />
            </div>
            {/* Eye Colour */}
            <div className="mb-3">
                <label htmlFor="eyeColour" className="form-label">Color de ojos</label>
                <input type="text" id="eyeColour" className="form-control" {...register("eyeColour")} defaultValue={initialData.eyeColour} />
            </div>
            {/* Hair Colour */}
            <div className="mb-3">
                <label htmlFor="hairColour" className="form-label">Color de pelo</label>
                <input type="text" id="hairColour" className="form-control" {...register("hairColour")} defaultValue={initialData.hairColour} />
            </div>
            {/* Wand (JSON) */}
            <div className="mb-3">
                <label htmlFor="wand" className="form-label">Varita (JSON opcional)</label>
                <input type="text" id="wand" className="form-control" {...register("wand")} defaultValue={initialData.wand ? JSON.stringify(initialData.wand) : ''} />
            </div>
            {/* Patronus */}
            <div className="mb-3">
                <label htmlFor="patronus" className="form-label">Patronus</label>
                <input type="text" id="patronus" className="form-control" {...register("patronus")} defaultValue={initialData.patronus} />
            </div>
            {/* Hogwarts Student */}
            <div className="form-check mb-3">
                <input type="checkbox" id="hogwartsStudent" className="form-check-input" {...register("hogwartsStudent")} defaultChecked={initialData.hogwartsStudent} />
                <label htmlFor="hogwartsStudent" className="form-check-label">Estudiante de Hogwarts</label>
            </div>
            {/* Hogwarts Staff */}
            <div className="form-check mb-3">
                <input type="checkbox" id="hogwartsStaff" className="form-check-input" {...register("hogwartsStaff")} defaultChecked={initialData.hogwartsStaff} />
                <label htmlFor="hogwartsStaff" className="form-check-label">Personal de Hogwarts</label>
            </div>
            {/* Actor */}
            <div className="mb-3">
                <label htmlFor="actor" className="form-label">Actor *</label>
                <input type="text" id="actor" className="form-control" {...register("actor")} defaultValue={initialData.actor} required />
            </div>
            {/* Alternate Actors */}
            <div className="mb-3">
                <label htmlFor="alternate_actors" className="form-label">Actores alternos (separados por coma)</label>
                <input type="text" id="alternate_actors" className="form-control" {...register("alternate_actors")} defaultValue={initialData.alternate_actors?.join(', ')} />
            </div>
            {/* Alive */}
            <div className="form-check mb-3">
                <input type="checkbox" id="alive" className="form-check-input" {...register("alive")} defaultChecked={initialData.alive} />
                <label htmlFor="alive" className="form-check-label">Está vivo/a</label>
            </div>
            {/* Image URL */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label">URL de la imagen</label>
                <input type="url" id="image" className="form-control" {...register("image")} defaultValue={initialData.image} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Actualizar Personaje</button>
        </form>
    )
}

export default ModificarPersonaje
