import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useApiPersonajes } from "../../services/personajes.service"

const NuevoPersonaje = () => {
    const navigate = useNavigate()
    const { createPersonajes } = useApiPersonajes()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onChange" })

    const onSubmit = async (data) => {
        // transform comma‑separated fields into arrays
        if (data.alternate_names) data.alternate_names = data.alternate_names.split(',').map(s => s.trim())
        if (data.alternate_actors) data.alternate_actors = data.alternate_actors.split(',').map(s => s.trim())
        // optional JSON field for wand – include only if valid JSON
        if (data.wand) {
            try {
                const parsed = JSON.parse(data.wand)
                data.wand = parsed
            } catch {
                delete data.wand // remove invalid value
            }
        }
        // booleans from checkboxes come as "on" when checked, otherwise undefined
        data.wizard = !!data.wizard
        data.hogwartsStudent = !!data.hogwartsStudent
        data.hogwartsStaff = !!data.hogwartsStaff
        data.alive = !!data.alive
        try {
            await createPersonajes(data)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4" style={{ maxWidth: "600px" }}>
            {/* ID (optional) */}
            <div className="mb-3">
                <label htmlFor="_id" className="form-label">ID</label>
                <input type="text" id="_id" className="form-control" {...register("_id")} defaultValue="" />
            </div>
            {/* Nombre */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre *</label>
                <input type="text" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} required {...register("name", { required: true })} />
            </div>
            {/* Nombres alternativos */}
            <div className="mb-3">
                <label htmlFor="alternate_names" className="form-label">Nombres alternativos (separados por coma)</label>
                <input type="text" id="alternate_names" className="form-control" {...register("alternate_names")} />
            </div>
            {/* Species */}
            <div className="mb-3">
                <label htmlFor="species" className="form-label">Especie *</label>
                <input type="text" id="species" className={`form-control ${errors.species ? 'is-invalid' : ''}`} required {...register("species", { required: true })} />
            </div>
            {/* Gender */}
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Genero *</label>
                <input type="text" id="gender" className={`form-control ${errors.gender ? 'is-invalid' : ''}`} required {...register("gender", { required: true })} />
            </div>
            {/* House */}
            <div className="mb-3">
                <label htmlFor="house" className="form-label">Casa *</label>
                <select id="house" className={`form-control ${errors.house ? 'is-invalid' : ''}`} required {...register("house", { required: true })}>
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
                <input type="date" id="dateOfBirth" className="form-control" {...register("dateOfBirth")} />
            </div>
            {/* Year of Birth */}
            <div className="mb-3">
                <label htmlFor="yearOfBirth" className="form-label">Año de nacimiento</label>
                <input type="number" id="yearOfBirth" className="form-control" {...register("yearOfBirth")} />
            </div>
            {/* Wizard */}
            <div className="form-check mb-3">
                <input type="checkbox" id="wizard" className="form-check-input" {...register("wizard")} />
                <label htmlFor="wizard" className="form-check-label">Es mago/a</label>
            </div>
            {/* Ancestry */}
            <div className="mb-3">
                <label htmlFor="ancestry" className="form-label">Ancestro</label>
                <input type="text" id="ancestry" className="form-control" {...register("ancestry")} />
            </div>
            {/* Eye Colour */}
            <div className="mb-3">
                <label htmlFor="eyeColour" className="form-label">Color de ojos</label>
                <input type="text" id="eyeColour" className="form-control" {...register("eyeColour")} />
            </div>
            {/* Hair Colour */}
            <div className="mb-3">
                <label htmlFor="hairColour" className="form-label">Color de pelo</label>
                <input type="text" id="hairColour" className="form-control" {...register("hairColour")} />
            </div>
            {/* Wand */}
            <div className="mb-3">
                <label htmlFor="wand" className="form-label">Varita (JSON opcional)</label>
                <input type="text" id="wand" className="form-control" {...register("wand")} />
            </div>
            {/* Patronus */}
            <div className="mb-3">
                <label htmlFor="patronus" className="form-label">Patronus</label>
                <input type="text" id="patronus" className="form-control" {...register("patronus")} />
            </div>
            {/* Hogwarts Student */}
            <div className="form-check mb-3">
                <input type="checkbox" id="hogwartsStudent" className="form-check-input" {...register("hogwartsStudent")} />
                <label htmlFor="hogwartsStudent" className="form-check-label">Estudiante de Hogwarts</label>
            </div>
            {/* Hogwarts Staff */}
            <div className="form-check mb-3">
                <input type="checkbox" id="hogwartsStaff" className="form-check-input" {...register("hogwartsStaff")} />
                <label htmlFor="hogwartsStaff" className="form-check-label">Personal de Hogwarts</label>
            </div>
            {/* Actor */}
            <div className="mb-3">
                <label htmlFor="actor" className="form-label">Actor *</label>
                <input type="text" id="actor" className={`form-control ${errors.actor ? 'is-invalid' : ''}`} required {...register("actor", { required: true })} />
            </div>
            {/* Alternate Actors */}
            <div className="mb-3">
                <label htmlFor="alternate_actors" className="form-label">Actores alternos (separados por coma)</label>
                <input type="text" id="alternate_actors" className="form-control" {...register("alternate_actors")} />
            </div>
            {/* Alive */}
            <div className="form-check mb-3">
                <input type="checkbox" id="alive" className="form-check-input" {...register("alive")} />
                <label htmlFor="alive" className="form-check-label">Está vivo/a</label>
            </div>
            {/* Image URL */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label">URL de la imagen</label>
                <input type="url" id="image" className="form-control" {...register("image")} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Crear Personaje</button>
        </form>
    )
}

export default NuevoPersonaje
