import jwt from "jsonwebtoken"

export async function validateToken(req, res, next){
    try {
        const auth = req.headers.authorization
        const [ bearer, token ] = auth.split(" ")

        if( bearer != "Bearer" || !token ) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = validateToken(token)

        req.usuario = usuario

        next()
    } catch (error) {
        res.status(401).json({ message: "Token invalido" })
    }
}