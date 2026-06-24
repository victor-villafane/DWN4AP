import { access, readFile, writeFile, constants } from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'
import fs from "fs/promises"

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"

const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap")                  //se conectaron a la db

export function getPersonajes(filtros = {}) {
    const filter = { borrado: { $ne: true } }
    if (filtros.casa) filter.house = filtros.casa

    return db.collection("personajes").find(filter).toArray()
}

export async function asignarCafe(idCafe, idPersonaje) {
    try {
        await client.connect()
        const cafe = await db.collection("cafes").findOne({ _id: new ObjectId(idCafe) })
        // const personaje = db.collection("personajes").findOne({ _id: new ObjectId(idPersonaje) })
        return await db.collection("personajes").updateOne(
            { _id: new ObjectId(idPersonaje) },
            { $addToSet: { cafes: { ...cafe } } }
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/push/
            // https://www.mongodb.com/es/docs/manual/reference/operator/update/addToSet/ -> compara antes de guardar
        )
    }
    catch (error) {

    }
}

export function getPersonajesById(id) {
    return db.collection("personajes").findOne({ _id: new ObjectId(id) })
}

export async function guardarPersonaje(personaje) {
    try {
        await client.connect()
        await db.collection("personajes").insertOne(personaje)
        return personaje
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function eliminarPersonaje(id) {
    try {
        // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
        const personaje = await db.collection("personajes").findOne({ _id: new ObjectId(id) })

        if (personaje?.image) {
            await fs.unlink("uploads/" + personaje?.image)
        }

        await db.collection("personajes").updateOne(
            { _id: new ObjectId(id) }, { $set: { borrado: true } }
        ) //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
        return id
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function editarPersonaje(personaje, id) {
    try {
        // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
        const personajeAnterior = await db.collection("personajes").findOne({ _id: new ObjectId(id) })
        console.log("personajeAnterior", personajeAnterior)
        if (personaje?.image?.length > 0) {
            fs.unlink("uploads/" + personajeAnterior?.image)
                .then(() => console.log("guardado"))
                .catch(() => console.log("No guardado"))
        } else {
            personaje.image = personajeAnterior?.image
        }
        console.log(personaje)
        await db.collection("personajes").updateOne(
            { _id: new ObjectId(id) }, { $set: personaje }
        )
        return personaje
    } catch (error) {
        throw new Error("Exploto!")
    }
}