
"use client"
import Image from 'next/image';
import Header from '../../components/header';
import { Table, Button, Form, Container, Card, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {fetchNews, urlRequest, searchNew, fetchNewsById, updateNews, addNews, params} from '../../scripts/utilities';

const CustomFormGroup = ({ id, label, children }) => {
  return (
    <Form.Group className="mb-3" id={id}>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

const AddNewsForm = () => {
  const [news, setNews] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const [categories, setCategories]= useState([]);
  const [authors, setAuthors]= useState([]);
  const [sources, setSources]= useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNews((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setNews((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a la función updateNews para actualizar la noticia
      const uploadedNews = await addNews(news);

      // Haz algo con la respuesta, por ejemplo, cerrar el formulario
      onClose();

      setModalMessage({ uploadedNews });
      setModalTitle('Solicitud Exitosa');
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error al agregar la noticia:', error);
      setModalTitle('Error');
      setModalMessage("La noticia no pudo ser actualizada");
      setIsModalOpen(true);
    }
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

  const closeModal = () => {
    setIsModalOpen(false);
    // Redirigimos al centro de noticias después de cerrar el modal
    const host = window.location.hostname;
    window.location.href=host+'dashboard/newsmanager';
  };


  return(
     <>
     <Header></Header>
     <Container>

          <br/><h1>Editar Noticia</h1><br/>
          <Form size="sm" id="formAddNew" onSubmit={handleSubmit}>
              
              <CustomFormGroup id="formType" label="Tipo">
                  <Form.Select size="sm" className="form-select" name="type" onChange={(e) => handleSelectChange(e)}>
                  <option>Seleccione Tipo</option>
                  <option value={0}>0 - Corriente</option>
                  <option value={1}>1 - Encabezado 1</option>
                  <option value={2}>2 - Encabezado 2</option>
                  <option value={3}>3 - Encabezado 3</option>
                  <option value={4}>4 - Encabezado 4</option>                               
                  </Form.Select>
              </CustomFormGroup>

              <CustomFormGroup id="formCategory" label="Categoría">
                  <Form.Select size="sm" className="form-select" name="id_category" onChange={(e) => handleSelectChange(e)}>
                  <option>Seleccione Categoría</option>
                  {categories.map((category)=>(
                      <option key={category.id_category} value={category.id_category}>{category.id_category} {category.name_category}</option>
                    ))}
                  </Form.Select>
                  <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newCategory">
                      + Categoría
                  </Button>
              </CustomFormGroup>

              <CustomFormGroup id="formRelevance" label="¿Relevante?">
                  <Form.Select size="sm" className="form-select" name="relevance" onChange={(e) => handleSelectChange(e)}>
                      <option>Seleccione Relevancia</option>
                      <option value="1">1 - Relevante</option>
                      <option value="0">0 - No relevante</option>
                  </Form.Select>
              </CustomFormGroup>  

              <CustomFormGroup id="formExt" label="¿Fuente Externa?">
                  <Form.Select size="sm" className="form-select" name="ext" onChange={(e) => handleSelectChange(e)}>
                  <option>Seleccione</option>
                  <option value={1}>1 - Si</option>
                  <option value={0}>0 - No</option>
                  </Form.Select>
              </CustomFormGroup>   

              <CustomFormGroup id="formHeadline" label="Titular">
                  <Form.Control type="text" name="headline" className="form-control" placeholder="Titular de la noticia" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
              </CustomFormGroup>

              <CustomFormGroup id="formAuthor" label="Autor">
                  <Form.Select size="sm" className="form-select" name="id_author" onChange={(e) => handleSelectChange(e)}>
                  <option>Seleccione Autor</option>
                  {authors.map((author)=>(
                      <option key={author.id_author} value={author.id_author}>{author.id_author} {author.name_author}</option>
                    ))}
                  </Form.Select>

                  <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newAuthor">
                      + Autor
                  </Button>

              </CustomFormGroup>

              <CustomFormGroup id="formLead" label="Entrada">
                  <Form.Control as="textarea" type="text" name="lead" className="form-control" placeholder="Escriba aqúi un resumen de la noticia" style={{height: 100}} onChange={(e) => handleInputChange(e)}>                        
                  </Form.Control>
              </CustomFormGroup>

              <CustomFormGroup id="formContent" label="Contenido de la noticia">
                  <Form.Control as="textarea" type="text" name="content" className="form-control" placeholder="Escriba aqúi el contenido de la noticia" style={{height: 200}} onChange={(e) => handleInputChange(e)}>                        
                  </Form.Control>
              </CustomFormGroup>

              <CustomFormGroup id="formUrl" label="Url de la noticia original">
                  <Form.Control type="text" name="url_new" className="form-control" placeholder="" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
              </CustomFormGroup>

              <CustomFormGroup id="formSource" label="Fuente">
                  <Form.Select size="sm" className="form-select" name="id_source" onChange={(e) => handleSelectChange(e)}>
                      <option>Seleccione Fuente</option>
                      {sources.map((source)=>(
                          <option key={source.id_source} value={source.id_source}>{source.id_source} {source.name_source}</option>
                        ))}
                  </Form.Select>

                  <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#newSource">
                      + Source
                  </Button>

              </CustomFormGroup>

              <CustomFormGroup id="formImage" label="Imagen">
                  <Form.Control type="text" name="image_url" className="form-control" placeholder="Escriba URL o cargue una imagen abajo" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
              </CustomFormGroup>

              <CustomFormGroup id="formPhotoSource" label="Derechos de la Fotografía">
                  <Form.Control type="text" name="photo_src" className="form-control" placeholder="Escriba el nombre de Autor o fuente de la foto" aria-describedby="helpId" onChange={(e) => handleInputChange(e)}/>
              </CustomFormGroup>
              <br/>

              <Form.Control type="hidden" name="id_new" id="id_new" onChange={(e) => handleInputChange(e)}/>

              <Button className="btn btn-dark" type="submit">
                  Agregar Noticia
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

export default AddNewsForm;