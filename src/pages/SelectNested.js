import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import useGet from '../hooks/useGet';

function SelectList({ name, title, data, change }) {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label htmlFor={name}>{title}</Form.Label>
                <Form.Select name={name} id={name} onChange={(e) => { change(e) }}>
                    <option defaultValue hidden>Select {name}</option>
                    {
                        data.length > 0
                            ? data.map((el, i) => <option key={i} value={el.select}>{el.municipio || el.select}</option>)
                            : <></>
                    }
                </Form.Select>
            </Form.Group>
        </>
    )
}


export default function SelectNested() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [parroquias, setParroquias] = useState([]);
    const [selectEstado, setSelectEstado] = useState({})
    const [selectMunicipio, setSelectMunicipio] = useState({})
    const [selectParroquia, setSelectParroquia] = useState({})

    let { apiData } = useGet()

    const handleChangeState = (e) => {
        if (e.target.name === 'estado') {
            setSelectEstado({
                ...selectEstado,
                [e.target.name]: e.target.value
            })
            if (selectEstado.estado !== e.target.value) {
                setMunicipios([])
                setParroquias([])
                setSelectMunicipio({})
                setSelectParroquia({})
            }
        }
        if (e.target.name === 'municipio') {
            setSelectMunicipio({
                ...selectMunicipio,
                [e.target.name]: e.target.value
            })
            if (selectMunicipio.municipio !== e.target.value) {
                setParroquias([])
                setSelectParroquia({})
            }
        }
        if (e.target.name === 'parroquia') {
            setSelectParroquia({
                ...selectParroquia,
                [e.target.name]: e.target.value
            })
        }
    }
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (data.length <= estados.length) {
            } else {
                estados.push({
                    select: element.estado
                })
            }
        }
    }
    if (estados.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].estado === selectEstado.estado) {
                const element = data[i].municipios;
                for (let e = 0; e < element.length; e++) {
                    const el = element[e];
                    if (element.length <= municipios.length) {
                    } else {
                        municipios.push({
                            municipio: `${el.municipio} - ${el.capital}`,
                            select: el.municipio,
                            parroquia: el.parroquias
                        })
                    }
                }
            }
        }
    }
    if (municipios.length > 0) {
        for (let i = 0; i < municipios.length; i++) {
            if (municipios[i].select === selectMunicipio.municipio) {
                const element = municipios[i].parroquia;
                if (element.length <= parroquias.length) {
                } else {
                    for (let i = 0; i < element.length; i++) {
                        parroquias.push({
                            select: element[i]
                        })
                    }
                }
            }
        }
    }
    useEffect(() => {
        apiData('https://raw.githubusercontent.com/zokeber/venezuela-json/master/venezuela.json')
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [apiData])
    return (
        <Row>
            <Col sm={6}>
                <h2>Select Anidados</h2>
                {loading && <h3>Loading</h3>}
                {
                    data.length > 0 && <SelectList name={'estado'} title={'Estados de Venezuela'} change={handleChangeState} data={estados} />
                }
                {
                    municipios.length > 0 && <SelectList name={'municipio'} title={`Municipios de ${selectEstado.estado}`} change={handleChangeState} data={municipios} />
                }
                {
                    parroquias.length > 0 && <SelectList name={'parroquia'} title={`Parroquias de ${selectMunicipio.municipio}`} change={handleChangeState} data={parroquias} />
                }
                <p>{selectEstado.estado}{">"}{selectMunicipio.municipio || ""}{">"}{selectParroquia.parroquia || ""}</p>
            </Col>
        </Row>
    )
}