import jwt from "jsonwebtoken"
import { validateToken as validarToken } from "../services/token.services.js"

export async function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        const [bearer, token] = auth.split(" ")

        if (bearer != "Bearer" || !token) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = validarToken(token)

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(401).json({ message: "Token invalido" })
    }
}

export function rolValidateAdmin(req, res, next) {
    try {
        const auth = req.headers.authorization
        const [bearer, token] = auth.split(" ")

        if (bearer != "Bearer" || !token) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = validarToken(token)
        console.log(usuario)
        if( usuario.rol != "admin" ) return res.status(401).json({ message: "No autorizado" })
        
        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(401).json({ message: "Token invalido" })
    }
}