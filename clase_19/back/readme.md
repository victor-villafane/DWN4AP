# 1. La url no hace referencia a la accion sino al recurso

    /productos/nuevo        -> POST /productos
    /productos/editar/2     -> PUT  /productos/2

    URL: Uniform Resource Locator
    URI: Uniform Resource Identifier

# 2. USO DE LOS VERBOS HTTP

    GET             -> obtener
    POST            -> crear
    PUT             -> Reemplazar
    PATCH           -> Actualizar
    DELETE          -> Eliminar

# 3. USAMOS JSON COMO FORMATO PARA INTERCAMBIO DE DATOS

# 4. ESTADOS DE LAS RESPUESTAS

    1xx: Informativos
    2xx: OK             -> 200,201,202....
    3xx: Redireccion
    4xx: Errores del cliente
    5xx: Errores del servidor

