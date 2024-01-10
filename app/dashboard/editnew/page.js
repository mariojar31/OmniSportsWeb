
"use client"
import Image from 'next/image';
import Header from '../../components/header';
import { Table, Button, Form, Container, Card, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {fetchNews, urlRequest, searchNew, fetchNewsById, updateNews, params} from '../../scripts/utilities';
import { useSearchParams } from 'next/navigation';

const CustomFormGroup = ({ id, label, children }) => {
  return (
    <Form.Group className="mb-3" id={id}>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

const EditNewsForm = () => {

    const searchParams = useSearchParams()
    const id=searchParams.get('id');
  
    const [news, setNews] = useState({});
    const [editedNews, setEditedNews] = useState({});
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories]= useState([]);
    const [authors, setAuthors]= useState([]);
    const [sources, setSources]= useState([]);


  
    useEffect(() => {
      if (id) {
        // Se establecen valores predeterminados para los campos del formulario
        setEditedNews({
          type: '',
          id_category: '',
          relevance: '',
          ext: '',
          headline: '',
          id_author: '',
          lead: '',
          content: '',
          url_new: '',
          id_source: '',
          image_url: '',
          photo_src: '',
          id_new: id, // Esto asume que tienes un campo 'id_new' en tu objeto news
        });
  
        // Se utiliza la función fetchNewsById para obtener la noticia mediante su id obtenido de la url
        fetchNewsById(id)
          .then(response => setNews(response))
          .catch(error => console.error('Error fetching news:', error));
      }
    }, [id]);
  
    useEffect(() => {
      // Se actualizan los valores del formulario cuando la noticia está disponible
      setEditedNews(news);
    }, [news]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedNews((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        id_new: news.id_new // Asegúrate de mantener el id
      }));
    };

    const handleSelectChange = (e) => {
      const { name, value } = e.target;
      setEditedNews((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        id_new: news.id_new // Asegúrate de mantener el id
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Llama a la función updateNews para actualizar la noticia
        const updatedNews = await updateNews(id, editedNews);
  
        // Haz algo con la respuesta, por ejemplo, cerrar el formulario
        onClose();
  
        setModalMessage({ updatedNews });
        setModalTitle('Noticia actualizada exitosamente');
        setIsModalOpen(true);
  
        console.log('Noticia actualizada:', updatedNews);
      } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        setModalTitle('Error al actualizar la noticia');
        setModalMessage("La noticia no pudo ser actualizada");
        setIsModalOpen(true);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      // Redirigimos al centro de noticias después de cerrar el modal
      // router.push('newsmanager');
    };
    

    useEffect(()=>{
      const parametroSelect = params();
      parametroSelect.authors.then(author=>{
        setAuthors(author)
      });
      parametroSelect.categories.then(category=>{
        setCategories(category)
      });
      parametroSelect.sources.then(source=>{
        setSources(source)
      });

    },[])

    // console.log('Los Autores: ', authors);
    // console.log('Las categorias: ', categories);
    // console.log('Las fuentes: ', sources);

    return(
       <>
       <Header></Header>
       <Container>

            <br/><h1>Editar Noticia</h1><br/>
            <Form size="sm" id="formEditNew" onSubmit={handleSubmit}>
                
                <CustomFormGroup id="formType" label="Tipo">
                    <Form.Select size="sm" className="form-select" value={editedNews.type_new || news.type_new} name="type" onChange={(e) => handleSelectChange(e)}>
                    <option>{news.type_new}</option>
                    <option value={0}>0 - Corriente</option>
                    <option value={1}>1 - Encabezado</option>
                    <option value={2}>2 - Encabezado</option>
                    <option value={3}>3 - Encabezado</option>
                    <option value={4}>4 - Encabezado</option>                               
                    </Form.Select>
                </CustomFormGroup>

                <CustomFormGroup id="formCategory" label="Categoría">
                    <Form.Select className="form-select" name="id_category" value={editedNews.id_category || news.id_category} onChange={(e) => handleSelectChange(e)}>
                    <option >{news.id_category}</option>
                    {categories.map((category)=>(
                      <option key={category.id_category} value={category.id_category}>{category.id_category} {category.name_category}</option>
                    ))}
                    </Form.Select>
                    <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newCategory">
                        + Categoría
                    </Button>
                </CustomFormGroup>

                <CustomFormGroup id="formRelevance" label="¿Relevante?">
                    <Form.Select size="sm" className="form-select" name="relevance" value={editedNews.relevance || news.relevance} onChange={(e) => handleSelectChange(e)}>
                        <option >{news.relevance}</option>
                        <option value="1">1 - Relevante</option>
                        <option value="0">0 - No relevante</option>
                    </Form.Select>
                </CustomFormGroup>  

                <CustomFormGroup id="formExt" label="¿Fuente Externa?">
                    <Form.Select size="sm" className="form-select" name="ext" value={editedNews.ext || news.ext} onChange={(e) => handleSelectChange(e)}>
                    <option >{news.ext}</option>
                    <option value={1}>1 - Si</option>
                    <option value={0}>0 - No</option>
                    </Form.Select>
                </CustomFormGroup>   

                <CustomFormGroup id="formHeadline" label="Titular">
                    <Form.Control value={editedNews.headline || news.headline} type="text" name="headline" className="form-control" placeholder="Titular de la noticia" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
                </CustomFormGroup>

                <CustomFormGroup id="formAuthor" label="Autor">
                    <Form.Select size="sm" className="form-select" name="id_author" value={editedNews.id_author || news.id_author} onChange={(e) => handleSelectChange(e)}>
                    <option >{news.id_author}</option>
                    {authors.map((author)=>(
                      <option key={author.id_author} value={author.id_author}>{author.id_author} {author.name_author}</option>
                    ))}
                    </Form.Select>

                    <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newAuthor">
                        + Autor
                    </Button>

                </CustomFormGroup>

                <CustomFormGroup id="formLead" label="Entrada">
                    <Form.Control as="textarea" type="text" name="lead" className="form-control" placeholder="Escriba aqúi un resumen de la noticia" value={editedNews.lead_new || news.lead_new} style={{height: 100}} onChange={(e) => handleInputChange(e)}>                        
                    </Form.Control>
                </CustomFormGroup>

                <CustomFormGroup id="formContent" label="Contenido de la noticia">
                    <Form.Control as="textarea" type="text" name="content" className="form-control" placeholder="Escriba aqúi el contenido de la noticia" value={editedNews.content || news.content} style={{height: 200}} onChange={(e) => handleInputChange(e)}>                        
                    </Form.Control>
                </CustomFormGroup>

                <CustomFormGroup id="formUrl" label="Url de la noticia original">
                    <Form.Control value={editedNews.url_new || news.url_new} type="text" name="url_new" className="form-control" placeholder="" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
                </CustomFormGroup>

                <CustomFormGroup id="formSource" label="Fuente">
                    <Form.Select  className="form-select" name="id_source" value={editedNews.id_source || news.id_source} onChange={(e) => handleSelectChange(e)}>
                        <option >{news.id_source}</option>
                        {sources.map((source)=>(
                          <option key={source.id_source} value={source.id_source}>{source.id_source} {source.name_source}</option>
                        ))}
                    </Form.Select>

                    <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newSource">
                        + Source
                    </Button>

                </CustomFormGroup>

                <CustomFormGroup id="formImage" label="Imagen">
                    <Form.Control value={editedNews.image_url || news.image_url} type="text" name="image_url" className="form-control" placeholder="Escriba URL o cargue una imagen abajo" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
                </CustomFormGroup>

                <CustomFormGroup id="formPhotoSource" label="Derechos de la Fotografía">
                    <Form.Control value={editedNews.photo_src || news.photo_src} type="text" name="photo_src" className="form-control" placeholder="Escriba el nombre de Autor o fuente de la foto" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
                </CustomFormGroup>
                <br/>

                <Form.Control type="hidden" name="id_new" id="id_new" value={news.id_new} onChange={(e) => handleInputChange(e)}/>

                <Button className="btn btn-dark" type="submit">
                    Editar Noticia
                </Button>          
            </Form>

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Resultado de la operación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
       </> 
    )
}

export default EditNewsForm;