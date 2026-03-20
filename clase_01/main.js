const http = require("http")

const server = http.createServer( (request, response) => {
    console.log("LLEGO ALGO!")
    response.end("Termino!")
} )

server.listen(2026)