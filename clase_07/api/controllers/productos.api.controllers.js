import * as services from "../../services/productos.services.js"

export function getProductos(req, res) {
    const filtros = req.query
    services.getProductos(filtros)
        .then(productos => res.status(200).json(productos))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export function getProductoById(req, res) {
    const id = req.params.id;
    services.getProductosById(id)
        .then(producto => {
            if (!producto) {
                res.status(404).json({ message: "Producto no encontrado" });
            } else {
                res.status(200).json(producto);
            }
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }));
}

export function saveProducto(req, res) {
    if (!req.body?.nombre || !req.body?.precio) {
        res.status(400).json({ message: "El campo nombre y precio son obligatorios" })
        return
    }
    const producto = {
        nombre: req.body?.nombre,
        precio: req.body?.precio
    }
    services.guardarProducto(producto)
        .then((producto) => res.status(201).json(producto))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function deleteProducto(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    services.eliminarProducto(id)
        .then(producto => {
            if (producto.message) {
                res.status(400).json(producto)
            } else {
                res.status(202).json(producto)
            }
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export async function actualizarProducto(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const productoAnterior = services.getProductosById(id)
    const producto = {}
    producto.id = id
    producto.nombre = req.body.nombre ? req.body?.nombre : productoAnterior?.nombre
    producto.precio = req.body.precio ? req.body?.precio : productoAnterior?.precio
    services.editarProducto(producto)
        .then(producto => res.status(202).json(producto))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export async function reemplazarProducto(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const producto = {}
    producto.id = id
    producto.nombre = req.body?.nombre
    producto.precio = req.body?.precio
    services.editarProducto(producto)
        .then(producto => {
            if (Object.keys(producto).length != 0) {
                res.status(202).json(producto)
                return
            }
            res.status(404).json({ message: "No se pudo modificar el producto" })
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}