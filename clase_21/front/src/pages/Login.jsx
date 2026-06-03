import { useNavigate } from "react-router"
import { useLogin } from "../context/session.context"
import { useApiUsuarios } from "../services/usuarios.service"
import { Activity, useState } from "react"

const Login = () => {
    const navigate = useNavigate()
    const login = useLogin()
    const [erroresFormulario, setErroresFormulario] = useState({})
    const { login: loginService } = useApiUsuarios()

    const handleEmail = (e) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,}$/
        if (!regex.test(e.target.value)) {
            setErroresFormulario({ ...erroresFormulario, email: "No es un email valido" })
        } else {
            const { email, ...errpresSinEmail } = erroresFormulario
            setErroresFormulario(errpresSinEmail)
        }
        console.log(Object.keys(erroresFormulario).length)
    }

    const handlePass = (e) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!regex.test(e.target.value)) {
            console.log("Contraseña invalida")
            setErroresFormulario({ ...erroresFormulario, pass: "No es una contraseña valida" })
        } else {
            const { pass, ...errpresSinPass } = erroresFormulario
            setErroresFormulario(errpresSinPass)
        }
        console.log(Object.keys(erroresFormulario).length)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        if (Object.keys(erroresFormulario).length > 0) return

        loginService({ email: email, password: pass })
            .then(data => {
                navigate("/")
                login(data.token, { email })
            })
            .catch(err => console.error("No se pudo loguear"))
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100' >
            <div className='card p-4 shadow' style={{ width: '350px' }} >
                <h2 className='text-center mb-4' > Iniciar Session </h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className='mb-3'>
                        <label className='form-label' >Email: </label>
                        <input onChange={handleEmail}
                            type="email"
                            placeholder='Ingrese su mail'
                            className={
                                `form-control ${erroresFormulario?.email
                                    ? 'is-invalid' : 'is-valid'}`
                            }
                            name='email' />
                        <Activity mode={erroresFormulario?.email ? "visible" : "hidden"} >
                            <div className="invalid-feedback">
                                {erroresFormulario?.email}
                            </div>
                        </Activity>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña: </label>
                        <input onChange={handlePass} type="text" placeholder='Ingrese su password' className={`form-control ${erroresFormulario?.pass ? 'is-invalid' : 'is-valid'}`} name='pass' />
                        <Activity mode={erroresFormulario?.pass ? "visible" : "hidden"} >
                            <div className="invalid-feedback">
                                {erroresFormulario?.pass}
                            </div>
                        </Activity>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'
                        disabled={Object.keys(erroresFormulario).length > 0}
                    >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default Login