import { MongoClient, ObjectId } from 'mongodb'
import jwt from "jsonwebtoken"
import { crearToken } from './token.services.js'

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.uyrjfuw.mongodb.net/"
const client = new MongoClient(MONGO_URI)       //se conectaron al cluster
const db = client.db("dwn4ap")
const SECRET = "homero"

export async function registerUser(usuario) {
    await client.connect()
    await db.collection("usuarios").insertOne({ ...usuario, passwordConfirm: undefined })
    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function login(usuario) {
    await client.connect()
    console.log("Ingreso al servicio")
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    console.log(existe, usuario)
    if (!existe) throw new Error("No se pudo ingresar")
    if (usuario.password != existe.password) throw new Error("No se pudo ingresar")

    const token = crearToken({...existe, password: undefined, passwordConfirm: undefined})
    console.log(token)
    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}