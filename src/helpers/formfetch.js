export const PostFetch = ({ method, data, id }) => {
    let headers = { 'Content-type': 'application/json; charset=UTF-8' }
    if (method === 'POST') {
        let options = {
            method: 'POST',
            body: JSON.stringify({
                user: data.username,
                email: data.email,
                post: data.msg
            }),
            headers
        };
        return fetch('http://localhost:5000/profile/', options)
    } else if (method === 'PUT') {
        let options = {
            method: 'PUT',
            body: JSON.stringify({
                user: data.username,
                email: data.email,
                post: data.msg
            }),
            headers
        };
        return fetch(`http://localhost:5000/profile/${data.id}`, options)
    } else if (method === 'DELETE') {
        return fetch(`http://localhost:5000/profile/${id}`, {
            method: 'DELETE',
        })
    }
}