import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { useSearchParams } from "next/navigation";
import { fetchNewsById, params } from '../../app/scripts/utilities';
import { Badge, Button, Form, Container, Card, Modal } from 'react-bootstrap';
import Image from 'next/image';


export default function Article(){

    const searchParams = useSearchParams()
    const id=searchParams.get('id');

    
    const [news, setNews] = useState("");
    const [categoria, setCategoria] = useState("");
    const [autor, setAutor] = useState("");


    useEffect(()=>{
        if(id){
            fetchNewsById(id)
            .then(response => setNews(response))
            .catch(error => console.error('Error fetching news:', error));
        }
    
    },[id]);

    useEffect(()=>{
        const parametros = params();
        console.log(parametros);
        parametros.authors.then(authors=>{
            authors.forEach(author => {  
                if(author.id_author==news.id_author){
                    setAutor(author.name_author);
                }
            });
            
          });
        parametros.categories.then(categories=>{
            categories.forEach(category =>{
                if(category.id_category==news.id_category){
                    setCategoria(category.name_category)
                }
            })

          });
        
    })
    console.log(categoria, autor);
    return (
        <>
        <Layout>
            <Container>
                <br/>
                <Badge bg="secondary">{categoria}</Badge>
                <br/>
                <h1>{news.headline}</h1>
                <small>{news.date_new}</small>
                <br/>
                <h4>{news.lead_new}</h4>
                <br/>
                <div className="mx-2" style={{width: "80vw", height:"40vw", position: "relative"}}>
                <Image className="image-fluid" alt="News picture" fill={true} src={news.image_url} style={{objectFit: "cover"}}></Image>
                </div>           
                <br/>
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify', fontSize: '1.2rem'}}>{news.content}</p>
                <small>Por: {autor}</small>
                <br/>
            </Container>
        </Layout>
        </>
    )
}