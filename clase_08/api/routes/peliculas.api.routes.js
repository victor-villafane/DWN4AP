import express from "express"
import * as controllers from "../controllers/peliculas.api.controllers.js"

const route = express.Router()

route.get("/peliculas", controllers.getPeliculas)
// route.get("/productos/:id", controllers.getProductoById)
// route.post("/productos", controllers.saveProducto)
// route.delete("/productos/:id", controllers.deleteProducto)
// route.patch("/productos/:id", controllers.actualizarProducto)
// route.put("/productos/:id", controllers.reemplazarProducto)

export default route