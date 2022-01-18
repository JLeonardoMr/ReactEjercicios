import React from 'react'

export const Error404 = () => {
    return (
        <div>
            <h2>Error 404: Not Found</h2>
            <p>The page: <i>{window.location.href} - Not Exist</i></p>
        </div>
    )
}
