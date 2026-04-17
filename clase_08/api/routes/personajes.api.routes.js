import express from "express"
import * as controllers from "../controllers/personajes.api.controllers.js"

const route = express.Router()

route.get("/personajes", controllers.getPersonajes)
// route.get("/productos/:id", controllers.getProductoById)
// route.post("/productos", controllers.saveProducto)
// route.delete("/productos/:id", controllers.deleteProducto)
// route.patch("/productos/:id", controllers.actualizarProducto)
// route.put("/productos/:id", controllers.reemplazarProducto)

export default route