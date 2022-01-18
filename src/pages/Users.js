import React from 'react'
import { useParams } from 'react-router'

export const Users = () => {
    let params = useParams();
    console.log(params);
    // let { username } = useParams();
    return (
        <div>
            <h3>Perfil de usuarios</h3>
            <p>Nombre de usuario <b>{ }</b></p>
        </div>
    )
}
