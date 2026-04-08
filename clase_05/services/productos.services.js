import { access, readFile, writeFile, constants } from 'fs/promises'

const path = "./data/productos.json"

export function getProductos() {
    return readFile(path, { encoding: 'utf8' })
        .then((productoString) => JSON.parse(productoString)
            .filter(producto => producto.eliminado != true))
        .catch(err => [])
}

export function getProductosById(id) {
    return getProductos()
        .then(productos => productos.find(producto => producto.id == id))
        .catch(err => { })
}

export async function guardarProducto(producto) {
    try {
        const productos = await getProductos()
        producto.id = productos.length + 1
        productos.push(producto)
        await access(path, constants.F_OK)
        await writeFile(path, JSON.stringify(productos))
        return producto
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function eliminarProducto(id) {
    try {
        const productos = await getProductos()
        let productoEliminado = {}
        // const productosEliminado = productos.filter(producto => {
        //     if (producto.id != id) {
        //         return true
        //     } else {
        //         productoEliminado = producto
        //         return false
        //     }
        // })
        productos.forEach(producto => {
            if (producto.id == id) {
                producto.eliminado = true
                productoEliminado = producto
            }
        });
        await access(path, constants.F_OK)
        await writeFile(path, JSON.stringify(productos))
        return productoEliminado
    } catch (error) {
        throw new Error("Exploto!")
    }
}

export async function editarProducto(producto) {
    try {
        const productos = await getProductos()
        let productoEditado = {}

        productos.forEach(item => {
            if (item.id == producto.id) {
                item.nombre = producto.nombre
                item.precio = producto.precio
                productoEditado = item
            }
        });
        await access(path, constants.F_OK)
        await writeFile(path, JSON.stringify(productos))
        return productoEditado
    } catch (error) {
        throw new Error("Exploto!")
    }
}