"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {TopBarState, SectionAdsTop} from '../../components/header';

//Imports React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//CSS Style
import '../../styles/style.css';
import { useRouter } from 'next/router';



//Components HTML



export const AdmNavBar = () => {

    const logout = async()=>{
        try{
            const response = await fetch('../api/auth/logout',{
                method: 'GET',
            });
            if(response.ok){
              const host = window.location.hostname;
              window.location.href=host+'/login';
            }
        }catch(error){
            console.error(error.messaje);
        }

    }  

  return(
    <div className='container_nav'>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='#'><Image width={100} height={30} src='https://svgshare.com/i/ye7.svg' title='OmniSports'  alt="Logo OmniSports"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='px-3 me-auto'>
              <Nav.Link href='#'>Inicio</Nav.Link>
              <Nav.Link href='#'>Marcadores</Nav.Link>
              <NavDropdown title="Secciones" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#">Futbol</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Mercado de traspasos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">
                    Otros
                  </NavDropdown.Item>
              </NavDropdown>
             
            </Nav>
            <Nav>
                <NavDropdown title="Administrador" id="navbarScrollingDropdownAdmin">
                  <NavDropdown.Item href="#">Consola</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Centro de Noticias
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">
                    Agregar Noticia
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>


        </Container>
      </Navbar>
    </div>
    
  )
}

export default function Header(){
  return(
    <>
    <TopBarState></TopBarState>
    <SectionAdsTop></SectionAdsTop>
    <AdmNavBar></AdmNavBar></>
  )
};
