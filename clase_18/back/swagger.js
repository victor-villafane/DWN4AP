import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "Api de personajes, peliculas y cafe",
        description: "Es una api de pruebas"
    },
    host: "localhost:2026",
    basePath: "/api",
    schemas: ["http"],
    tags: [
        {
            name: "Películas",
            description: "Endpoints relacionados con películas"
        },
        {
            name: "Personajes",
            description: "Endpoints relacionados con personajes"
        },
        {
            name: "Productos",
            description: "Endpoints relacionados con productos"
        }
    ]
}

const endpoints = [
    "./api/routes/peliculas.api.routes.js",
    "./api/routes/personajes.api.routes.js",
    "./api/routes/productos.api.routes.js"
]

const swagger = swaggerAutogen()

swagger("swagger.json", endpoints, doc)
