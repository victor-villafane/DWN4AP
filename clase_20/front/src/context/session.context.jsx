import { createContext, useContext, useState } from "react";

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

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")))
    const [token, setToken] = useState(localStorage.getItem("token"))

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", jwt)

        setUsuario(usuario)
        setToken(token)
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
