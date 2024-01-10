"use client"
import Image from 'next/image';
import Header from '../../components/header';
import { Table, Button, Form, Container, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {fetchNews, urlRequest, updateNews1} from '../../scripts/utilities';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


const NewsTable = ({news, setNews}) => {

  const [editedNews, setEditedNews] = useState({
    id_new: '',
    type_new: '',
    relevance: ''
  });

  const handleChange = (e, newItem) => {
    const { name, value } = e.target;
    setEditedNews((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      id_new: newItem.id_new // Asegúrate de mantener el id
    }));
  };

  const handleSubmit1 = async (e, newItem) => {
    e.preventDefault();

    try {
      // Llama a la función updateNews para actualizar la noticia
      const updatedNews = await updateNews1(newItem.id_new, editedNews);

      // Actualiza el estado local con la nueva información
      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id_new === newItem.id_new ? { ...item, ...editedNews } : item
        )
      );

      console.log('Noticia actualizada:', updatedNews);
    } catch (error) {
      console.error('Error al actualizar la noticia:', error);
    }
  };


  return (

    <div className="table-responsive" style={{ height: '60vh' }}>

      <Table striped hover>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Titular</th>
            <th scope="col">¿Fuente Externa?</th>
            <th scope="col">Tipo</th>
            <th scope="col">Relevancia</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {news.map((newItem) => (
            <tr key={newItem.id_new}>
                <td>{newItem.id_new}</td>
                <td>{newItem.headline}</td>
                <td>{newItem.ext}</td>
                <td>
                    <Form.Control onChange={(e) => handleChange(e, newItem)} type="number" min="0" max="4" name="type_new" defaultValue={newItem.type_new} style={{ width: '55px' }} />
                </td>
                <td>
                    <Form.Control onChange={(e) => handleChange(e, newItem)} type="number" min="0" max="1" name="relevance" defaultValue={newItem.relevance} style={{ width: '55px' }} />
                </td>
                <td>
                <span className="buttons d-flex">
                    <Form.Control onChange={(e) => handleChange(e, newItem)} type="hidden" name="id_new" defaultValue={newItem.id_new} />
                    <button type="submit" onClick={(e) => handleSubmit1(e, newItem)}>
                        <span className="material-symbols-outlined">save</span>
                    </button>
                    <a href={'editnew?id='+newItem.id_new}>
                        <span className="material-symbols-outlined">edit_square</span>
                    </a>
                </span>
                </td>        
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

};

const NewsCenter = () =>{

    const [news, setNews] = useState([]);

  useEffect(() => {
    // Lógica para obtener los datos de noticias
    const loadNews = async () => {
        const loadedNews = await fetchNews();
        setNews(loadedNews.reverse());
    };

    loadNews();

    const interval = setInterval(async () =>{
        const loadedNews = await fetchNews();
        if (loadNews.length >0 && loadedNews[0].id != news[0].id){
            setNews(loadedNews);
        }},5000);
        return () => clearInterval(interval);
  }, [news]); 

    return(
        <>
        <Header></Header>
        <Container>
            <br/>
            <h1>Centro de Noticias</h1>
            <br/>
            <Button href='addnews' className='btn-secondary'>Agregar Noticia</Button>
            <br/>
            <NewsTable news={news} setNews={setNews}></NewsTable>
        </Container>
        </>
    )
}

export default NewsCenter;