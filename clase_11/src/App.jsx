// import React, { Component } from 'react'
// rcc
// export default class App extends Component {
//   render() {
//     return (
//       <div>App</div>
//     )
//   }
// }
// import React from 'react'
// rfce
// export default function App() {
//   return (
//     <div>App</div>
//   )
// }
// rafce
import React, { useState, useEffect } from 'react'

const App = () => {
  // Todo el codigo de js que quieran
  console.log("Hola!")
  const mensaje = "Este es un mensaje en una variable"
  const personajes = [
    {
      id: 1,
      nombre: "Homero",
      apellido: "Simpson"
    },
    {
      id: 2,
      nombre: "Marge",
      apellido: "Simpson"
    },
    {
      id: 3,
      nombre: "Bart",
      apellido: "Simpson"
    },
    {
      id: 4,
      nombre: "Lisa",
      apellido: "Simpson"
    },
    {
      id: 5,
      nombre: "Maggie",
      apellido: "Simpson"
    }
  ]
  const [ contador, setContador ] = useState(0)
  const [ pokemons, setPokemons ] = useState([])
  const handleClick = () => {
    setContador( contador + 1 )
    console.log("Click", contador)
  }

  const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then( res => res.json() ) //Response
      .then( data => setPokemons(data.results) )
      .catch( err => console.error(err) )
  }
  // componentDidMount -> cuando se monto en pantalla
  // componentDidUpdate -> cuando se actualizo
  // componentDidUnMount -> cuando desaparece
  useEffect( () => {
    //componentDidMount
    console.log("LLAMARON A MOUNT")
    fetchPokemons()
  }, [] )
  
  useEffect( () => {
    console.log("LLAMARON A CONTADOR")
  }, [contador] )

  return ( //html -> No es html -> JSX 
    <>
      <h1 className='' style={{ color: "red" }} >Hola</h1>
      <p>desde jsx</p>
      <p>
        Contador: {contador}
      </p>
      <ul>
        {
          personajes.map(personaje =>
            <li key={personaje.id} onClick={handleClick} >{personaje.nombre}</li>
          )
        }
      </ul>
      <button onClick={fetchPokemons} >
        fetch
      </button>
      <ul>
        {
          pokemons.map( pokemon => <li key={pokemon.name} >{pokemon.name}</li> )
        }
      </ul>
    </>
  )
}

export default App