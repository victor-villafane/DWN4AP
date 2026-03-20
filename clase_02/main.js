const http = require("http")

const app = http.createServer( (request, response) => {
    console.log(request.url)
    response.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    response.write("<h1>")
    if( request.url == "/hola" ){
        response.write("Llego un hola")
    }else{
        response.write("No llego un hola")
    }
    response.write("</h1>")
    response.end('</body></html>')
} )

app.listen( 2026, () => console.log( "funcionando..." ) )