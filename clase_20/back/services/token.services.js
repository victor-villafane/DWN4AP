import jwt from "jsonwebtoken"

export function crearToken(usuario) {
    console.log("SECRET",)
    const token = jwt.sign(
        usuario,
        process.env.SECRET,
        { expiresIn: "2h" }
    )
    return token
}

export function validateToken(token) {
    const payload = jwt.verify(token, process.env.SECRET) //verify tambien verifica que el token no este vencido temporalmente
    return payload
}