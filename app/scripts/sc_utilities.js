import Image from "next/image";


export async function fetchApi(){

    const today = new Date();
    const from = new Date(today);
    from.setDate(from.getDate()-1);
    const to = new Date(today);
    to.setDate(to.getDate());


    const apiurl = 'https://api.fifa.com/api/v3/calendar/matches';

    const url = apiurl+'?from='+from.toISOString().slice(0,11)+'00:00:00Z&to='+to.toISOString().slice(0,14)+'59:59Z&language=es&count=300';
  
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error('Error al recibir respuesta del servidor');
        }
    
        const data = await response.json(); // Esperar la promesa
        const results = data.Results;
        return results; // Devolver directamente los resultados
      } catch (error) {
        return [];
      }

}

export async function requestMatchesHist(home,away,opt){
  const date = new Date;
  if (opt==='h'){
    try{
    const url='https://api.fifa.com/api/v3/teamform/'+home+'?languaje=es&count=5&to='+date.toISOString().slice(0,11)+'23:59:59Z';
    const response = await fetch(url);
    const matches = await response.json();
    return matches;}catch(error){
      console.error('Error en la consulta: ',error);
    }
  }else if(opt==='a'){
    try{
    const response = await fetch('https://api.fifa.com/api/v3/teamform/'+away+'?languaje=es&count=5&to='+date.toISOString().slice(0,11)+'23:59:59Z');
    const matches = await response.json();
    return matches;}catch(error){
      console.error('Error en la consulta: ',error);
    }
  }else if(opt==='vs'){
    try{
    const response = await fetch('https://api.fifa.com/api/v3/statistics/headtohead/'+home+'/'+away+'?languaje=es&count=5&to='+date.toISOString().slice(0,11)+'23:59:59Z');
    const matches = await response.json();
    return matches;}catch(error){
      console.error('Error en la consulta: ',error);
    }
  }
}

export function searchImg(match,loc,psize=1){

  if(loc=='home'){
    if(match.Home){
      var team = match.Home;
    }else{
      var team = match.HomeTeam;
    }


    if(team.PictureUrl==null){
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={(psize==1)?("33"):("66")} height={(psize==1)?(33):(66)} fill="currentColor" className="bi bi-shield-fill" viewBox="0 0 16 16">
                <path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                </svg>
      )
    }else{
      if(team.TeamType==0){
        const format = 'sq';
        const size = '3';
        const idTeam = team.IdTeam;
        const url= 'https://api.fifa.com/api/v3/picture/teams-'+format+'-'+size+'/'+idTeam;

        return(
        <>
        <Image src={url} alt="-" width={(psize==1)?(33):(66)} height={(psize==1)?(33):(66)} ></Image>
        </>
        )
      }else{
        const format = 'sq';
        const size = '3';
        const idTeam = team.IdCountry;
        const url= 'https://api.fifa.com/api/v3/picture/flags-'+format+'-'+size+'/'+idTeam;
        return(
        <>
        <Image src={url} alt="-" width={(psize==1)?(33):(66)} height={(psize==1)?(33):(66)}></Image>
        </>
        )
      }
    }
    
  }else if(loc=='away'){
    if(match.Away){
      var team = match.Away;
    }else{
      var team = match.AwayTeam;
    }
    if(team.PictureUrl==null){
      return(
        <svg xmlns="http://www.w3.org/2000/svg" width={(psize==1)?("33"):("66")} height={(psize==1)?("33"):("66")} fill="currentColor" className="bi bi-shield" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
              </svg>
      )
    }else{
      if(team.TeamType==0){
        const format = 'sq';
        const size = '3';
        const idTeam = team.IdTeam;
        const url= 'https://api.fifa.com/api/v3/picture/teams-'+format+'-'+size+'/'+idTeam;
        return(
        <>
        <Image src={url} alt="-" width={(psize==1)?(33):(66)} height={(psize==1)?(33):(66)}></Image>
        </>
        )
      }else{
        const format = 'sq';
        const size = '3';
        const idTeam = team.IdCountry;
        const url= 'https://api.fifa.com/api/v3/picture/flags-'+format+'-'+size+'/'+idTeam;
        return(
        <>
        <Image src={url} alt="-" width={(psize==1)?(33):(66)} height={(psize==1)?(33):(66)}></Image>
        </>
        )
      }
  }
  }

}

const competition = async(idCompetition) =>{
  if(idCompetition!==null){
  
    const urlfetch = 'https://api.fifa.com/api/v3/competitions/'+idCompetition;

  try{ 
    const response =await fetch(urlfetch);

    if(!response.ok){
      throw new Error('Error al recibir respuesta del servidor');
    }

    const competition =await response.json();

    const country = competition.IdMemberAssociation;

      const url = 'https://api.fifa.com/api/v3/picture/flags-sq-2/'+country;

      if(url=='https://api.fifa.com/api/v3/picture/flags-sq-2/'){
        return 'null';
      }else{
        return url; 
      }
 
  }catch(error){
    return 'null';
  }

  }else{
    return 'null'
  }
  
}

export function country(match){
  const idCompetition = (match.IdCompetition)?(match.IdCompetition):(null);
  const url=competition(idCompetition);

    return url;
  
}

export function matchStatus(match, status){
  if(status === 0){
    if(match.MatchStatus === 3){
      if(match.MatchTime == "0'"){
        return (<small>Entretiempo</small>);
      }else{
      return (<small style={{color:'green'}}><b>En Vivo</b></small>)
    }}else if(match.MatchStatus === 8){
      return (<small>Cancelado</small>);
    }else if(match.MatchStatus === 7){
      return (<small>Pospuesto</small>);
    }else{
      return (<small>Por Jugar</small>);
    }
  }else{
    return (<small>Jugado</small>);
  }
}

export function timeSet(match){
  if(match.OfficialityStatus === 0){
    if(match.MatchStatus == 3){
    return match.MatchTime;}else{
      const date = new Date(match.Date);
      const options = {weekdays:'short', month: 'numeric', day: 'numeric', year: 'numeric'};
      return date.toLocaleString()
    }
  }else{
    const date = new Date(match.Date);
    const options = {month: 'numeric', day: 'numeric', year: 'numeric'};
    return date.toLocaleString('es-CO',options)
  }
}