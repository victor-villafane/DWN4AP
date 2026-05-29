import { loginSchema, registerSchema } from "../schemas/usuarios";

export function loginValidate(req, res, next){
    loginSchema.validate(req.body)
        .then( () => next() )
        .catch( (err) => res.status(400).json({message: err.errors}) )
}

export function registerValidate(req, res, next){
    registerSchema.validate(req.body)
        .then( () => next() )
        .catch( (err) => res.status(400).json({message: err.errors}) )
}