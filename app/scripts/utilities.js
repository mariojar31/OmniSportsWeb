import { useState } from "react";


function urlRequest(route){
    const api="https://api-g0vy8fbay-mario-acendras-projects.vercel.app/api/";
    const route_url =api+route;
    return route_url; 
}


async function fetchNewsById(id) {
  const url = `https://api-g0vy8fbay-mario-acendras-projects.vercel.app/api/news/id-${id}`; 
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud para obtener la noticia');
    }
    const data = await response.json();
    const news = data[0];
    return news; // Retorna la información de la noticia
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    throw error;
  }
}

async function searchNew(id) {
  const news = await fetchNews();
  if(news){
    const newfound = news.find(newItem => newItem.id_new == id);
    return newfound;
  }else{
    console.log("No se encontraron noticias");
  }
  }


function timeSincePublication(publishDate) {
    const currentDate = new Date();
    const publishDateObj = new Date(publishDate);
    const timeDiff = currentDate - publishDateObj;
    
    const minutes = Math.floor(timeDiff / 60000); // 1 minuto = 60,000 milisegundos

    if (minutes < 1) {
        return "Hace unos segundos";
    } else if (minutes === 1) {
        return "Hace 1 minuto";
    } else if (minutes < 60) {
        return `Hace ${minutes} minutos`;
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        return `Hace ${hours} horas`;
    } else if(minutes < 4320){
        const days = Math.floor(minutes / 1440);
        return `Hace ${days} días`;
    }else{
        var options = {day: 'numeric', month: 'long', year: 'numeric'};
        return publishDateObj.toLocaleString('es-CO', options);
    }
}

// Función para cargar las noticias
async function fetchNews() {
    try {
      const urlapi = urlRequest('news');
      const response = await fetch(urlapi);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.News;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  async function updateNews(newsId, updatedData){
    const url = urlRequest("update/news");
    console.log(updatedData);

    try {
      const formData = new FormData();
  
      // Agrega los campos al FormData
      formData.append('id_new', newsId);
  
      // Agrega el resto de los datos al FormData
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      console.log(response);
  
      if (!response.ok) {
        throw new Error('Error en la solicitud para actualizar la noticia');
      }
  
      const updatedNews = await response.json();
      return updatedNews; // Retorna la noticia actualizada
    } catch (error) {
      console.error('Error al actualizar la noticia:', error);
      throw error;
    }
  }

  async function updateNews1(newsId, updatedData){
    const url = urlRequest("update/1");

    try {
      const formData = new FormData();
  
      // Agrega los campos al FormData
      formData.append('id_new', newsId);
  
      // Agrega el resto de los datos al FormData
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud para actualizar la noticia');
      }
  
      const updatedNews = await response.json();
      return updatedNews; // Retorna la noticia actualizada
    } catch (error) {
      console.error('Error al actualizar la noticia:', error);
      throw error;
    }
  }

  async function addNews(newsValues){

    try{

    const formData = new FormData();

    for (const key in newsValues) {
      formData.append(key, newsValues[key]);
    }

    // Realizamos una solicitud AJAX al servidor 
    const response = await fetch(urlRequest('newinsert'), {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud para agregar nueva noticia');
    }

    const uploadedNews = await response.json();
    return uploadedNews; 


  }catch (error){
    console.error('Error al agregar la noticia:', error);
      throw error;
  }
    
  }

  function params(){

    const categories = fetch(urlRequest("categories"))   
      .then(response => response.json());


      const authors = fetch(urlRequest("authors"))
      .then(response => response.json());


      const sources = fetch(urlRequest("sources"))
      .then(response => response.json());


      const selects = {
        'categories': categories,
        'authors': authors,
        'sources': sources
      }

      return selects;

  }


  export {urlRequest, timeSincePublication, fetchNews, searchNew, fetchNewsById, updateNews,updateNews1, addNews, params};
