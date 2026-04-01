import express from "express"
import { readFile } from 'node:fs/promises';
import { createPage } from "./page/utils.js"
const app = express()

const usuarios = []

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/productos", async (req, res) => {
    try {
        const productos = await readFile("./data/productos.json", { encoding: 'utf8' })
            .then((productoString) => JSON.parse(productoString))

        let html = "<h1>Listado de productos</h1>"
        html += "<ul>"
        productos.forEach(element => html += `<li>${element.nombre} <a href="/productos/${element.id}">Ver</a></li>` );
        html += "</ul>"

        res.send(createPage("Productos", html))
    } catch (error) {
        res.send(error)
    }
})

app.get("/productos/:idProducto", async (req, res) => {
    const idProducto = req.params.idProducto
    try {
        const productos = await readFile("./data/productos.json", { encoding: 'utf8' })
            .then((productoString) => JSON.parse(productoString))
            
        let html = "<h1>Detalle de producto</h1>"
        const producto = productos.find( producto => producto.id == idProducto )
        if( producto ){
            html += "<p> id: " + producto.id + "</p>" 
            html += "<p> Nombre: " + producto.nombre + "</p>" 
            html += "<p> Precio: " + producto.precio + "</p>" 
        }
        html += "<a href='/productos' >Volver</a>"
        res.send(createPage("Productos", html))
    } catch (error) {
        res.send(error)
    }
})

app.get("/saludo", (req, res) => { //query string
    console.log(req.query.nombre)
    res.send("Todo ok")
})

app.post("/saludo", (req, res) => {
    console.log(req.body)
    usuarios.push(req.body)
    res.send("Todo ok")
    console.log(usuarios)
})

app.get("/comentario", (req, res) => {
    res.send("Mi comentario")
})

app.listen(2026, () => console.log("Funcionando en el http://localhost:2026"))