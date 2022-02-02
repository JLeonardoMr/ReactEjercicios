import { useNavigate, useParams } from "react-router"
import { deleteUser, getUser } from "../helpers/GetUser";

export const User = () => {
    const Params = useParams();
    //! Ojo como el params o en este caso el id viene en string lo tenemos que pasar a numero
    const User = getUser(parseInt(Params.userId))
    const Navigate = useNavigate();

    const handleDelete = () =>{
        deleteUser(User.id)
        // Navigate("/users")
        //! Para que el navegador no tenga la posivilidad de volver hacia atras y tenga la vista de donde salio
        //! colocatemos {replace:true} esto nos permite eliminar la vista que teniamos antes de eliminar
        //! de esta manera no puede volver atras a la vista de los datos
        Navigate("/users",{replace:true})
    }
    return (
        <div>
            <h2>
                {User.name}
            </h2>
            <div>
                Email: {User.email}
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
