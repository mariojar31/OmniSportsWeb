"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
import '../styles/style.css';

//Utilities - Components
const TopNews = () =>{
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const refreshInterval = 5000; // Intervalo de 5 segundos entre noticias  

  useEffect(() => {
    const urlapi = 'https://api-hgy2uu7j1-mario-acendras-projects.vercel.app/api/news';
    try{
    fetch(urlapi)
      .then(response => response.json())
      .then(data => {
        setNews(data.News);
      });}catch(error){
        console.error(error);
      }
  }, []); // Se ejecuta solo al montar el componente

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex(prevIndex => (prevIndex + 1) % news.length);
    }, refreshInterval);

    return () => clearInterval(intervalId); // Limpieza al desmontar el componente
  }, [news]); // Se ejecuta al cambiar el estado de 'news'
  
  return (
    <span>
      {(news && news.length > 0 && news[currentNewsIndex])&& <p>{news[currentNewsIndex].headline}</p>}
    </span>
  );

}

const LiveTime = () =>{
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // Función para obtener la fecha y hora actual
    function getCurrentDateTime() {
      const today = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const now = today.toLocaleString('es-CO', options);
      const time = today.toLocaleTimeString('es-CO');
      return `${now} | ${time}`;
    }

    // Actualizar la fecha y hora actual cada segundo
    const intervalId = setInterval(() => {
      const currentDateTime = getCurrentDateTime();
      setDateTime(currentDateTime);
    }, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return(
    <span id="datetime">{dateTime}</span>
  );

}

//Components HTML

export const TopBarState = () => {

  return(
    <div className="menu_top d-flex flex-row justify-content-around sticky-top">
    <div className="time p-1" id="datetime"><span><LiveTime></LiveTime></span></div>
    <div className="BreakingNews flex-nowrap d-lg-flex">
      <div className="recBreakingNews bg-danger text-white p-1">Ultimas Noticias</div>
      <div id="topNews" className="newsSpace p-1"><TopNews></TopNews></div>
    </div>
    <div className="redes p-1 d-flex">
      <span><a href="#">
        <Image src='https://svgshare.com/i/ycy.svg' alt='Logo red social' title='logofacebookround' width={30} height={30}/>
      </a></span>
      <span><a href="#">
        <Image src='https://svgshare.com/i/yd5.svg' alt='Logo red social' title='instalogoround' width={30} height={30}/>
      </a></span>
      <span><a href="#">
        <Image src='https://svgshare.com/i/ydR.svg' alt='Logo red social' title='youtubelogoround' width={30} height={30}/>
      </a></span>
      <span><a href="#"><Image src='https://svgshare.com/i/ycj.svg' title='twitterlogoround' alt='Logo red social' width={30} height={30}/>
      </a></span>
    </div>
  </div>
  )
}

export const SectionAdsTop = () => {
  return(
    //Mark section - Add
    <div id="marcaSection"> 
        <div className="marca d-flex flex-lg-nowrap px-5 py-2 m-2 h-100">
          <div className="logo1"><span><Image priority width={350} height={100} src='https://svgshare.com/i/ydy.svg' title='OmniSports' alt="Logo OmniSports"/></span></div>

          <svg id="topad" className="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="70%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Responsive image" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Espacio para anuncios publicitarios</title><rect width="100%" height="90%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">ADS Space</text>
          </svg>
        </div>
    </div>
    
  )
}

export const NavBar = () => {

  return(
    <div className='container_nav'>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='/'><Image width={100} height={30} src='https://svgshare.com/i/ye7.svg' title='OmniSports'  alt="Logo OmniSports"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='px-3 me-auto'>
              <Nav.Link href='/'>Inicio</Nav.Link>
              <Nav.Link href='/scores'>Marcadores</Nav.Link>
              {/* <NavDropdown title="Secciones" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#">Futbol</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Mercado de traspasos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">
                    Otros
                  </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form className='d-flex'>
            <Form.Control 
              type='search' 
              placeholder="Search"
              className="me-2"
              aria-label="Search" />
            <Button variant="outline-secondary"></Button>
            </Form>
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
    <NavBar></NavBar></>
  )
};
