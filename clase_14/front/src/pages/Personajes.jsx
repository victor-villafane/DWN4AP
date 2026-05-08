import { useEffect, useState } from "react"
import TablePersonajes from "../TablePersonajes"

const Personajes = () => {
    const [personajes, setPersonajes] = useState([])

    useEffect(() => {
        fetch("http://localhost:2026/api/personajes")
            .then(res => res.json())
            .then(data => setPersonajes(data))
    }, [])

    return (
        <TablePersonajes personajes={personajes} />
    )
}

export default Personajes