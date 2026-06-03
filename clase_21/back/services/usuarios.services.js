import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from "bcryptjs"
import { crearToken } from './token.services.js'

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"
const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap")

export async function registerUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if( existe ) throw new Error("No se pudo registrar")

    usuario.password = await bcrypt.hash(usuario.password, 10)
    await db.collection("usuarios").insertOne({ ...usuario, passwordConfirm: undefined })

    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })

    if (!existe) throw new Error("No pudo ingresar")

    const esValido = await bcrypt.compare(usuario.password, existe.password)

    if ( !esValido ) throw new Error("No pudo ingresar")

    const token = crearToken(
        {
            ...existe,
            password: undefined,
            passwordConfirm: undefined
        }
    )

    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}