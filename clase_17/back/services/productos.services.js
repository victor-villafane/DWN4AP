import { access, readFile, writeFile, constants } from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"

const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap")                  //se conectaron a la db

export function getProductos(filtros = {}) {
    const filter = { borrado: { $ne: true } }       //https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/

    if (filtros?.precio_min) filter.precio = { "$gte": parseInt(filtros.precio_min) } //https://www.mongodb.com/es/docs/manual/reference/operator/query/gte/
    if (filtros?.precio_max) filter.precio = { "$lte": parseInt(filtros.precio_max) } //https://www.mongodb.com/es/docs/manual/reference/operator/query/lte/

    if (filtros?.precio_min && filtros?.precio_max) filter.$and = [ //https://www.mongodb.com/es/docs/manual/reference/operator/query/and/
        { precio: { "$gte": parseInt(filtros.precio_min) } },
        { precio: { "$lte": parseInt(filtros.precio_max) } }
    ]

    return db.collection("cafes").find(filter).toArray()
}

export function getProductosById(id) {
    return db.collection("cafes").findOne({ _id: new ObjectId(id) })
}

export async function guardarProducto(producto) {
    try {
        await db.collection("cafes").insertOne(producto)
        return producto
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function eliminarProducto(id) {
    try {
        // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
        await db.collection("cafes").updateOne(
            { _id: new ObjectId(id) }, { $set: { borrado: true } }
        ) //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
        return id
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function editarProducto(producto) {
    try {
        // await db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
        console.log(producto)
        await db.collection("cafes").updateOne(
            { _id: new ObjectId(producto.id) }, { $set: producto }
        ) //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
        return producto
    } catch (error) {
        throw new Error("Exploto!")
    }
}