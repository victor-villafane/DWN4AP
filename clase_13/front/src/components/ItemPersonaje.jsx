import Box from "./Box"

const ItemPersonaje = ({ personaje }) => {
    return (
        <tr>
            <td>
                {
                    personaje.image
                        ? <img src={personaje.image} alt="" width={50} />
                        : <Box letra={personaje.name[0]}/>
                }
            </td>
            <td>{personaje.name}</td>
            <td>{personaje.house}</td>
            <td>{personaje.dateOfBirth}</td>
        </tr>
    )
}

export default ItemPersonaje