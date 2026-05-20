import { MongoClient, ObjectId } from 'mongodb'
const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"
const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap") 

export async function registerUser(usuario){
    await client.connect()
    await db.collection("usuarios").insertOne(usuario)
    return { ...usuario, password: undefined }
}

export async function login(usuario){
    await client.connect()
    const existe = await db.collection("usuarios").findOne( { email: usuario.email } )
    if( !existe ) throw new Error("No se pudo ingresar")
    if( usuario.password != existe.password ) throw new Error("No se pudo ingresar")

    return { ...existe, password: undefined }
}