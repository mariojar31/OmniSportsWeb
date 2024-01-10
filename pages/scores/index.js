"use client"
import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Container, Accordion, Card} from "react-bootstrap";
import { fetchApi, searchImg } from "@/app/scripts/sc_utilities";
import CardMatch from "@/components/cardMatch";

const Scores = (props) =>{

    const [matchList, setMatchList] = useState([]);

    useEffect(() => {
      async function getResults(type){
        try{
          const host = window.location.hostname;
          const response = await fetch('/api/results/matcheslist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"type":type}),
            credentials: 'include',
          });
          if (response.ok){
            const matches= await response.json();
            setMatchList(matches);
          }

        }catch(error){
          console.error("Error al recibir respuesta: ", error);
        }
      };

      getResults(props.type);

      const interval = setInterval(()=>{getResults(props.type)}, 10000);
  
      return () => clearInterval(interval);
     


    }, [props.type]);

    return ((matchList.length > 0)?(
      matchList.reverse().map((match) => (
            <CardMatch key={match.match.IdMatch} match={match.match}></CardMatch>
            ))
      ):((props.type==='live')?(<span>No hay encuentros</span>):(<span>No hay encuentros recientes</span>)
      ))
}


export default function Results(){
    return(
        <>

        <Layout>
            <Container>
                <br/>
                <h2>Resultados</h2>
                <br/>  
                <Accordion flush>
                  <Accordion.Item>
                  <Accordion.Header>En Vivo</Accordion.Header>
                  <Accordion.Body>
                    <div  id="resultados" className="list-group">
                      <div className="d-flex flex-wrap justify-content-center text-center" style={{paddingBlock: 0, paddingInline: 10}}>
                      <Scores type='live'></Scores>
                      </div>
                    </div>  
                  </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <br/>
                <h2>Encuentros Recientes</h2>
                <br/>  
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h5>Futbol Colombiano</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap justify-content-center text-center">
                        <Scores type='fcol'></Scores>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>  
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <h5>Competiciones de la UEFA</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap justify-content-center text-center" style= {{paddingBlock: 0, paddingInline: 10}}>
                        <Scores type='uefa'></Scores>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item> 
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <h5>Sur América</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap justify-content-center text-center">
                        <Scores type='conmebol'></Scores>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>  
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <h5>Futbol Norte America y America Central</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap justify-content-center text-center">                      
                      <Scores type='concacaf'></Scores>                        
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>  
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <h5>Otros Encuentros</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap justify-content-center text-center">                      
                      <Scores type='otros'></Scores>                        
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>  
                </Accordion>
                
            </Container>
        </Layout>
        </>
    )
}

