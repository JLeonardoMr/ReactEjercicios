import React, { useState, useEffect } from "react";
import '../css/form.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import MediaCard from "./hooks/form-card";
import { PostFetch } from './helpers/formfetch';
import { ErrorAlert, ErrorMsg } from "./hooks/error";
import useGet from "./hooks/useGet";

function LoadMsg({ error, data , reload}) {
    if (error) {
        return (
            <>
                <ErrorMsg error={error.status} status={error.statusText} url={error.url} />
            </>
        )
    } else if (error === false) {
        return (
            <>
                {
                    data.map(el => <MediaCard key={el.id} id={el.id} user={el.user} email={el.email} post={el.post} reload={reload}/>)
                }
            </>
        )
    } else {
        return (
            <>
                <h3>Pendiente</h3>
            </>
        )
    }

}
export function SectionForm() {
    const [form, setForm] = useState({})
    const [error, setError] = useState({})
    const [data, setData] = useState({});
    const [err, setErr] = useState(null);
    const { apiData } = useGet();
    const handleChanged = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await PostFetch({
            method: 'POST',
            data: form
        })
        setForm({})
        setError(data);
    }
    useEffect(() => {
        apiData('http://localhost:3004/profile').then(res => {
            if (res.length > 0) {
                setData(res)
                setErr(false)
            } else {
                setData({})
                setErr({
                    error: true,
                    status: res.status,
                    statusText:
                        (!res.statusText
                            ? 'Ocurrio un error'
                            : res.statusText),
                    type: res.type,
                    url: res.url
                })
            }
        })
    }, [error,apiData]);
    return (
        <Row className="px-3">
            <Col sm={6}>
                <h4>Fomulario</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control maxLength={20} type="text" name="username" value={form.username || ""} placeholder="Enter Username" onChange={handleChanged} />
                        <Form.Text className="text-muted">
                            4 ~ 20 Character Limit
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email" onChange={handleChanged} value={form.email || ""} />
                    </Form.Group>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name="msg" value={form.msg || ""} rows="3" style={{ resize: 'none' }} onChange={handleChanged}></textarea>
                    </div>
                    <Button id={'btnSubmit'} variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit
                    </Button>
                </Form>
                {
                    (error.ok)
                        ? (<ErrorAlert ok={error.ok} type={error.type} error={error.status} statusText={error.statusText} url={error.url} />)
                        : (<ErrorAlert ok={error.ok} type={error.type} error={error.status} statusText={error.statusText} url={error.url} />)
                }
            </Col>
            <Col sm={6}>
                <LoadMsg error={err} data={data} reload={{error,setError}} />
            </Col>
        </Row>
    )
}