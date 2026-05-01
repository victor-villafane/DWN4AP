import express from "express"
import * as controllers from "../controllers/productos.api.controllers.js"

const route = express.Router()

route.get("/productos", controllers.getProductos) // #swagger.tags = ['Productos']
route.get("/productos/:id", controllers.getProductoById) // #swagger.tags = ['Productos']
route.post("/productos", controllers.saveProducto) // #swagger.tags = ['Productos']
route.delete("/productos/:id", controllers.deleteProducto) // #swagger.tags = ['Productos']
route.patch("/productos/:id", controllers.actualizarProducto) // #swagger.tags = ['Productos']
route.put("/productos/:id", controllers.reemplazarProducto) // #swagger.tags = ['Productos']

export default route