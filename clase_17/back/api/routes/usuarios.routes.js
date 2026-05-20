import express from "express"
import * as controller from "../controllers/usuarios.api.controllers.js"
const router = express.Router()

router.post("/", controller.registerUser)
router.post("/login", controller.login)

export default router