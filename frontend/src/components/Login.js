import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { FaCircleUser } from "react-icons/fa6";

const Login = ({ login }) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const onChangeName =  (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeId =  (e) => {
        const id = e.target.value;
        setId(id);
    };

    const handleLogin = () => {
        login({name: name, id: id});
        navigate('/');
    }

    return (
        <div>
            <Container className='my-3 py-3' style={{ maxWidth: '70%' }}>
                <h1 className='text-center my-3' style={{ fontWeight: 'bold' }}>Login</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaCircleUser className='my-3' size={60} />
                </div>
                <Form className='m-3 p-3'>
                    <Form.Group className='mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>Username</Form.Label>
                        <Form.Control type='text' placeholder='Enter username' value={name} onChange={onChangeName} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>ID</Form.Label>
                        <Form.Control type='text' placeholder='Enter id' value={id} onChange={onChangeId} />
                    </Form.Group>
                    <Button className='mt-3' variant='dark' onClick={handleLogin}>Submit</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;