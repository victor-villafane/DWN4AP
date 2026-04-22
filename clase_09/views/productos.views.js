import { createPage } from "../page/utils.js"

export function createListPage(productos) {
    let html = "<h1>Listado de productos</h1>"
    html += "<a href='/productos/nuevo-producto' >Nuevo producto</a>"
    html += "<ul>"
    productos.forEach(element =>
        html += `<li>${element.nombre} <a href="/productos/${element.id}">Ver</a> 
        | <a href="/productos/eliminar/${element.id}">Borrar</a>
        | <a href="/productos/editar/${element.id}">Editar</a>
        </li>`);
    html += "</ul>"
    return createPage("Productos", html)
}

export function createProductPage(producto) {
    let html = "<h1>Detalle de producto</h1>"
    if (producto) {
        html += "<p> id: " + producto.id + "</p>"
        html += "<p> Nombre: " + producto.nombre + "</p>"
        html += "<p> Precio: " + producto.precio + "</p>"
    }
    html += "<a href='/productos' >Volver</a>"
    return createPage("Productos", html)
}

export function nuevoProductoForm() {
    let html = "<h1>Nuevo producto</h1>"
    html += "<form action='/productos/nuevo-producto' method='post' >"
    html += "<div>"
    html += "<label>Nombre:</label>"
    html += "<input type=text name='nombre'/>"
    html += "</div>"
    html += "<div>"
    html += "<label>Precio:</label>"
    html += "<input type=text name='precio'/>"
    html += "</div>"
    html += "<button type='submit' >Guardar</button>"
    html += "</form>"
    html += "<a href='/productos' >Volver</a>"
    return createPage("Nuevo producto", html)
}

export function deleteProductPage(producto) {
    let html = "<h1>Eliminar producto</h1>"
    if (producto) {
        html += `<form action='/productos/eliminar/${producto.id}' method='post'>`
        html += "<p> id: " + producto.id + "</p>"
        html += "<p> Nombre: " + producto.nombre + "</p>"
        html += "<p> Precio: " + producto.precio + "</p>"
        html += "<button type='submit' >Eliminar</button>"
        html += "</form>"

    }
    html += "<a href='/productos' >Volver</a>"
    return createPage("Productos", html)
}

export function editProductPageForm(producto) {
    let html = "<h1>Editar producto</h1>"
    html += `<form action='/productos/editar/${producto.id}' method='post'>`
    html += "<div>"
    html += "<label>Nombre:</label>"
    html += `<input type=text name='nombre' value='${producto.nombre}'/>`
    html += "</div>"
    html += "<div>"
    html += "<label>Precio:</label>"
    html += `<input type=text name='precio' value='${producto.precio}'/>`
    html += "</div>"
    html += "<button type='submit' >Guardar</button>"
    html += "</form>"
    html += "<a href='/productos' >Volver</a>"
    return createPage("Nuevo producto", html)
}