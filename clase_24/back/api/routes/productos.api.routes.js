import express from "express"
import * as controllers from "../controllers/productos.api.controllers.js"
import { validateIdProducto, validateProducto } from "../../middlewares/productos.validate.js"

const route = express.Router()

route.get("/productos",controllers.getProductos) // #swagger.tags = ['Productos']
route.get("/productos/:id", controllers.getProductoById) // #swagger.tags = ['Productos']
route.post("/productos",[validateProducto],  controllers.saveProducto) // #swagger.tags = ['Productos']
route.delete("/productos/:id",[validateIdProducto], controllers.deleteProducto) // #swagger.tags = ['Productos']
route.patch("/productos/:id",[validateProducto] , controllers.actualizarProducto) // #swagger.tags = ['Productos']
route.put("/productos/:id",[validateProducto] , controllers.reemplazarProducto) // #swagger.tags = ['Productos']

export default route