import { Col, Row } from 'react-bootstrap';
import { NavLink, useSearchParams, Outlet, useLocation } from 'react-router-dom';
import { getAllUsers } from '../helpers/GetUser';

export const Users = () => {
    //! Con el useSearchParams() vamos hacer un filtrado de usuarios
    const [searchParams, setSearchParams] = useSearchParams();
    //? con el useLocation lo usaremos para que este no limpie la url con el filtro
    //? y de esta manera no perdemos el valor del filtro
    const location = useLocation();
    const users = getAllUsers();
    //! Aqui declaramos una constante con lo que venga del searchParams (QUE FUNCIONA COMO UN useState)
    //! Si el searchParams viene vacio o es undefined Usamos ?? para preguntar si existe y si no pues usamos
    //! comillas para darle un valor vacio cunciona casi igual que un "Or" (||) 
    const filter = searchParams.get("filter") ?? "";
    const HandleFilter = (e) => {
        setSearchParams({ filter: e.target.value })
    }
    return (
        <Row>
            <Col>
                <h2>Users</h2>
                {/* Aqui agregamos el valor que viene en la ruta para que de esta menera se pueda pasar el filtro por url */}
                <input value={filter} onChange={HandleFilter} type="text" placeholder='filter' />
                <ul>
                    {/* Usamos el metodo filter para filtrar los usuarios */}
                    {users.filter(user => {
                        //! preguntamos que si filter viene vacio retorne true y siga ejecutando el map con normalidad
                        if (!filter) return true;
                        //! y si no viene vacio aqui declaramos una constante para guarde el nombre o los nombres
                        //! y lo volvemos con toLowerCase() a minusculas para que no tenga problemas con el camelCase
                        const name = user.name.toLowerCase();
                        //! luego retornamos los nombres que se acemejen a lo que se encuentre en la constante filter
                        //! y igualmente lo convertimos todo a minusculas para que no tenga problemas con el camelCase
                        return name.includes(filter.toLowerCase())
                    }).map(el => <li key={el.id}>
                        {/* 
                        //! Obligatoriamente No tenemos que pasar una ruta absoluta 
                        */}
                        {/* <Link to={"/users/" + el.id}> */}
                        {/* 
                        //!podemos pasarle solo el id o el dato que queramos simplificado
                        //!y en caso de que sea un numero lo convertimos a string 
                        */}
                        <NavLink
                            style={({ isActive }) => (isActive ? { color: "red" } : {})}
                            //TODO tambien con el className OJITO 
                            className={({ isActive }) => isActive ? "active" : ""}
                            //? en caso de que el NavLink/Link este nos modifica la url, y para que eso no suceda
                            //? usaremos useLocation
                            to={el.id.toString() + location.search}
                        >
                            {el.name}
                        </NavLink>
                    </li>)}
                </ul>
            </Col>
            <Col>
                <Outlet />
            </Col>
        </Row>
    )
}
