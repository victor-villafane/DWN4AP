import * as services from "../../services/personajes.services.js"

export function getPersonajes(req, res) {
    // #swagger.tags = ['Personajes']
    const filtros = req.query
    services.getPersonajes(filtros)
        .then(productos => res.status(200).json(productos))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export function asignarCafe(req, res) {
    // #swagger.tags = ['Personajes']
    const idPersonaje = req.params.id
    const idCafe = req.body.idCafe
    services.asignarCafe(idCafe, idPersonaje)
        .then(data => res.status(202).json(data))
        .catch(err => res.status(500).json({ message: err }))
}

export function getPersonajesById(req, res) {
    // #swagger.tags = ['Personajes']
    const id = req.params.id;
    services.getPersonajesById(id)
        .then(personaje => {
            if (!personaje) {
                res.status(404).json({ message: "personaje no encontrado" });
            } else {
                res.status(200).json(personaje);
            }
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }));
}

export function savePersonajes(req, res) {
    // #swagger.tags = ['Personajes']
    const personaje = {
        "name": req.body.name,
        "alternate_names": req.body.alternate_names,
        "species": req.body.species,
        "gender": req.body.gender,
        "house": req.body.house,
        "dateOfBirth": req.body.dateOfBirth,
        "yearOfBirth": req.body.yearOfBirth,
        "wizard": req.body.wizard,
        "ancestry": req.body.ancestry,
        "eyeColour": req.body.eyeColour,
        "hairColour": req.body.hairColour,
        "wand": req.body.wand,
        "patronus": req.body.patronus,
        "hogwartsStudent": req.body.hogwartsStudent,
        "hogwartsStaff": req.body.hogwartsStaff,
        "actor": req.body.actor,
        "alternate_actors": req.body.alternate_actors,
        "alive": req.body.alive,
        "image": req.body.image
    }
    services.guardarPersonaje(personaje)
        .then((personaje) => res.status(201).json(personaje))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function deletePersonajes(req, res) {
    // #swagger.tags = ['Personajes']
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    services.eliminarPersonaje(id)
        .then(personaje => {
            if (personaje.message) {
                res.status(400).json(personaje)
            } else {
                res.status(202).json(personaje)
            }
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export async function actualizarPersonaje(req, res) {
    // #swagger.tags = ['Personajes']
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const personajeAnterior = await services.getPersonajesById(id)
    const personaje = {
        "id": id,
        "name": req.body.name ? req.body?.name : personajeAnterior?.name,
        "alternate_names": req.body.alternate_names ? req.body?.alternate_names : personajeAnterior?.alternate_names,
        "species": req.body.species ? req.body?.species : personajeAnterior?.species,
        "gender": req.body.gender ? req.body?.gender : personajeAnterior?.gender,
        "house": req.body.house ? req.body?.house : personajeAnterior?.house,
        "dateOfBirth": req.body.dateOfBirth ? req.body?.dateOfBirth : personajeAnterior?.dateOfBirth,
        "yearOfBirth": req.body.yearOfBirth ? req.body?.yearOfBirth : personajeAnterior?.yearOfBirth,
        "wizard": req.body.wizard ? req.body?.wizard : personajeAnterior?.wizard,
        "ancestry": req.body.ancestry ? req.body?.ancestry : personajeAnterior?.ancestry,
        "eyeColour": req.body.eyeColour ? req.body?.eyeColour : personajeAnterior?.eyeColour,
        "hairColour": req.body.hairColour ? req.body?.hairColour : personajeAnterior?.hairColour,
        "wand": req.body.wand ? req.body?.wand : personajeAnterior?.wand,
        "patronus": req.body.patronus ? req.body?.patronus : personajeAnterior?.patronus,
        "hogwartsStudent": req.body.hogwartsStudent ? req.body?.hogwartsStudent : personajeAnterior?.hogwartsStudent,
        "hogwartsStaff": req.body.hogwartsStaff ? req.body?.hogwartsStaff : personajeAnterior?.hogwartsStaff,
        "actor": req.body.actor ? req.body?.actor : personajeAnterior?.actor,
        "alternate_actors": req.body.alternate_actors ? req.body?.alternate_actors : personajeAnterior?.alternate_actors,
        "alive": req.body.alive ? req.body?.alive : personajeAnterior?.alive,
        "image": req.body.image ? req.body?.image : personajeAnterior?.image
    }
    services.editarPersonaje(personaje)
        .then(personaje => res.status(202).json(personaje))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export async function reemplazarPersonaje(req, res) {
    // #swagger.tags = ['Personajes']
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const personaje = {
        "name": req.body.name,
        "alternate_names": req.body.alternate_names,
        "species": req.body.species,
        "gender": req.body.gender,
        "house": req.body.house,
        "dateOfBirth": req.body.dateOfBirth,
        "yearOfBirth": req.body.yearOfBirth,
        "wizard": req.body.wizard,
        "ancestry": req.body.ancestry,
        "eyeColour": req.body.eyeColour,
        "hairColour": req.body.hairColour,
        "wand": req.body.wand,
        "patronus": req.body.patronus,
        "hogwartsStudent": req.body.hogwartsStudent,
        "hogwartsStaff": req.body.hogwartsStaff,
        "actor": req.body.actor,
        "alternate_actors": req.body.alternate_actors,
        "alive": req.body.alive,
        "image": req.body.image
    }
    services.editarPersonaje(personaje, id)
        .then(personaje => {
            if (Object.keys(personaje).length != 0) {
                res.status(202).json(personaje)
                return
            }
            res.status(404).json({ message: "No se pudo modificar el personaje" })
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}