import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useLenguaje from '../hooks/useLenguaje';
import useTheme from '../hooks/useTheme';

export const HijosLenguajeHeader = () => {
    const { theme, changeTheme, changeLenguaje } = useTheme()
    return <>
        <Col className={`col-12`}>
            <h2>Mi aplicacion Sin Contex API</h2>
            <h3>Mi Cabecera</h3>
        </Col>
        <Col className='col-6'>
            <Form.Group>
                <Form.Check
                    onChange={changeTheme}
                    type={"switch"}
                    id={"theme"}
                    label={`Mode ${theme ? "Dark" : "Light"}`}
                />
            </Form.Group>
        </Col>
        <Col className='col-6'>
            <Form.Group className="mb-3">
                <Form.Label htmlFor={"lenguaje"}>Lenguaje</Form.Label>
                <Form.Select
                    name={"lenguaje"}
                    id={"lenguaje"}
                    onChange={changeLenguaje}
                >
                    <option defaultValue hidden>Select Lenguaje</option>
                    <option value="es">Español</option>
                    <option value="en">Ingles</option>
                    <option value="al">Aleman</option>
                </Form.Select>
            </Form.Group>
        </Col>
    </>;
};

export const HijosLenguajeMain = () => {
    const { lenguaje, textContent } = useLenguaje()
    const [texto, setTexto] = useState("es");
    useEffect(() => {
        if (lenguaje === "es") {
            setTexto(textContent.es)
        } else if (lenguaje === "en") {
            setTexto(textContent.en)
        }else if (lenguaje === "al") {
            setTexto(textContent.al)
        }
    }, [lenguaje,textContent]);
    return <>
        <Col>
            <h3>Mi contenido principal</h3>
            <p>{texto.p ?? textContent.es.p}</p>
            <Button>{texto.button ?? textContent.es.button}</Button>
        </Col>
    </>;
};

export const HijosLenguajeFooter = () => {
    return <>
        <Col>
            <h3>Mi pie de pagina</h3>
        </Col>
    </>;
};

