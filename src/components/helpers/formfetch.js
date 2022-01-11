export const PostFetch = ({ method,data,target,id,user,email,post }) => {
    if (method === 'POST') {
        let options = {
            method: 'POST',
            body: JSON.stringify({
                user: data.username,
                email: data.email,
                post: data.msg
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        };
        return fetch('http://localhost:3004/profile/', options)
    } else if (method === 'PUT') {
        let options = {
            method: 'PUT',
            body: JSON.stringify({
                user: data.username,
                email: data.email,
                post: data.msg
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        };
        return fetch(`http://localhost:3004/profile/${data.id}`, options)
    } else if(method === 'DELETE'){
        return fetch(`http://localhost:3004/profile/${id}`, {
            method: 'DELETE',
        })
    }
}