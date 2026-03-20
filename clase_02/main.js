const http = require("http")

const productos = [
    { id: 1, nombre: "Espresso", precio: 120 },
    { id: 2, nombre: "Cappuccino", precio: 150 },
    { id: 3, nombre: "Latte", precio: 160 },
    { id: 4, nombre: "Americano", precio: 110 },
    { id: 5, nombre: "Mocha", precio: 170 }
]

const app = http.createServer((request, response) => {
    console.log(request.url)
    response.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    response.write('<header>Mi espectacular página web!</header>')
    switch (request.url) {
        case "/":
            response.write("<h1>Nombre y apellido</h1>")
            break;
        case "/materia":
            response.write("<h1>Aplicaciones hibridas</h1>")
            break;
        case "/profesor":
            response.write("<h1>Profesor</h1>")
            break;
        case "/productos":
            response.write("<ul>")
            productos.forEach(
                producto => response.write(`<li>${producto.nombre}</li>`)
            )
            response.write("</ul>")
            break;
        default:
            response.write("<h1>404 - pagina no encontrada</h1>")
            break;
    }
    response.end('</body></html>')
})

app.listen(2026, () => console.log("funcionando..."))