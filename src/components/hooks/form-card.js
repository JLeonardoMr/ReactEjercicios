import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostFetch } from '../helpers/formfetch';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
export default function MediaCard({ id, user, email, post }) {
    const [form, setForm] = useState({
        state: false,
        id: ""
    })
    const cardChanged = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            state: true
        })
    }
    const cardSubmit = async (e) => {
        if (e.target.dataset.method === 'DELETE') {
            let data = await PostFetch({
                method: 'DELETE',
                id: e.target.dataset.id,
            })
            setForm({ state: false })
            window.location.reload()
        }
        if (e.target.dataset.method === 'EDIT') {
            setForm({
                username: e.target.dataset.user,
                email: e.target.dataset.email,
                msg: e.target.dataset.post,
                state: true,
                id: e.target.dataset.id,
            })
        }
        if (e.target.dataset.method === 'PUT') {
            let data = await PostFetch({
                method: 'PUT',
                data: form
            })
            setForm({ state: false })
            console.log(data);
        }
        if (e.target.dataset.method === 'CANCEL') {
            setForm({ state: false })
        }
    }
    if (form.state) {
        return (
            <Card sx={{ maxWidth: 345 }} className='mb-2'>
                <CardContent>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control maxLength={20} type="text" name="username" value={form.username} placeholder="Enter Username" onChange={cardChanged} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" name="email" placeholder="Email" onChange={cardChanged} value={form.email} />
                        </Form.Group>
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="msg" value={form.msg} rows="3" style={{ resize: 'none' }} onChange={cardChanged}></textarea>
                        </div>
                        <CardActions>
                            <Button type='submit' onClick={(e) => cardSubmit(e)} size="small" data-id={form.id} data-method={'PUT'}>Save</Button>
                            <Button onClick={(e) => cardSubmit(e)} size="small" data-method={'CANCEL'}>Cancel</Button>
                        </CardActions>
                    </Form>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card sx={{ maxWidth: 345 }} className='mb-2'>
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
                <Button onClick={(e) => cardSubmit(e)} size="small" data-id={id} data-user={user} data-email={email} data-post={post} data-method={'EDIT'}>Edit</Button>
                <Button type='submit' onClick={(e) => cardSubmit(e)} size="small" data-id={id} data-method={'DELETE'}>Delete</Button>
            </CardActions>
        </Card>
    );
}
