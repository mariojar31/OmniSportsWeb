import { NextResponse as res} from "next/server";

export async function POST(req){
    const request = await req.json();
    const idMatch = request.idMatch;
    const idCompetition = request.idCompetition;
    const idStage = request.idStage;
    const idSeason = request.idSeason;

    try{
        const url = 'https://api.fifa.com/api/v3/live/football/'+idCompetition+'/'+idSeason+'/'+idStage+'/'+idMatch+'?language=es';
        const response = await fetch(url);
        const match = await response.json();      
        const output = res.json(match);
        return output;
        
    }catch(error){
        console.error('Error en la solicitud:', error);

    }
      
}