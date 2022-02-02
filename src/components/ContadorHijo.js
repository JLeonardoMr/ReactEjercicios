import React, { memo, useMemo } from 'react';
import { Button, Col } from 'react-bootstrap';

const ContadorHijo = ({ contador, sumar, restar }) => {
    const superNumero = useMemo(() => {
        let num = 0;
        for (let i = 0; i < 1000000000; i++) {
            num++;
        }
        return num;
    }, []);
    console.log('Hijo del contador se reenderizo');
    return <>
        <h3>Hijo del Contador: {contador}</h3>
        <Col className='my-1'>
            <Button onClick={restar} className='mx-1'>-</Button>
            <Button onClick={sumar} className='mx-1'>+</Button>
        </Col>
        <h3>{superNumero}</h3>
    </>
};
//! Usar memo de esta manera para no recargar
export default memo(ContadorHijo)