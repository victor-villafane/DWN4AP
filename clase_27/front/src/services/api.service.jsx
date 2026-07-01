import { useToken } from "../context/session.context"

export function useApi() {
    const token = useToken()

    const call = (uri, method, body) => {
        return fetch("http://localhost:2026/api" + uri, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error("Error!")
            })
    }

    return { call }
}