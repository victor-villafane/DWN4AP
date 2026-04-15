import express from 'express'
import * as productosControllers from "../controllers/productos.controller.js"

const router = express.Router()

router.get("/productos", productosControllers.getProductos)
router.get("/productos/nuevo", productosControllers.nuevoProductoForm)
router.post("/productos/nuevo", productosControllers.guardarProducto)
router.get("/productos/eliminar/:idProducto", productosControllers.eliminarProductoForm)
router.post("/productos/eliminar/:idProducto", productosControllers.eliminarProducto)
router.get("/productos/editar/:idProducto", productosControllers.editarProductoForm)
router.post("/productos/editar/:idProducto", productosControllers.editarProducto)

router.get("/productos/:idProducto", productosControllers.getProductosById)

export default router