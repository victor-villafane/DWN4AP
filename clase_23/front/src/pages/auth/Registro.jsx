import { useNavigate } from "react-router"
import { useApiUsuarios } from "../../services/usuarios.service"

const Registro = () => {
    const navigate = useNavigate()
    const { register } = useApiUsuarios()
    const handleSubmit = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const pass = e.target.pass.value
        const passConfirm = e.target.passConfirm.value

        register(email, pass, passConfirm)
            .then(data => {
                navigate("/login")
            })
            .catch(err => console.error("No se pudo registrar"))

    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100' >
            <div className='card p-4 shadow' style={{ width: '350px' }} >
                <h2 className='text-center mb-4' > Registar Usuario </h2>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label className='form-label' >Email: </label>
                        <input type="email" placeholder='Ingrese su mail' className='form-control' name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña: </label>
                        <input type="text" placeholder='Ingrese su password' className='form-control' name='pass' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Confirmar Contraseña: </label>
                        <input type="text" placeholder='Ingrese su password' className='form-control' name='passConfirm' />
                    </div>
                    <button type='submit' className='btn btn-primary w-100' >Ingresar</button>
                </form>
            </div>
        </div>
    )
}
export default Registro