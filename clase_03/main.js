// const http = require("http")
import http from "http"
// const productos = require("./data/productos")        //commonjs
import productos from "./data/productos.js";
// const page = require("./page/utils")                 //commonjs
import { createPage, createProductList } from "./page/utils.js"
import { readFile } from "fs";
// import page from "./views/compoente.vue"             //module -> nativa de js
const app = http.createServer((request, response) => {
    // console.log(request.url)
    switch (request.url) {
        case "/":
            response.write(createPage("Alumno", "<h1>Nombre y apellido</h1>"))
            response.end()
            break;
        case "/materia":
            response.write(createPage("Materia", "<h1>Aplicaciones hibridas</h1>"))
            response.end()
            break;
        case "/profesor":
            response.write(createPage("Profesor", "<h1>Profesor</h1>"))
            response.end()
            break;
        case "/productos":
            response.write(createPage("productos", createProductList(productos)))
            response.end()
            break;
        case "/archivo":
            readFile("public/productos.json", (err, data) => {
                console.log(data)
                if (err) response.write(err)
                response.write(data)
                console.log("Leyendo el archivo")
                response.end()
            })
            response.end()
            break;
        case "/favicon.ico":
            readFile("public/1774573606f78c.png", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            response.end()
            break;
        case "/listado.html":
            readFile("public/index.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            response.end()
            break;
        case "/productos.html":
            readFile("public/productosListado.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            response.end()
            break;
        case "/contact.html":
            readFile("public/contacto.html", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            response.end()
            break;

        case "/1774573606f78c.png":
            readFile("public/1774573606f78c.png", (err, data) => {
                if (err) response.write(err)
                response.write(data)
                response.end()
            })
            response.end()
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
            response.end()
            break;
    }
    // console.log("Termino")
    // response.end()
})
const PORT = process.env.PORT || 2026;

// app.listen(2026, () => console.log("funcionando..."))
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor en puerto ${PORT}`);
});