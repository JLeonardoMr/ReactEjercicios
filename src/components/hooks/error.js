import { useState } from 'react';
import { Col, Alert, Button } from 'react-bootstrap';

export function ErrorMsg(error) {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Col>
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>¡Error {error.error}!</Alert.Heading>
                    <p>{error.status}{' '}{error.type}</p>
                    <hr />
                    <i>{error.url}</i>
                </Alert>
            </Col>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export function ErrorAlert(error) {
    // console.log(error);
    // variant={ }
    if (error.ok === true ) {
        return (
            <Alert variant={'success'} className='mt-3'>
                {error.statusText} Succsess
            </Alert>
        )
    } else if (error.ok === false) {
        return (
            <Alert variant={'danger'} className='mt-3'>
                ¡Error {error.error}! {error.statusText}{' '}
                <Alert.Link href="#">{error.url}</Alert.Link>
            </Alert>
        )
    } else if (error.className === 'AlertDeleteCard') {
        return (
            <Alert variant={'success'} className={`${error.className}`}>
                ¡Post eliminado con exito!
            </Alert>
        )
    } 
    else {
        return <></>
    }
}