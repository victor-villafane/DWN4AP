import express from "express"
import productosRoute from './routes/productos.routes.js'
import productosApiRoute from './api/routes/productos.api.routes.js'
import personajesApiRoute from './api/routes/personajes.api.routes.js'
import peliculasApiRoute from './api/routes/peliculas.api.routes.js'
import swaggerFile from "./swagger.json" with { type: "json" }
import swagerUI from "swagger-ui-express"


const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api-docs", swagerUI.serve, swagerUI.setup(swaggerFile))

app.use( productosRoute )
app.use( "/api", productosApiRoute )
app.use( "/api", personajesApiRoute )
app.use( "/api", peliculasApiRoute )

app.listen(2026, () => console.log("Funcionando en el http://localhost:2026"))