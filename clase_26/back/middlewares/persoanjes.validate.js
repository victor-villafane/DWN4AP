import { personajesSchema } from "../schemas/personajes.js";

export function validatePersonajes(req, res, next){
    personajesSchema.validate( req.body, {abortEarly: false, stripUnknown: true} )
        .then( () => next() )
        .catch( err => res.status(400).json({ message: err.errors }) )
}