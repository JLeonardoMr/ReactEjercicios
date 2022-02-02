import React, { useState} from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

function Input({
    check,
    form,
    className,
    as,
    md,
    controlId,
    label,
    type,
    name,
    placeholder,
    value,
    onFuntion,
    Feedback,
    valid,
}) {
    return (
        <Form.Group
            className={className}
            as={as}
            md={md}
            controlId={controlId}
        >
            {
                form
                &&
                <>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        required
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={(e) => { onFuntion(e) }}
                        isValid={true === valid}
                        isInvalid={false === valid}
                    />
                    <Form.Control.Feedback type="invalid">{Feedback.invalid}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">{Feedback.valid}</Form.Control.Feedback>
                </>
            }
            {
                check
                &&
                <Form.Check
                    required
                    label={"Agree to terms and conditions"}
                    feedback={"You must agree before submitting."}
                    feedbackType={"invalid"}
                />
            }
        </Form.Group>
    )
}



export default function ContacForm() {
    const [form, setForm] = useState({})
    const [validated, setValidated] = useState(false);
    const [isValid, setIsValid] = useState({})
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value.replace(" ", "")
        })
        if (e.target.name === 'username') {
            if (e.target.value.length < 8 ||
                e.target.value.length > 28 ||
                e.target.value.length === 0) {
                setIsValid({
                    ...isValid,
                    [e.target.name]: false
                })
            } else {
                setIsValid({
                    ...isValid,
                    [e.target.name]: true
                })
            }
        }
        if (e.target.name === 'password') {
            let regex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;
            if (e.target.value.length < 8 ||
                e.target.value.length === 0 ||
                !regex.test(e.target.value)) {
                setIsValid({
                    ...isValid,
                    [e.target.name]: false
                })
            } else {
                setIsValid({
                    ...isValid,
                    [e.target.name]: true
                })
            }
        }
        if (e.target.name === 'Rpassword') {
            if (form.password === e.target.value) {
                setIsValid({
                    ...isValid,
                    [e.target.name]: true
                })
            } else {
                setIsValid({
                    ...isValid,
                    [e.target.name]: false
                })
            }
        }
        if (e.target.name === 'email') {
            // eslint-disable-next-line no-useless-escape
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/g;
            if (!regex.test(e.target.value)) {
                setIsValid({
                    ...isValid,
                    [e.target.name]: false
                })
            } else {
                setIsValid({
                    ...isValid,
                    [e.target.name]: true
                })
            }
        }
    }
    const handleSubmit = (e) => {
        const FormControl = e.currentTarget;
        console.log(FormControl);
        if (FormControl.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
    };
    return (
        <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Input
                        form={true}
                        className={''}
                        as={Col}
                        md={4}
                        controlId={'username'}
                        label={'Username'}
                        type={'text'}
                        name={'username'}
                        placeholder={'Enter your Username'}
                        value={form.username}
                        onFuntion={handleChange}
                        Feedback={{ valid: 'look good', invalid: "Your username must contain more than 8 characters" }}
                        valid={isValid.username}
                    />
                    <Input
                        form={true}
                        className={''}
                        as={Col}
                        md={4}
                        controlId={'password'}
                        label={'Password'}
                        type={'password'}
                        name={'password'}
                        placeholder={'Enter your Password'}
                        value={form.password}
                        onFuntion={handleChange}
                        Feedback={{ valid: 'look good', invalid: "Your password must contain at least one uppercase character and one axis symbol. .-/!?@" }}
                        valid={isValid.password}
                    />
                    <Input
                        form={true}
                        className={''}
                        as={Col}
                        md={4}
                        controlId={'Rpassword'}
                        label={'Repeat Password'}
                        type={'password'}
                        name={'Rpassword'}
                        placeholder={'Repeat your Password'}
                        value={form.Rpassword}
                        onFuntion={handleChange}
                        Feedback={{ valid: 'look good', invalid: 'please verify that the password is identical' }}
                        valid={isValid.Rpassword}
                    />
                    <Input
                        form={true}
                        className={''}
                        as={Col}
                        md={6}
                        controlId={'email'}
                        label={'Email'}
                        type={'email'}
                        name={'email'}
                        placeholder={'Enter your Email'}
                        value={form.email}
                        onFuntion={handleChange}
                        Feedback={{ valid: 'look good', invalid: 'Check that your email is correct' }}
                        valid={isValid.email}
                    />
                    <Input
                        check={true}
                        className={''}
                        as={Col}
                        md={12}
                        controlId={'check'}
                    />

                </Row>
                <Button className='col' type="submit">Submit form</Button>
            </Form>
        </Row>
    )
}