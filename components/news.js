import React, { useEffect, useState } from 'react';
import {urlRequest, timeSincePublication, fetchNews} from '../app/scripts/utilities';
import Image from 'next/image';



// Función para procesar noticias
function processNews(loadedNews) {
    return loadedNews.map(New => {
      if (New && New.lead_new.includes('.')) {
        return {
          id: New.id_new,
          type: New.type_new,
          headline: New.headline,
          lead: New.lead_new.substring(0, New.lead_new.indexOf('.')),
          time: timeSincePublication(New.date_new),
          img: New.image_url,
          imgsrc: New.photo_src,
          relevance: New.relevance
        };
      }
      return null;
    }).filter(Boolean); // Elimina elementos nulos
  }
  
//Seleccion y render de las noticias

function mapNews(news, type) {
  return news.map(New => {
    if (type === 'head') {
      // Logica para el tipo 'head'
      return ((New.type === 1) ? (
        <span key={New.id} className='hl1 bg-secondary m-1' id='hl1' style={{backgroundImage: `url(${New.img})`}}>
        <span>{''}</span>
        <a href={'article?id='+New.id}>
          <div className='card-custome text-white p-1'>
            <h3 className='card-title-headlines'>{New.headline}</h3>
            <p className='card-text'>{New.lead}</p>
            <small>{New.time}</small>
          </div>
        </a>
      </span>      
      ) : (New.type === 2 ? (
        <span key={New.id} className='hl2 bg-secondary m-1' id='hl2' style={{backgroundImage: `url(${New.img})`}}>
        <span>{''}</span>
        <a href={'article?id='+New.id}>
          <div className='card-custome text-white p-1'>
            <h5 style={{fontSize: 'calc(1rem+1vw)'}} className='card-title-headlines'>{New.headline}</h5>
            <small>{New.time}</small>
          </div>
        </a>        
        </span>
      ) : (New.type === 3 ? (
        <span key={New.id} className='hl3 bg-secondary m-1' id='hl3' style={{backgroundImage: `url(${New.img})`}}>
        <span>{''}</span>
        <a href={'article?id='+New.id}>        
          <div className='card-custome text-white p-1'>
            <h5 style={{fontSize: 'calc(1rem+1vw)'}} className='card-title-headlines'>{New.headline}</h5>
            <small>{New.time}</small>
          </div>
        </a>  
        </span>
      ) : (New.type === 4 ? (
        <span key={New.id} className='hl4 bg-secondary m-1' id='hl4' style={{backgroundImage: `url(${New.img})`}}>
        <span>{''}</span>
        <a href={'article?id='+New.id}>        
          <div className='card-custome text-white p-1'>
            <h5 style={{fontSize: 'calc(1rem+1vw)'}} className='card-title-headlines'>{New.headline}</h5>
            <p className='card-text lead-hl4'>{New.lead}</p>
            <small>{New.time}</small>
          </div>
        </a>
        </span>
      ) : (null)))
      ))
    } else if (type === 'main') {
      // Logica para el tipo 'main'
      return ((New.type === 0) ? (
        <div key={New.id} className='card mb-3 bg-transparent border-0'>
          <a href={'article?id='+New.id}>  
            <Image src={New.img} width={600} height={350} alt="Fotografía de la noticia"/>      
            <div className="card-body">
              <h5 className="card-title">{New.headline}</h5>
              <p className='card-text'>{New.lead}</p>
              <p className="text-muted"><small className="text-muted">{New.time}</small></p>
            </div>  
          </a>   
        </div>
      ):(null))
    } else if (type === 'left') {
      // Logica para el tipo 'left'
      return (New.relevance === 1 && (
        <div key={New.id} className="card mb-3 bg-transparent border-0" style={{maxWidth: 540}}>
        <a href={'article?id='+New.id}>              
          <div className="row g-0">
            <div className="col-md-4">
              <Image src={New.img} width={120} height={60} className="img-fluid rounded-start" alt="Fotografía de la noticia"/>
            </div>
            <div className="col-md-8">
              <div className="cardbodyrelevants">
                <h6 className="card-title">{New.headline}</h6>
                <p className="card-text"><small className="text-muted">{New.time}</small></p>
              </div>
            </div>
          </div>
        </a>
      </div>    
      ))
    } else {
      return (null) // Tipo no reconocido
    }
  }).filter(Boolean);
}

const NewsRender = (props) => {
  const [news, setNews] = useState([{id:0}]);

  useEffect(() => {
    async function loadNews() {
      const loadedNews = await fetchNews();
      const processedNews = processNews(loadedNews);
      setNews(processedNews.reverse());
    }

    loadNews();

    const interval = setInterval(async () => {
      const loadedNews = await fetchNews();
      const processedNews = processNews(loadedNews);
      if (processedNews.length > 0 && processedNews[0].id !== news[0].id) {
        setNews(processedNews.reverse());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  
  return (

    (props.type==='head')?(
      <>
        {mapNews(news, 'head')}
      </>
    ):((props.type==='left')?(
      <>
        {mapNews(news, 'left')}   
      </>
    ):((props.type==='main')?(
      <>
        {mapNews(news, 'main')}   
      </>
    ):(null)))

  );
};


//Renderizado de la seccion noticias.

const News = () =>{
    return(
      <>
        <section className='headlines-container'>
            <div className='headlines'>
                <NewsRender type="head"></NewsRender>
            </div>
        </section>
        <section className='news'>
          <h2 className="sectitle">{'Últimas Noticias'}</h2>
          <br/><br/>
          <div className="bloque_grid">
            <div className='panelizq'>
              <h3>{'Mas relevantes'}</h3>
              <div className='topnews'>
                <NewsRender type="left"></NewsRender>
              </div>
            </div>
            <div className="ads">
              <br/>
              <h4 className="text-center">{'.:Publicidad:.'}</h4>
              <div>

              </div>
            </div>
            <div className="news_cards" id="newsCards">
              <NewsRender type="main"></NewsRender>
            </div>    
          </div>
        </section>
      </>
    )
}

export default News;
