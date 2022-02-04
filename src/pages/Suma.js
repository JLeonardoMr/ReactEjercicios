import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const type = {
    suma: "+",
    resta: "-",
    multiplicacion: "x",
    division: "÷",
    porcentaje: "%",
}
const state = {
    state: true,
    panel: "",
    value1: "",
    value2: "",
    cal_1: 0,
    cal_2: 0,
    contador: true,
    res: 0,
    float: false,
    suma: false,
    resta: false,
    multiplicacion: false,
    division: false,
    porcentaje: false,
}
export const Suma = () => {
    const [value, setValue] = useState(state);
    const handleReset = (e) => {
        if (e.target.innerHTML === "C") {
            state.state = true;
            state.panel = "";
            state.value1 = "";
            state.value2 = "";
            state.cal_1 = 0;
            state.cal_2 = 0;
            state.contador = true;
            state.res = 0;
            state.float = false;
            state.suma = false;
            state.resta = false;
            state.multiplicacion = false;
            state.division = false;
            state.porcentaje = false;
            setValue({ ...state });
        } else if (e.target.innerHTML === "CE") {
            if (state.value1.length > 0) {
                state.panel = state.panel.slice(0, - state.value1.length)
                state.state = true;
                state.value1 = "";
                state.cal_1 = 0;
                setValue({ ...state });
            } else {
                setValue({ ...state });
            }
        } else if (e.target.innerHTML === "←") {
            state.panel = state.panel.slice(0, -1)
            state.value1 = state.value1.slice(0, -1)
            if (state.value1.indexOf(".") < 0) {
                state.float = false;
                state.cal_1 = parseInt(state.value1);
                setValue({ ...state });
            } else if (state.value1.indexOf(".") >= 0) {
                state.float = true;
                state.cal_1 = parseFloat(state.value1);
                setValue({ ...state });
            }
        }
    }
    const handleNum = (e) => {
        //? pregunto si el valor que viene es un operador y este active true a la operacion siguiente que hara
        if (e.target.innerHTML === type.suma) {
            state.suma = true;
            state.resta = false;
            state.multiplicacion = false;
            state.division = false;
            state.porcentaje = false;
        } else if (e.target.innerHTML === type.resta) {
            state.suma = false;
            state.resta = true;
            state.multiplicacion = false;
            state.division = false;
            state.porcentaje = false;
        } else if (e.target.innerHTML === type.multiplicacion) {
            state.suma = false;
            state.resta = false;
            state.multiplicacion = true;
            state.division = false;
            state.porcentaje = false;
        } else if (e.target.innerHTML === type.division) {
            state.suma = false;
            state.resta = false;
            state.multiplicacion = false;
            state.division = true;
            state.porcentaje = false;
        } else if (e.target.innerHTML === type.porcentaje) {
            state.suma = false;
            state.resta = false;
            state.multiplicacion = false;
            state.division = false;
            state.porcentaje = true;
        }
        //? agrego el valor al panel, sumandolo con el que ya existe
        state.panel += e.target.innerHTML;
        state.value1 += e.target.innerHTML.replace(type.suma, "").replace(type.resta, "").replace(type.multiplicacion, "").replace(type.division, "").replace(type.porcentaje, "");
        //? si el valor que viene en el value 1 no contiene un (punto ".") lo parseo a Int, de lo contrario lo parseo a float
        if (state.value1.indexOf(".") < 0) {
            state.float = false;
            state.cal_1 = parseInt(state.value1);
            setValue({ ...state });
        } else if (state.value1.indexOf(".") >= 0) {
            state.float = true;
            state.cal_1 = parseFloat(state.value1);
            setValue({ ...state });
        }
        //? si encuentra uno de los operadores en el value1 y value 2 resetea los cal y value, tambien cambia el estado y pasa el res a contador
        if (
            e.target.innerHTML === type.suma ||
            e.target.innerHTML === type.resta ||
            e.target.innerHTML === type.multiplicacion ||
            e.target.innerHTML === type.division ||
            e.target.innerHTML === type.porcentaje
        ) {
            state.cal_2 = state.res
            state.contador = false
            if (state.res === 0) { state.contador = true }
            state.cal_1 = 0
            state.value1 = ""
            setValue({ ...state })
        }
        //? si suma es true pasa a sumar lo que se guarda en el cal_1 y cal_2
        if (state.suma || state.contador) { //* sumo
            if (state.contador) {
                state.res = state.cal_1;
                setValue({ ...state });
            } else {
                state.res = state.cal_2 + state.cal_1;
                setValue({ ...state });
            }
        } else if (state.resta) { //* resto
            state.res = state.cal_2 - state.cal_1;
            setValue({ ...state });
        } else if (state.multiplicacion && state.cal_1 !== 0) { //* Multiplico
            state.res = state.cal_2 * state.cal_1;
            setValue({ ...state });
        } else if (state.division && state.cal_1 !== 0) { //* Divido
            state.res = state.cal_2 / state.cal_1;
            setValue({ ...state });
        } else if (state.porcentaje) { //* Saco porcentaje
            state.res = (state.cal_2 / 100) * state.cal_1;
            setValue({ ...state });
        }
    }
    return <>
        <Row>
            <Col className='text-center col-12'>
                <h2>Calculadora con Redux</h2>
                <h3>
                    {value.panel}
                </h3>
                <h3>Resultado: {value.res ? value.res : value.contador}</h3>
            </Col>
            <Col className='text-center col-12'>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>%</Button>
                <Button onClick={handleReset} className='m-1' style={{ width: "50px" }}>C</Button>
                <Button onClick={handleReset} className='m-1' style={{ width: "50px" }}>CE</Button>
                <Button onClick={handleReset} className='m-1' style={{ width: "50px" }}>←</Button>
            </Col>
            <Col className='text-center col-12'>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>7</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>8</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>9</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>÷</Button>
            </Col>
            <Col className='text-center col-12'>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>4</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>5</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>6</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>x</Button>
            </Col>
            <Col className='text-center col-12'>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>1</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>2</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>3</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>-</Button>
            </Col>
            <Col className='text-center col-12'>
                <Button disabled={state.float ? true : false} onClick={handleNum} className='m-1' style={{ width: "50px" }}>.</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>0</Button>
                <Button disabled={state.float ? true : false} onClick={handleNum} className='m-1' style={{ width: "50px" }}>.</Button>
                <Button onClick={handleNum} className='m-1' style={{ width: "50px" }}>+</Button>
            </Col>
        </Row>
    </>;
};
