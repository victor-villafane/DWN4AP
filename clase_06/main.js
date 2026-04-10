import express from "express"
import productosRoute from './routes/productos.routes.js'
import productosApiRoute from './api/routes/productos.api.routes.js'
const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( productosRoute )
app.use( "/api", productosApiRoute )

app.listen(2026, () => console.log("Funcionando en el http://localhost:2026"))