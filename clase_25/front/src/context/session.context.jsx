import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const SessionContext = createContext() //crea un contexto

export function useSession() {
    return useContext(SessionContext)
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout(){
    const { onLogout } = useSession()
    return onLogout
}

export function useToken(){
    const { token } = useSession()
    return token
}

export function useRol(){
    const { token } = useSession()
    const payload = jwtDecode(token)
    console.log(payload?.rol || "user")
    return payload?.rol || "user"
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")))
    const [token, setToken] = useState(localStorage.getItem("token"))
    // const [rol, setRol] = useState()

    const onLogin = (jwt, usuario) => {
        const payload = jwtDecode(jwt)
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", jwt)
        // localStorage.setItem("rol", payload?.rol || "user")
        setUsuario(usuario)
        setToken(jwt)
        // setRol(payload?.rol || "user")
    }

    const onLogout = () => {
        setUsuario(null)
        setToken(null)
        localStorage.clear()
    }

    return (
        <SessionContext.Provider value={{ usuario, setUsuario, token, setToken, onLogin, onLogout }} >
            {children}
        </SessionContext.Provider>
    )
}
