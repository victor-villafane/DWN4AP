import { access, readFile, writeFile, constants } from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"

const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap")                  //se conectaron a la db

export function getPersonajes(filtros = {}) {
    const filter = {}

    if( filtros.casa ) filter.house = filtros.casa 

    return db.collection("personajes").find(filter).toArray()
}

export async function asignarCafe(idCafe, idPersonaje){
    await client.connect()
    const cafe = db.collection("cafes").findOne({ _id: new ObjectId(idCafe) })
    // const personaje = db.collection("personajes").findOne({ _id: new ObjectId(idPersonaje) })
    await db.collection("personajes").updateOne( 
        {_id: new ObjectId(idPersonaje)}, 
        {$push: { cafes: {...cafe} }} 
    )    
} 

// export function getProductosById(id) {
//     return db.collection("cafes").findOne({ _id: new ObjectId(id) })
// }

// export async function guardarProducto(producto) {
//     try {
//         await db.collection("cafes").insertOne(producto)
//         return producto
//     } catch (error) {
//         throw new Error("Exploto!")
//     }
// }

// export async function eliminarProducto(id) {
//     try {
//         // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
//         await db.collection("cafes").updateOne(
//             { _id: new ObjectId(id) }, { $set: { borrado: true } }
//         ) //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
//         return id
//     } catch (error) {
//         throw new Error("Exploto!")
//     }
// }

// export async function editarProducto(producto) {
//     try {
//         // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
//         console.log(producto)
//         await db.collection("cafes").updateOne(
//             { _id: new ObjectId(producto.id) }, { $set: producto }
//         ) //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
//         return producto
//     } catch (error) {
//         throw new Error("Exploto!")
//     }
// }