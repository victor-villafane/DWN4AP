import express from "express"
import * as controllers from "../controllers/productos.api.controllers.js"

const route = express.Router()

route.get("/productos", controllers.getProductos)
route.get("/productos/:id", controllers.getProductoById)
route.post("/productos", controllers.saveProducto)
route.delete("/productos/:id", controllers.deleteProducto)
route.patch("/productos/:id", controllers.actualizarProducto)

export default route