import jwt from "jsonwebtoken"
const SECRET = "homero"

export function crearToken(usuario){
    const token = jwt.sign(
        usuario,
        SECRET,
        { expiresIn: "2h" }
    )
    return token
}