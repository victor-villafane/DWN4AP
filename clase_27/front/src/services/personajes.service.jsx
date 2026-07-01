import { useApi } from "./api.service"

export function useApiPersonajes() {

    const { call } = useApi()

    const getPersonajes = () => call("/personajes")
    const getPersonajesById = (id) => call("/personajes/" + id)
    const createPersonajes = (personaje) => call("/personajes", "POST", personaje)
    const updatePersonajes = (personaje, id) => call("/personajes/" + id, "PUT", personaje)
    const deletePersonajes = (id) => call("/personajes/" + id, "DELETE")

    return {
        getPersonajes,
        getPersonajesById,
        createPersonajes,
        updatePersonajes,
        deletePersonajes
    }
}