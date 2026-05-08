import React, { useState } from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Chat = () => {

    const [respuesta, setRespuesta] = useState("")
    const [mensaje, setMensaje] = useState("")

    const handlePregunta = async () => {
        console.log(mensaje)
        fetch("http://localhost:2026/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mensaje: mensaje
            })
        })
            .then(res => res.json())
            .then(msg => setRespuesta(msg.message))
            .catch(err => console.error(err))
    }

    const handleChange = (event) => {
        setMensaje(event.target.value)
    }
    //https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat
    return (
        <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {respuesta}
            </ReactMarkdown>
            <input type="text" onChange={handleChange} />
            <button onClick={handlePregunta} >Preguntar</button>
        </div>
    )
}

export default Chat