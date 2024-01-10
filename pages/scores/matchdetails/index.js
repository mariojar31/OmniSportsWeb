"use client"
import {useState, useEffect} from 'react';
import CardMatch from '@/components/cardMatch';
import Layout from '@/components/layout';
import { useSearchParams } from "next/navigation";
import { searchImg, country, matchStatus, timeSet } from "@/app/scripts/sc_utilities";
import MatchHeader from '@/components/matchHeader';
import { Container } from 'react-bootstrap';




export default function MatchDetails(){
   
    const searchParams = useSearchParams()
    const idMatch=searchParams.get('match');
    const idCompetition = searchParams.get('competition');
    const idSeason = searchParams.get('season');
    const idStage = searchParams.get('stage');
    const requestBody = JSON.stringify({"idCompetition": idCompetition,
    "idSeason": idSeason,
    "idStage": idStage,
    "idMatch": idMatch});

    const [match, setMatch] = useState([]);
    const [time, setTime] = useState('');
    const [scores, setScores] = useState({});
    const [status, setStatus] = useState('');

    useEffect(()=>{
        async function getDetails(){
            try{
                const host = window.location.hostname;
                const response = await fetch('/api/results/match', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: requestBody,
                  credentials: 'include',
                });
                if (response.ok){
                  const matchFound= await response.json();
                  return matchFound;
                }
      
              }catch(error){
                console.error("Error al recibir respuesta: ", error);
              }
        }
    
        const fetchData = async()=>{
          const matchFound = await getDetails();
          setMatch(matchFound);
          if(matchFound && matchFound.MatchTime!==time){
            setTime(matchFound.MatchTime);
          }
          if((matchFound && matchFound.HomeTeam.Score !== scores.Home) || (matchFound && matchFound.AwayTeam.Score !== scores.Away)){
            const matchScores = [{Home:matchFound.HomeTeam.Score,Away:matchFound.AwayTeam.Score}];
            setScores(matchScores);
          }
          if(matchFound && matchFound.MatchStatus!==status){
            setStatus(matchFound.OfficialityStatus);
        } 
        };
        
        
        const interval = setInterval(fetchData, 5000);
      
          // Limpiar el intervalo al desmontar el componente
          return () => clearInterval(interval);


    },[requestBody, scores, status, time]);


    return(
        <>
            <Layout>
              <Container className='mt-4'>
                <MatchHeader match={match} scores={scores} time={time} status={status}></MatchHeader>
              </Container>    
            </Layout>             
        </>
    )
}

