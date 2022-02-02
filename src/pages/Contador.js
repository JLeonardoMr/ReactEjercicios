import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ContadorHijo from '../components/ContadorHijo';
//!OJITO CON ContadorHijo
const Contador = () => {
    const [contador, setContador] = useState(0);
    const [input, setInput] = useState("");
    //! El useCallback nos sirve para guardar funciones en memo y no volver a re-enderizarlas
    //* const sumar = () => setContador(contador + 1);
    const sumar = useCallback(() => {
        setContador(contador + 1)
    }, [contador]);
    //* const restar = () => contador !== 0
    //*     ? setContador(contador - 1)
    //*    : setContador(contador);
    const restar = useCallback(() => {
        contador !== 0
            ? setContador(contador - 1)
            : setContador(contador);
    }, [contador]);
    const handleInput = (e) => setInput(e.target.value);
    return (
        <Row>
            <Col className='col-12'>
                <Col className='text-center'>
                    <h2>Memorización en React</h2>
                    <hr />
                </Col>
                <h3>Teoria</h3>
                <a
                    href="https://es.reactjs.org/docs/react-api.html#reactmemo"
                    target="_blank"
                    rel="noreferrer"
                >
                    memo
                </a>
                <ul>
                    <li>Se encarga de memorizar un componente</li>
                    <li>La vuelve a memorizar al momento de que sus props Cambien</li>
                    <li>Evita re-enderizados</li>
                    <li>Hay que evitarlo en la medida de lo prosible, podria ser mas costosa la tarea de memorizacion que el re-enredizado del componente</li>
                    <li>Usalo cuando:
                        <ul>
                            <li>Tenemos muchos elementos renderizados en una lista</li>
                            <li>Llamamos datos de APIs</li>
                            <li>Un componente se vuelve muy pesado</li>
                            <li>Salen Alertas de rendimiento en la consola</li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <a
                    href="https://es.reactjs.org/docs/hooks-reference.html#usecallback"
                    target="_blank"
                    rel="noreferrer"
                >
                    useCallback
                </a>
                <ul>
                    <li>
                        Memoriza una función, para no volverla a definir en cada render.
                    </li>
                    <li>
                        Usalo siempre que se pase una función como <b>prop</b> a un componente memorizado.
                    </li>
                    <li>
                        Usalo siempre que se pase una función como parámetro de un efecto.
                    </li>
                </ul>
                <hr />
                <a
                    href="https://es.reactjs.org/docs/hooks-reference.html#usememo"
                    target="_blank"
                    rel="noreferrer"
                >
                    useMemo
                </a>
                <ul>
                    <li>
                        Memoriza un valor calculado, es decir, el resultado de una función.
                    </li>
                    <li>
                        Genera propiedades computadas.
                    </li>
                    <li>
                        Usalo en procesos pesados.
                    </li>
                </ul>
            </Col>
            <hr />
            <Col className='col-12 text-center'>
                <h3>Contador</h3>
                {contador}
                <Col className='my-1'>
                    <Button onClick={restar} className='mx-1'>-</Button>
                    <Button onClick={sumar} className='mx-1'>+</Button>
                </Col>
            </Col>
            <Col className='col-12 my-1'>
                <Form.Group>
                    <Form.Label>Input</Form.Label>
                    <Form.Control type='text' onChange={handleInput} value={input} />
                </Form.Group>
            </Col>
            <Col className='col-12 text-center'>
                <ContadorHijo contador={contador} sumar={sumar} restar={restar} />
            </Col>
        </Row>
    )
};

export default Contador
