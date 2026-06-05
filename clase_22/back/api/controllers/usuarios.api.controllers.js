import * as services from "../../services/usuarios.services.js"

export function registerUser(req, res){
    services.registerUser(req.body)
        .then( usuario => res.status(201).json(usuario) )
        .catch( err => res.status(500).json({ message: "No se puede registrar el usuarios" }) )
}

export function login(req, res){
    services.login(req.body)
        .then( usuario => res.status(200).json(usuario) )
        .catch( err => res.status(400).json({ message: "Usuario o contraseña incorrectos" }) )
}