import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useApiPersonajes } from "../../services/personajes.service"
import { personajesSchema } from "../../schemas/personajes"
import { yupResolver } from "@hookform/resolvers/yup"
import { io } from "socket.io-client"
import { useEffect } from "react"
import { Bounce, toast } from "react-toastify"
import { socket } from "../../services/socket.service"

const NuevoPersonaje = () => {
    const navigate = useNavigate()
    const { createPersonajes } = useApiPersonajes()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ mode: "onChange", resolver: yupResolver(personajesSchema) })

const onSubmit = async (data) => {
    const formData = new FormData()
    if (data.alternate_names) data.alternate_names = data.alternate_names.split(',').map(s => s.trim())
    if (data.alternate_actors) data.alternate_actors = data.alternate_actors.split(',').map(s => s.trim())
    if (data.wand) {
        try {
            const parsed = JSON.parse(data.wand)
            data.wand = parsed
        } catch {
            delete data.wand
        }
    }
    data.wizard = !!data.wizard
    data.hogwartsStudent = !!data.hogwartsStudent
    data.hogwartsStaff = !!data.hogwartsStaff
    data.alive = !!data.alive

    // formData.append("alternate_names", data.alternate_names)
    // formData.append("alternate_actors", data.alternate_actors)
    // formData.append("wand", data.wand)
    // formData.append("wizard", data.wizard)
    // formData.append("hogwartsStudent", data.hogwartsStudent)
    // formData.append("hogwartsStaff", data.hogwartsStaff)
    // formData.append("alive", data.alive)

    Object.keys(data).forEach(campo => formData.append(campo, data[campo]))
    formData.append("image", data.image?.[0])

    console.log(data.image?.[0])

    fetch("http://localhost:2026/api/personajes", {
        method: "POST",
        body: formData
    })
        .then(res => {
            if (res.ok) return res.json()
            throw new Error("Exploto")
        })
        .then(data => {
            socket.emit("nuevo-personaje")
            navigate('/')
        })
        .catch(err => toast.error('👀 No se pudo guardar', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        }))
    // try {
    //     await createPersonajes(data)
    //     navigate('/')
    // } catch (e) {
    //     console.error(e)
    // }
}

return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4" style={{ maxWidth: "600px" }} noValidate>
        {/* Nombre */}
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre *</label>
            <input type="text" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register("name")} />
            <div className="invalid-feedback" >
                {errors?.name?.message}
            </div>
        </div>
        {/* Nombres alternativos */}
        <div className="mb-3">
            <label htmlFor="alternate_names" className="form-label">Nombres alternativos (separados por coma)</label>
            <input type="text" id="alternate_names" className="form-control" {...register("alternate_names")} />
            <div className="invalid-feedback" >
                {errors?.alternate_names?.message}
            </div>
        </div>
        {/* Species */}
        <div className="mb-3">
            <label htmlFor="species" className="form-label">Especie *</label>
            <input type="text" id="species" className={`form-control ${errors.species ? 'is-invalid' : ''}`} {...register("species")} />
            <div className="invalid-feedback" >
                {errors?.species?.message}
            </div>
        </div>
        {/* Gender */}
        <div className="mb-3">
            <label htmlFor="gender" className="form-label">Genero *</label>
            <input type="text" id="gender" className={`form-control ${errors.gender ? 'is-invalid' : ''}`} {...register("gender")} />
            <div className="invalid-feedback" >
                {errors?.gender?.message}
            </div>
        </div>
        {/* House */}
        <div className="mb-3">
            <label htmlFor="house" className="form-label">Casa *</label>
            <select id="house" className={`form-control ${errors.house ? 'is-invalid' : ''}`} {...register("house")}>
                <option value="">Selecciona una casa</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Hufflepuff">Hufflepuff</option>
                <option value="Ravenclaw">Ravenclaw</option>
                <option value="Slytherin">Slytherin</option>
            </select>
            <div className="invalid-feedback" >
                {errors?.house?.message}
            </div>
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
            <input type="text" id="actor" className={`form-control ${errors.actor ? 'is-invalid' : ''}`} {...register("actor")} />
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
            <input type="file" id="image" className="form-control" {...register("image")} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Crear Personaje</button>
    </form>
)
}

export default NuevoPersonaje
