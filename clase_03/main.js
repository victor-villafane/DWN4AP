// const http = require("http")
import http from "http"
// const productos = require("./data/productos")        //commonjs
import productos from "./data/productos.js";
// const page = require("./page/utils")                 //commonjs
import { createPage, createProductList } from "./page/utils.js"
import { readFile } from "fs";
// import page from "./views/compoente.vue"             //module -> nativa de js
const app = http.createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.write(createPage("Alumno", "<h1>Nombre y apellido</h1>"))
            break;
        case "/materia":
            response.write(createPage("Materia", "<h1>Aplicaciones hibridas</h1>"))
            break;
        case "/profesor":
            response.write(createPage("Profesor", "<h1>Profesor</h1>"))
            break;
        case "/productos":
            response.write(createPage("productos", createProductList(productos)))
            break;
        case "/archivo":
            readFile("public/productos.json", (err, data) => {
                console.log(data)
                if (err) response.write(err)
                response.write(data)
                console.log("Leyendo el archivo")
                response.end()
            })
            break;
        case "/favicon.ico":
            readFile("public/1774573606f78c.png", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;
        case "/listado.html":
            readFile("public/index.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;
        case "/productos.html":
            readFile("public/productosListado.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;
        case "/contact.html":
            readFile("public/contacto.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;

        case "/1774573606f78c.png":
            readFile("public/1774573606f78c.png", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;
        case "/saludo?nombre=asdasdas":
            readFile("public/1774573606f78c.png", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            break;
        default:
            response.write(createPage("404", "<h1>404 - pagina no encontrada</h1>"))
            break;
    }
    console.log("Termino")
    // response.end()
})

app.listen(2026, () => console.log("funcionando..."))