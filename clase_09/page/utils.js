export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
    html += '<title>' + title + '</title></head><body>'
    html += '<header>Mi espectacular página web!</header>'
    html += content
    html += '</body></html>'
    return html
}
export function createProductList(productos) {
    let html = ""
    html += "<ul>"
    productos.forEach(
        producto => html += `<li>${producto.nombre}</li>`
    )
    html += "</ul>"
    return html
}
// module.exports = {createPage, createProductList}
export default {createPage, createProductList}