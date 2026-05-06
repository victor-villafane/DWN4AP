import ItemPersonaje from "./components/ItemPersonaje"

const TablePersonajes = ({ personajes }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Casa</th>
                    <th>Fecha de nacimiento</th>
                </tr>
            </thead>
            <tbody>
                {
                    personajes.map(personaje =>
                        <ItemPersonaje personaje={personaje} key={personaje._id} />
                    )
                }
            </tbody>
        </table>
    )
}

export default TablePersonajes