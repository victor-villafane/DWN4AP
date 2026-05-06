import React, { Activity, useEffect, useState } from 'react'

const Fetch = () => {
    const [url, setUrl] = useState("")
    const [razaSeleccionada, setRazaSeleccionada] = useState("")
    const [razas, setRazas] = useState([])

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(res => res.json())
            .then(data => setRazas(Object.keys(data.message)))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if( razaSeleccionada ){
            fetch(`https://dog.ceo/api/breed/${razaSeleccionada}/images/random`)
                .then(res => res.json())
                .then(data => setUrl(data.message))
                .catch(err => console.log(err))
        }
    }, [razaSeleccionada])

    // const handleSelect = (event) => {
    //     setRazaSeleccionada(event.target.value)
    // }

    return (
        <div>
            <select onChange={ (event) => setRazaSeleccionada(event.target.value) }>
                {
                    razas.map(raza => <option key={raza} value={raza}>{raza}</option>)
                }
            </select>
            {
                url && <img src={url} width={200} />  //Versiones anteriores
                // <Activity mode={ url ? 'visible' : 'hidden' } >  // En react 19 https://react.dev/reference/react/Activity
                //     <img src={url} width={200} />
                // </Activity>
            }
        </div>
    )
}

export default Fetch