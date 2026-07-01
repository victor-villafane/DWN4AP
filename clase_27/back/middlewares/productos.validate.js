import { productoIdSchema, productosSchema } from "../schemas/productos.js"

export function validateProducto(req, res, next) {
    console.log("Validando...")
    productosSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}

export function validateIdProducto(req, res, next) {
    productoIdSchema.validate({ _id: req.params.id }, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}