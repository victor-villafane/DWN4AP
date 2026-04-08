import * as productosService from "../services/productos.services.js";
import * as productosView from "../views/productos.views.js";

export function getProductos(req, res) {
    productosService.getProductos()
        .then(productos => res.send(productosView.createListPage(productos)))
}

export function getProductosById(req, res) {
    const id = req.params.idProducto
    // console.log(id)
    productosService.getProductosById(id)
        .then(producto => res.send(productosView.createProductPage(producto)))
        .catch(err => res.send("404"))
}

export function nuevoProductoForm(req, res) {
    res.send(productosView.nuevoProductoForm())
}

export function guardarProducto(req, res) {
    const producto = req.body
    // console.log(producto)
    productosService.guardarProducto(producto)
        .then(producto => res.send(productosView.createProductPage(producto)))
        .catch(err => res.send("No se pudo guardar el producto"))
}

export function eliminarProductoForm(req, res) {
    const id = req.params.idProducto
    productosService.getProductosById(id)
        .then(producto => res.send(productosView.deleteProductPage(producto)))
        .catch(err => res.send("404"))
}

export function eliminarProducto(req, res) {
    const id = req.params.idProducto
    productosService.eliminarProducto(id)
        .then(producto => res.send(productosView.createProductPage(producto)))
        .catch(err => res.send("404"))
}

export function editarProductoForm(req, res) {
    const id = req.params.idProducto
    productosService.getProductosById(id)
        .then(producto => res.send(productosView.editProductPageForm(producto)))
        .catch(err => res.send("404"))
}

export function editarProducto(req, res) {
    const id = req.params.idProducto
    const producto = {
        id: id,
        nombre: req.body.nombre,
        precio: req.body.precio
    }
    productosService.editarProducto(producto)
        .then(producto => res.send(productosView.createProductPage(producto)))
        .catch(err => res.send("404"))
}