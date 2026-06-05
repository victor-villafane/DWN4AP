import { useNavigate } from "react-router"
import { useLogin } from "../context/session.context"
import { useApiUsuarios } from "../services/usuarios.service"
import { Activity } from "react"
import { useForm } from "react-hook-form"

const Login = () => {
    const navigate = useNavigate()
    const login = useLogin()
    const { login: loginService } = useApiUsuarios()

    const {
        register,                                       /* Va a tener los valores de los inputs */
        handleSubmit,                                   /* Valida antes de enviar */
        formState: { errors, isValid, isSubmitting }    /* Errores, estado valido, envio en progreso */,
        watch
    } = useForm({
        mode: "onChange"
    })

    const password = watch("pass", "")
    const email = watch("email", "")

    const validaciones = {
        longitudMin: password.length >= 8,
        mayuscula: /[A-Z]/.test(password),
        minuscula: /[a-z]/.test(password),
        numero: /[0-9]/.test(password),
        simbolo: /[@$!%*?&]/.test(password)
    }

    const isValidPassword = Object.values(validaciones).every((value) => value == true)
    const onSubmitLogin = async (formData) => {

        const email = formData.email
        const pass = formData.pass

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
                <form onSubmit={handleSubmit(onSubmitLogin, ( errors) => console.log(errors))} className="needs-validation" noValidate>
                    <div className='mb-3'>
                        <label className='form-label' >Email: </label>
                        <input
                            type="email"
                            placeholder='Ingrese su mail'
                            className={
                                `form-control ${email.length === 0
                                    ? ''
                                    : errors.email
                                        ? 'is-invalid' : 'is-valid'
                                }`
                            }
                            {
                            ...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,}$/,
                                    message: "No es un email valido"
                                }
                            })
                            }
                        />
                        <Activity mode={errors.email ? "visible" : "hidden"} >
                            <div className="invalid-feedback">
                                {errors?.email?.message}
                            </div>
                        </Activity>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña: </label>
                        <input
                            type="text"
                            placeholder='Ingrese su password'
                            className={`form-control ${password.length == 0
                                ? ""
                                : !isValidPassword
                                    ? 'is-invalid'
                                    : 'is-valid'}`
                            }
                            name='pass'
                            {
                            ...register("pass", {
                                required: "La contraseña es obligatoria",
                                validate: value => {
                                    if (value.length < 8) return "Debe tener al menos 8 caracteres"
                                    if (!/[A-Z]/.test(value)) return "Debe tener al menos una mayuscula"
                                    if (!/[a-z]/.test(value)) return "Debe tener al menos una minuscula"
                                    if (!/[0-9]/.test(value)) return "Debe tener al menos un numero"
                                    if (!/[@$!%*?&]/.test(value)) return "Debe tener al menos un simbolo @$!%*?&"
                                    
                                    return true
                                }
                            })
                            }
                        />
                        <Activity mode={password.length > 0 ? "visible" : "hidden"} >
                            <ul className="list-unstyled mt-2" >
                                <li className={validaciones.longitudMin ? "text-success" : "text-danger"} >
                                    {validaciones.longitudMin ? "✔" : "X"} Minimo 8 caracteres
                                </li>
                                <li className={validaciones.mayuscula ? "text-success" : "text-danger"} >
                                    {validaciones.mayuscula ? "✔" : "X"} Una Mayuscula
                                </li>
                                <li className={validaciones.minuscula ? "text-success" : "text-danger"} >
                                    {validaciones.minuscula ? "✔" : "X"} Una Miniscula
                                </li>
                                <li className={validaciones.numero ? "text-success" : "text-danger"} >
                                    {validaciones.numero ? "✔" : "X"} Un numero
                                </li>
                                <li className={validaciones.simbolo ? "text-success" : "text-danger"} >
                                    {validaciones.simbolo ? "✔" : "X"} Un simbolo
                                </li>
                            </ul>
                        </Activity>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'
                        disabled={ !( isValidPassword && !errors.email ) || isSubmitting}
                    >{
                            isSubmitting ? "Ingresando..." : "Ingresar"
                        }</button>
                </form>
            </div>
        </div>
    )
}

export default Login