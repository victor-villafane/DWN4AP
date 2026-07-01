import express from "express"
import * as controller from "../controllers/usuarios.api.controllers.js"
import { jwtDecode } from "jwt-decode"
import * as services from "../../services/usuarios.services.js"

const router = express.Router()

router.post("/", controller.registerUser)
router.post("/login", controller.login)
router.get("/google", async (req, response) => {
    const code = req.query?.code
    console.log("code", code)
    try {
        const tokenReponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                code,
                client_id: "",
                client_secret: "",
                redirect_uri: "http://localhost:5173/auth/callback",
                grant_type: "authorization_code"
            })
        })
        const responseData = await tokenReponse.json()
        console.log(responseData)
        const { access_token, id_token } = responseData
        const user = jwtDecode(id_token)
        console.log(user)
        try {
            const res = await services.login({ email: user.email, password: "123456" })
            console.log("FUNCIONO", res)
            return response.status(200).json(res)
        } catch (error) {
            const registro = await services.registerUser({ email: user.email, password: "123456" })
            const login = await services.login({ email: user.email, password: "123456" })
            return response.status(200).json(login)
        }
        // console.log("access_token", access_token)
        // const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        //     headers: {
        //         Authorization: `Bearer ${access_token}`
        //     }
        // })
        // const userData = await userRes.json()
        // console.log("userData", userData)
    } catch (error) {
        console.log(error)
    }
})

export default router