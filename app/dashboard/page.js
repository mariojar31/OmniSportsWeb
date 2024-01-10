"use client";
import Image from 'next/image';
import Header from '../components/header';
import { Table, Button, Form, Container, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';




export default function Dashboard() {

    const [user, setUser] = useState('');


    const getProfile = async()=>{
        try{
            const profile = await fetch('../api/profile',{
                method: 'GET',
            });
            if(!profile.ok){
                const host = window.location.hostname;
                window.location.href=host+"/login";
            }
            setUser(profile.data);
        }catch(error){
            return console.log('No autenticado', error);
        }
        
    }


  return (
    <>
    <Header></Header>

    <Container>
        <br/><br/>
        <h1>{'Consola de Administrador'}</h1>
        <br/>
        <div className="d-flex justify-content-center">        
          <Link href="dashboard/newsmanager">
            <Card className='mx-3 p-2' style={{width: '18rem'}}>
              <Card.Body className="p-2" style={{width: '90%'}}>
                <Card.Title>Centro de Noticias</Card.Title>
                <Card.Text>En esta sección podras administrar las noticias que se publican</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <Link href="/">
          <Card className='mx-3 p-2' style={{width: '18rem'}}>
              <Card.Body className="p-2" style={{width: '90%'}}>
                <Card.Title>Administrador de Dominio</Card.Title>
                <Card.Text>Actualmente no disponible</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <br/><br/>
        
    </Container>
    </>
  )
}