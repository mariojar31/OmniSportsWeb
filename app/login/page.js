"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from '../../components/header';
import { Button, Form, Container, Card, Modal } from 'react-bootstrap';

const FormLogin = ()=>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      try {

        const response = await fetch('../api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
          });

          if(!response.ok){
            setError('Credenciales inválidas');
          }else{
           router.push("/dashboard");
          }
        
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        setError('Error en el inicio de sesión');
      }
    };

    return(
        <>
            <Form id="form_login" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Usuario: </Form.Label>
                    <Form.Control name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña: </Form.Label>
                    <Form.Control name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>      
                <br/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit">Iniciar Sesión</Button>
            </Form>
        </>
    )
}

export default function Login(){


    return(
        <>
        <Header></Header>
        <Container>
            <br/>
            <br/>
            <Card>
                <Card.Header className="text-center">Iniciar Sesión</Card.Header>
                    <div className="p-3">
                        <Card.Text className="text-center text-muted">Inicio de sesión como administrador. </Card.Text>
                        <FormLogin></FormLogin>                       
                    </div>

            </Card>
        </Container>
        </>
    )
} 