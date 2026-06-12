import express from "express"
import * as controllers from "../controllers/personajes.api.controllers.js"
import { validatePersonajes } from "../../middlewares/persoanjes.validate.js"
import { rolValidateAdmin, validateToken } from "../../middlewares/token.validate.js"

const route = express.Router()

route.get("/personajes", [validateToken], controllers.getPersonajes) // #swagger.tags = ['Personajes']
route.post("/personajes/:id", controllers.asignarCafe) // #swagger.tags = ['Personajes']
route.get("/personajes/:id",[validateToken], controllers.getPersonajesById) // #swagger.tags = ['Personajes']
route.post("/personajes",[rolValidateAdmin, validatePersonajes], controllers.savePersonajes) // #swagger.tags = ['Personajes']
route.delete("/personajes/:id",[rolValidateAdmin], controllers.deletePersonajes) // #swagger.tags = ['Personajes']
route.patch("/personajes/:id",[rolValidateAdmin], controllers.actualizarPersonaje) // #swagger.tags = ['Personajes']
route.put("/personajes/:id",[rolValidateAdmin], controllers.reemplazarPersonaje) // #swagger.tags = ['Personajes']

export default route