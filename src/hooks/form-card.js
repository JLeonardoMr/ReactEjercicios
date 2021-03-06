import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostFetch } from '../helpers/formfetch';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorAlert } from "./error";
export default function MediaCard({ id, user, email, post, reload }) {
    const [form, setForm] = useState({
        state: false,
        id: ""
    })
    const [edit, setEdit] = useState({})
    const [deleteCard, setDeleteCard] = useState({})
    const cardChanged = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            state: true
        })
    }
    const cardSubmit = async (e) => {
        e.preventDefault();
        switch (e.target.dataset.method) {
            case 'EDIT':
                setForm({
                    username: user,
                    email: email,
                    msg: post,
                    state: true,
                    id: id,
                })
                break;
            case 'CANCEL':
                setForm({ state: false })
                break;
            case 'PUT':
                let dataPut = await PostFetch({
                    method: 'PUT',
                    data: form
                })
                setForm({ state: false })
                setEdit(dataPut);
                reload.setError({})
                break;
            case 'DELETE':
                let dataDelete = await PostFetch({
                    method: 'DELETE',
                    id: id,
                })
                setForm({ state: null })
                setDeleteCard(dataDelete);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
    }, [edit])
    if (form.state) {
        return (
            <Card sx={{ maxWidth: 345 }} className='my-2 mw-100'>
                <CardContent>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control maxLength={40} type="text" name="username" value={form.username} placeholder="Enter Username" onChange={cardChanged} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control maxLength={40} type="email" name="email" placeholder="Email" onChange={cardChanged} value={form.email} />
                        </Form.Group>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                name="msg"
                                value={form.msg}
                                rows="3"
                                style={{ resize: 'none' }}
                                onChange={cardChanged}
                            />
                        </div>
                        <CardActions>
                            <Button type='submit' onClick={(e) => cardSubmit(e)} size="small"  data-method={'PUT'}>Save</Button>
                            <Button onClick={(e) => cardSubmit(e)} size="small" data-method={'CANCEL'}>Cancel</Button>
                        </CardActions>
                    </Form>
                </CardContent>
            </Card>
        )
    } else if (form.state === false){
        return (
            <Card sx={{ maxWidth: 345 }} className='my-2 mw-100'>
                <CardContent>
                    <Typography name="username" gutterBottom variant="h5" component="div">
                        {user}
                    </Typography>
                    <Typography name="email" variant="body2" color="text.secondary">
                        {post}
                    </Typography>
                    <Typography name="msg" className='mt-2' color="text.secondary">
                        {email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={(e) => cardSubmit(e)} size="small" data-method={'EDIT'}>Edit</Button>
                    <Form>
                        <Button type='submit' onClick={(e) => cardSubmit(e)} size="small" data-method={'DELETE'}>Delete</Button>
                    </Form>
                </CardActions>
                {
                    edit.ok
                    ?<ErrorAlert error={edit} className='AlertEditCard'/>
                    :<></>
                }
            </Card>
        );
    }else{
        return (
            <>
                <ErrorAlert error={deleteCard} className='AlertDeleteCard' />
            </>
        )
    }
}
