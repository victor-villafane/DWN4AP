import { useNavigate } from "react-router"
import { useLogin } from "../context/session.context"

const Login = () => {
    const navigate = useNavigate()
    const login = useLogin()
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value
        fetch("http://localhost:2026/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error("No se pudo loguear")
            })
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
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label className='form-label' >Email: </label>
                        <input type="email" placeholder='Ingrese su mail' className='form-control' name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña: </label>
                        <input type="text" placeholder='Ingrese su password' className='form-control' name='pass' />
                    </div>
                    <button type='submit' className='btn btn-primary w-100' >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default Login