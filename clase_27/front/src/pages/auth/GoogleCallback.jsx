import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useLogin } from "../../context/session.context"

const GoogleCallback = () => {
    const [search] = useSearchParams() //https://reactrouter.com/api/hooks/useSearchParams
    const login = useLogin()
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:2026/api/usuarios/google?code=" + search.get("code"))
            .then((res) => res.json())
            .then(data => {
                navigate("/")
                login(data.token, data.email )
            })
            .catch(err => console.log(err))
    }, [])
}

export default GoogleCallback