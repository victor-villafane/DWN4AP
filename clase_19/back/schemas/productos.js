import yup from "yup"

export const productosSchema = yup.object({
    nombre: yup.string().required("El nombre es un campo requerido").min(3),
    precio: yup.number().positive().integer().required("El precio es un campo requerido")
})

export const productoIdSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{100}$/, "No es un _id valido")
})