import express from "express"
// import * as controllers from "../controllers/chat.api.controllers.js"

const route = express.Router()

route.post("/chat", (req, res) => {
    const pregunta = req.body.mensaje
    const handlePregunta = async () => {
        const respuesta = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                "model": "qwen/qwen3-coder-480b-a35b-instruct",
                "messages": [
                    {
                        "role": "user",
                        "content": pregunta
                    }
                ],
                "temperature": 0.7,
                "top_p": 0.8,
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "max_tokens": 4096,
                "stream": false
            })
        })
        const data = await respuesta.json()
        console.log(data.choices)
        res.status(200).json({message: data.choices[0].message.content})
    }
    handlePregunta()
})


export default route