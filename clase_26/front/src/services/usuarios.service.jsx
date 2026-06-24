import { useApi } from "./api.service"

export const useApiUsuarios = () => {
    const { call } = useApi()

    const login = ( credenciales ) => call("/usuarios/login", "POST", credenciales)
    const register = ( email, password, passwordConfirm ) => call( "/usuarios", "POST", {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    } )
    
    return { login, register }
}