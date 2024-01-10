import { Container, Card, Collapse, Nav, NavItem, NavLink, Tab, TabContent, TabPane, Row, Col } from "react-bootstrap";
import { searchImg, country, matchStatus, timeSet, requestMatchesHist } from "@/app/scripts/sc_utilities";
import CardMatch from "./cardMatch";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImgError from "@/public/img/ImgError.png";
import PositionRow from "./positionRow";

var groups = [];

const MatchHeader = (props)=>{

    const [imgCountry, setImgCountry] = useState('');
    const [goals, setGoals] = useState({});
    // const [time, setTime] = useState('');

    useEffect(()=>{
        async function loadCountryImage(){
            const url=await country(props.match);

                setImgCountry(url);           

        }
        loadCountryImage();
    },[props.match])

    useEffect(()=>{
        function getGoals(match){
            if(match && match.length>0 && match.HomeTeam && match.AwayTeam){
                setGoals({"Home":match.HomeTeam.Goals,"Away":match.AwayTeam.Goals});
            }
        }
        getGoals(props.match);


    },[props.match])

    const imageError = (e)=>{
        e.target.src=ImgError;
    };

    return((props.match==null || props.match.HomeTeam == null || props.match.AwayTeam == null)?(<span></span>):(
        <>      
            <div id='match_header'>
                <div>
                  <section className="list-group-item list-group-item-action flex-column align-items-center justify-content-center text-center" style={{width: '100%', minWidth: '21rem'}} aria-current="true">
                  <div className="d-flex flex-column w-100 flex-wrap justify-content-between text-align-center">
                  {props.match && props.match.SeasonName && props.match.SeasonName[0] && props.match.StageName && props.match.StageName[0] && (
                  <h5 className="mb-1">
                    <span>{(imgCountry === 'null')?((props.match.MatchDay==null)?(''):('Fecha '+ props.match.MatchDay)):((props.match.MatchDay==null)?(<Image src={imgCountry} alt="Country" width={15} height={15} onError={imageError}></Image>):(<><Image src={imgCountry} alt="Country" width={15} height={15} onError={imageError}></Image><span>{'Fecha '+ props.match.MatchDay}</span></>))}</span>
                    {' ' + props.match.StageName[0].Description + ' - ' + props.match.SeasonName[0].Description}
                  </h5>
                )}
                    <small className="text-muted">{(props.match.MatchDay==null)?(props.match.StageName[0].Description + ' - '):('Fecha '+ props.match.MatchDay+ ' ' + props.match.StageName[0].Description + ' - ')}<span>{matchStatus(props.match,props.status)}</span></small>
                  </div><br/>
                  <div className="mb-1 d-flex flex-nowrap justify-content-center align-items-center"><span> {searchImg(props.match,'home',2)} </span>
                  <h5>
                  {(props.match.HomeTeam.Score==null || props.match.AwayTeam.Score == null)?(props.match.HomeTeam.ShortClubName+' '+' Vs '+' '+props.match.AwayTeam.ShortClubName):(props.match.HomeTeam.ShortClubName + ' ' + props.match.HomeTeam.Score + ' Vs ' + props.match.AwayTeam.Score + ' ' + props.match.AwayTeam.ShortClubName)}
                  </h5>
                    <span> {searchImg(props.match,'away',2)}</span>
                  </div>
                  <small className="text-muted">{(props.match.OfficialityStatus===0 && props.match.MatchStatus === 3)?(props.time):(timeSet(props.match))}</small>
                </section>

                </div>

                <Goles goals={goals} playersH={props.match.HomeTeam.Players} playersA={props.match.AwayTeam.Players}/>

                <MinToMin competition={props.match.IdCompetition} season={props.match.IdSeason} stage={props.match.IdStage} match={props.match.IdMatch} />

                <MatchStats match={props.match}/>

                <br/>
                <br/>
                <br/>

            </div>
        </>)
    )
}

const Goles = (props)=>{

    const homePlayers = props.playersH;
    const awayPlayers = props.playersA;
    const goalsHome = (props.goals && props.goals.Home)?(props.goals.Home):({});
    const goalsAway = (props.goals && props.goals.Away)?(props.goals.Away):({});

    return(
        <>
        <div className="d-flex flex-wrap justify-content-between flex-nowrap">
            <ul id="golesH" className="list-group border-0">
                {(goalsHome.length > 0)?(goalsHome.map((goal)=>(
                    <li key={goal.IdPlayer+goal.Minute.slice(0,3)} className="list-group-item border-0 d-flex justify-content-between align-items-center bg-transparent">
                        <small className="d-flex flex-nowrap">
                            <div className="d-flex flex-nowrap">
                                <span className="material-symbols-outlined">
                                    sports_soccer
                                </span>
                                <span className="badge bg-secondary rounded-pill">
                                    {goal.Minute}
                                </span>
                            </div>
                            <div>
                                {searchPlayerName(homePlayers,goal.IdPlayer)}
                            </div>
                        </small>
                    </li>
                ))):(<span></span>)}
            </ul>
            <ul id="golesA" className="list-group border-0">
                {(goalsAway.length>0)?(goalsAway.map((goal)=>(
                    <li key={goal.IdPlayer+goal.Minute.slice(0,3)} className="list-group-item border-0 d-flex justify-content-between align-items-center bg-transparent">
                        <small className="d-flex flex-nowrap">
                            <div className="d-flex flex-nowrap">
                                <span className="material-symbols-outlined">
                                    sports_soccer
                                </span>
                                <span className="badge bg-secondary rounded-pill">
                                    {goal.Minute}
                                </span>
                            </div>
                            <div>
                                {searchPlayerName(awayPlayers, goal.IdPlayer)}
                            </div>
                        </small>
                    </li>
                ))):(<span></span>)}
            </ul>
        </div>
        </>
    )
}

const MinToMin = (props)=>{

    const fetchTimelines=async(competition, season, stage, match)=>{
        const url = 'https://api.fifa.com/api/v3/timelines/'+competition+'/'+season+'/'+stage+'/'+match+'?language=es';
        try{    
        const response = await fetch(url);
        const timelines = await response.json();
        return timelines.Event;

        }catch(error){
            return [];
        }
    }

    const [events, setEvents] = useState([]);
    const [openCollapse, setOpenCollapse] = useState(false);

    useEffect(()=>{
        const obtainEvents= async()=>{
            try{
                const response = await fetchTimelines(props.competition, props.season, props.stage, props.match);
                if(response){
                    const list = response.reverse();
                    if(list.length !== events.length){
                        setEvents(list);
                    }
                }
            

            }catch(error){
                console.error(error);
            }
        }

        obtainEvents();

        const interval = setInterval(obtainEvents,3000);

        return ()=> clearInterval(interval);

    },[events.length, props.competition, props.match, props.season, props.stage]);

    return(
        (events.length>0)?(<>
            <div id='mintomin'>
                <a id="head" className="btn" href="#" onClick={(event)=> {event.preventDefault(); setOpenCollapse(!openCollapse)}} aria-expanded={openCollapse} aria-controls="collapseMtm" style={{width:"100%"}}>
                    <div className="bd-callout border-left-color" style={{fontWeight: 500, color:"rgb(91, 90, 90)", padding: "0.5rem",
                    marginTop: "1.25rem",
                    marginBottom: "1.25rem",
                    backgroundColor: "var(--bd-callout-bg, var(rgb(174, 174, 174)))", borderLeft: "0.25rem solid var(--bd-callout-border, var(--bs-gray-300))"}} >
                        <div className="d-flex flex-row">
                                <div id="evento" className="mr-2 d-flex flex-row align-items-center justify-content-start">
                                <span style={{fontWeight: 500}}> {events[0].MatchMinute} </span>
                                <div className="d-flex flex-column" id="headCard">
                                    <small style={{fontSize:"1rem", textAlign:"left"}}>{events[0].TypeLocalized[0].Description}
                                    </small>
                                    <p className="px-3" style={{fontSize:"0.8rem"}}>{events[0].EventDescription[0].Description}</p>
                                </div>
                                </div>
                        </div>
                    </div>
                </a>
                <Collapse in={openCollapse} className="collapse">
                    <div id="collapseMtm">
                    {events.map((event)=>(
                                        <div key={event.EventId} className="bd-callout border-left-color" 
                                        style={{fontWeight: 500, color:"rgb(91, 90, 90)", padding: "0.5rem",
                                        marginTop: "1.25rem",
                                        marginBottom: "1.25rem",
                                        backgroundColor: "var(--bd-callout-bg, var(rgb(174, 174, 174)))", borderLeft: "0.25rem solid var(--bd-callout-border, var(--bs-gray-300))"}}>
                                            <div className="d-flex flex-row" style={{minWidth:"100px"}}>
                                                <div className="mr-2 d-flex flex-row align-items-center justify-content-start" style={{width: "3vw", minWidth:"70px"}}>
                                                    <span style={{fontWeight: 500}}>{event.MatchMinute}</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <small style={{fontSize:"1rem", textAlign:"left"}}>
                                                    {event.TypeLocalized[0].Description}
                                                    </small>
                                                    <p className="px-3" style={{fontSize:"0.8rem"}}>
                                                    {event.EventDescription[0].Description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                    ))}
                    </div>
                </Collapse>
            </div>
            </>):('Loading...')
    )
}

const MatchStats = (props)=>{

    

    const HomeId = (props.match.HomeTeam.TeamType==0)?(props.match.HomeTeam.IdTeam):(props.match.HomeTeam.IdCountry);
    const AwayId = (props.match.AwayTeam.TeamType==0)?(props.match.AwayTeam.IdTeam):(props.match.AwayTeam.IdCountry);

    const [dataHome, setDataHome] = useState([]);
    const [dataAway, setDataAway] = useState([]);
    const [dataVersus, setDataVersus] = useState([]);
    const [rateHome, setRateHome] = useState(0);
    const [rateAway, setRateAway] = useState(0);
    const [rateDraws, setRateDraws] = useState(0);
    const [rateHomeW, setRateHomeW] = useState(0);
    const [rateHomeD, setRateHomeD] = useState(0);
    const [rateHomeL, setRateHomeL] = useState(0);
    const [rateAwayW, setRateAwayW] = useState(0);
    const [rateAwayD, setRateAwayD] = useState(0);
    const [rateAwayL, setRateAwayL] = useState(0);

    const[positionTable, setPositionTable] = useState([]);
    const[isGroupTable, setIsGroupTable] = useState(false);

    var hta = 0;
    var htr = 0;
    var ata = 0;
    var atr = 0;

    const cardsCount = (match)=>{

        if(match.HomeTeam.Bookings && match.HomeTeam.Bookings[0]){
            match.HomeTeam.Bookings.forEach(cardh=>{
                if(cardh.Card==1){
                    hta++; 
                }else if(cardh.Card==3){
                    htr++;
                }
            })
        }

        if( match.AwayTeam.Bookings && match.AwayTeam.Bookings[0]){
            match.AwayTeam.Bookings.forEach(carda=>{
                if(carda.Card==1){
                    ata++; 
                }else if(carda.Card==3){
                    atr++;
                }
            })
        }

    }

    const wldStats = (idTeam,matchesList)=>{

        var locWins = 0;
        var locDraws = 0;
        var locLosses = 0;

        if(matchesList && matchesList[0]){
            matchesList.forEach(match => {
                if(idTeam===match.Home.IdTeam && idTeam===match.Winner){
                    locWins++;
                }else if(idTeam===match.Home.IdTeam){
                    if(match.Winner==null){
                        locDraws++;
                    }else{
                        locLosses++;
                    }
                }     
            });
        }
        

        return {'Wins':locWins,'Draws':locDraws,'Losses':locLosses};
    }

    cardsCount(props.match);

    useEffect(()=>{
        
        const obtainData = async()=>{
            const requestDataHome = await requestMatchesHist(HomeId, AwayId, 'h');
            const requestDataAway = await requestMatchesHist(HomeId, AwayId, 'a');
            const requestDataVersus = await requestMatchesHist(HomeId, AwayId, 'vs');

            const count = requestDataVersus.MatchesList.length;
            const rateHome_ = requestDataVersus.TeamA.Wins/count*100;
            const rateAway_ = requestDataVersus.TeamB.Wins/count*100;
            const rateDraws_ = requestDataVersus.TeamA.Draws/count*100;

            const countH = requestDataHome.MatchesList.length;
            const rateHomeW_ = requestDataHome.Wins/countH*100;
            const rateHomeD_ = requestDataHome.Draws/countH*100;
            const rateHomeL_ = requestDataHome.Losses/countH*100;

            const countA = requestDataHome.MatchesList.length;
            const rateAwayW_ = requestDataAway.Wins/countH*100;
            const rateAwayD_ = requestDataAway.Draws/countH*100;
            const rateAwayL_ = requestDataAway.Losses/countH*100;
    
            setDataHome(requestDataHome);
            setDataAway(requestDataAway);
            setDataVersus(requestDataVersus);

            setRateHome(rateHome_.toFixed(2));
            setRateAway(rateAway_.toFixed(2));
            setRateDraws(rateDraws_.toFixed(2));

            setRateHomeW(rateHomeW_.toFixed(2));
            setRateHomeL(rateHomeL_.toFixed(2));
            setRateHomeD(rateHomeD_.toFixed(2));

            setRateAwayW(rateAwayW_.toFixed(2));
            setRateAwayL(rateAwayL_.toFixed(2));
            setRateAwayD(rateAwayD_.toFixed(2));

    
        }

        obtainData();

    },[AwayId, HomeId]);

    const wldHome = wldStats(HomeId,dataVersus.MatchesList);
    const wldAway = wldStats(AwayId,dataVersus.MatchesList);
    
    function updateGroups(array,team){
        const groupName = team.Group[0].Description 
        const grupo= array.find((group)=>group.name==groupName);

        if(grupo){
            if(grupo.teams.find((teamFound)=>teamFound.IdTeam==team.IdTeam)){
                return array;
            }else{
            grupo.teams.push(team);

            array[groupName]=grupo;

            return array}
        }else{
            return [...array,{name:team.Group[0].Description, teams:[team]}];
        }

        }

    function searchIndexGroup(array,group){
        const index = array.findIndex(groupItem=>
            groupItem===group
        );

        return index;
    };

    useEffect(()=>{
        const obtainTablePosition = async(match)=>{

            const url = "https://api.fifa.com/api/v3/calendar/"+match.IdCompetition+"/"+match.IdSeason+"/"+match.IdStage+"/"+"standing?language=es";
            
            try{
                const response = await fetch(url);
                const data = await response.json();

                if(data.Results && data.Results[0].Group.length===0){
                    setIsGroupTable(false);
                    setPositionTable(data.Results);
                }else{
                    setIsGroupTable(true);
                    data.Results.map((team)=>{
                        groups=updateGroups(groups,team);
                        
                    });

                    console.log(groups);
                                  
                }



            }catch(error){
                console.log('Error en la solicitud Tabla de posiciones: ',error);
            }
        }

        obtainTablePosition(props.match);

    },[props.match])

    return (
        <>

        <div className="stats">
                {/* <!-- Nav tabs --> */}
            <Tab.Container defaultActiveKey="stats">
                <Nav variant="tabs" className="tex-center justify-content-center" defaultActiveKey="stats" activeKey="stats">
                    <Nav.Item className="nav-item" role="presentation">
                        <NavLink eventKey="stats">Estadisticas</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="positions">Posiciones</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="team">El Equipo</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content >
                    <Tab.Pane eventKey="stats">  
                        <div id="matchStats">
                            <table className="table table-borderless table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{width:300}}>{props.match.HomeTeam.TeamName[0].Description}</th>
                                        <th scope="col">Resumen del Juego</th>
                                        <th scope="col" style={{width:300}}>{props.match.AwayTeam.TeamName[0].Description}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(props.match.BallPossession)?(
                                    <>
                                        <tr>
                                            <td>{props.match.BallPossession.OverallHome}%</td>
                                            <td>Posesión</td>
                                            <td>{props.match.BallPossession.OverallAway}%</td>
                                        </tr>
                                    </>
                                    ):('')}
                                
                                <tr>
                                    <td>{props.match.HomeTeam.Score}</td>
                                    <td>Goles</td>
                                    <td>{props.match.AwayTeam.Score}</td>
                                </tr>
                                <tr>
                                    <td>{hta}</td>
                                    <td>T. Amarilla</td>
                                    <td>{ata}</td>
                                </tr>
                                <tr>
                                    <td>{htr}</td>
                                    <td>T. Roja</td>
                                    <td>{atr}</td>
                                </tr>
                                <tr>
                                    <td>{props.match.HomeTeam.Substitutions.length}</td>
                                    <td>Cambios</td>
                                    <td>{props.match.AwayTeam.Substitutions.length}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <br/>
                        <h4>Historial de Encuentros</h4>
                        <br/>
                        <div className="grafica">
                            <h5 style={{textAlign: "center"}}>Estadisticas últimos encuentros</h5>
                            <br/>
                            <div className="d-flex justify-content-between mx-4">
                                <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg> {(dataVersus.TeamA )?(dataVersus.TeamA.Wins):('')} Victorias</small></span>

                                <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg> {(dataVersus.TeamA)?(dataVersus.TeamA.Draws):('')} Empates</small></span>

                                <span><small>{(dataVersus.TeamB)?(dataVersus.TeamB.Wins):('')} Victorias <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg></small></span>
                            </div>

                            <div className="progress" style={{height: 30}}>                    
                                {(dataVersus.TeamA && dataVersus.TeamB)?(<><div className="progress-bar" role="progressbar" style={{width:rateHome+'%'}} aria-valuenow={rateHome} aria-valuemin="0" aria-valuemax="100">{dataVersus.TeamA.TeamName[0].Description+' '+rateHome+'%' }</div>
                                <div className="progress-bar bg-warning" role="progressbar" style={{width: rateDraws+'%'}} aria-valuenow={rateDraws} aria-valuemin="0" aria-valuemax="100">Empates {rateDraws}%</div>
                                <div className="progress-bar bg-info" role="progressbar" style={{width: rateAway+'%'}} aria-valuenow={rateAway} aria-valuemin="0" aria-valuemax="100">{dataVersus.TeamB.TeamName[0].Description +' '+rateAway+'%'}</div></>):('')}
                            </div>
                        </div>

                        <div>
                            <table  className="table table-borderless table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{width:300}}></th>
                                        <th scope="col"></th>
                                        <th scope="col" style={{width:300}}></th>  
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{wldHome.Wins}</td>
                                        <td>Victorias de Local</td>
                                        <td>{wldAway.Wins}</td>
                                    </tr>
                                    <tr>
                                        <td>{wldAway.Losses}</td>
                                        <td>Victorias de Visitante</td>
                                        <td>{wldHome.Losses}</td>
                                    </tr>
                                    <tr>
                                        <td>{wldHome.Draws}</td>
                                        <td>Empates de Local</td>
                                        <td>{wldAway.Draws}</td>
                                    </tr>
                                    <tr>
                                        <td>{wldAway.Draws}</td>
                                        <td>Empates de Visitante</td>
                                        <td>{wldHome.Draws}</td>
                                    </tr>
                                    <tr>
                                        <td>{wldHome.Losses}</td>
                                        <td>Derrotas de Local</td>
                                        <td>{wldAway.Losses}</td>
                                    </tr>
                                    <tr>
                                        <td>{wldAway.Wins}</td>
                                        <td>Derrotas de Visitante</td>
                                        <td>{wldHome.Wins}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex flex-wrap justify-content-center text-center">
                            {(dataVersus.MatchesList && dataVersus.MatchesList[0])?(dataVersus.MatchesList.map((match)=>(
                                <CardMatch key={match.IdMatch} match={match}></CardMatch>)
                            )):('No hay Encuentros en el historial')}
                        </div>

                        <h5 style={{textAlign: "center"}}>Estadisticas por Equipo</h5>

                        <Tab.Container defaultActiveKey="home">
                        <Nav variant="tabs" className="tex-center justify-content-center" defaultActiveKey="home" activeKey="home">
                            <Nav.Item>
                                <Nav.Link eventKey="home">{searchImg(props.match,'home',1)}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="away">{searchImg(props.match,'away',1)}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                
                        <Tab.Content>
                            <Tab.Pane eventKey="home">
                            <div className="grafica">
                                <br/>
                                <div className="d-flex justify-content-between mx-4">
                                    <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkgreen" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                    </svg> {dataHome.Wins} Victorias</small></span>

                                    <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                    </svg> {dataHome.Draws} Empates</small></span>

                                    <span><small>{dataHome.Losses} Derrotas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                    </svg></small></span>
                                </div>

                                <div className="progress" style={{height: 30}}>                    
                                    {(dataHome)?(<><div className="progress-bar bg-success" role="progressbar" style={{width:rateHomeW+'%'}} aria-valuenow={rateHomeW} aria-valuemin="0" aria-valuemax="100">{'Victorias '+rateHomeW+'%' }</div>
                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: rateHomeD+'%'}} aria-valuenow={rateHomeD} aria-valuemin="0" aria-valuemax="100">Empates {rateHomeD}%</div>
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: rateHomeL+'%'}} aria-valuenow={rateHomeL} aria-valuemin="0" aria-valuemax="100">{'Derrotas '+rateHomeL+'%'}</div></>):('')}
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center text-center">
                                {(dataHome.MatchesList && dataHome.MatchesList[0])?(dataHome.MatchesList.map((match)=>(
                                    <CardMatch key={match.IdMatch} match={match}></CardMatch>)
                                )):('No hay Encuentros en el historial')}
                            </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="away">
                                <div className="grafica">
                                    <br/>
                                    <div className="d-flex justify-content-between mx-4">
                                        <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkgreen" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                        </svg> {dataAway.Wins} Victorias</small></span>

                                        <span><small><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                        </svg> {dataAway.Draws} Empates</small></span>

                                        <span><small>{dataAway.Losses} Derrotas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                        </svg></small></span>
                                    </div>

                                    <div className="progress" style={{height: 30}}>                    
                                        {(dataAway)?(<><div className="progress-bar bg-success" role="progressbar" style={{width:rateAwayW+'%'}} aria-valuenow={rateAwayW} aria-valuemin="0" aria-valuemax="100">{'Victorias '+rateAwayW+'%' }</div>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width: rateAwayD+'%'}} aria-valuenow={rateAwayD} aria-valuemin="0" aria-valuemax="100">Empates {rateAwayD}%</div>
                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: rateAwayL+'%'}} aria-valuenow={rateAwayL} aria-valuemin="0" aria-valuemax="100">{'Derrotas '+rateAwayL+'%'}</div></>):('')}
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center text-center">
                                    {(dataAway.MatchesList && dataAway.MatchesList[0])?(dataAway.MatchesList.map((match)=>(
                                        <CardMatch key={match.IdMatch} match={match}></CardMatch>)
                                    )):('No hay Encuentros en el historial')}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>

                    </Tab.Pane>

                    <Tab.Pane eventKey="positions"> 
                        <br/>
                        <div className="table-responsive-sm PositionTable">
                            <table className="table" id="positionTable">
                                    <thead scope="column">
                                        <tr>
                                            <th>Pos</th>
                                            <th>Equipo</th>
                                            <th>PJ</th>
                                            <th>PG</th>
                                            <th>PE</th>
                                            <th>PP</th>
                                            <th>GF</th>
                                            <th>GC</th>
                                            <th>DIF</th>
                                            <th>PTS</th>    
                                        </tr>                
                                    </thead>
                                    <tbody id="teamsPositions">
                                       {(positionTable && positionTable[0])?((isGroupTable==false)?(positionTable.map((team)=>(
                                       <>
                                        <PositionRow key={team.IdTeam} team={team} homeId={HomeId} awayId={AwayId}></PositionRow>
                                        </>
                                       ))):(
                                        groups.map((group)=>(
                                            <>
                                            <tr>
                                                <td colSpan={10} className="text-center font-weight-bold"></td>
                                            </tr>
                                            {group.teams.map((team)=>(
                                                <PositionRow key={team.IdTeam} team={team} homeId={HomeId} awayId={AwayId}></PositionRow>
                                            ))}
                                            </>
                                        ))
                                       )):(<tr><td colSpan={10} className="text-center">No hay Información</td></tr>)} 
                                    </tbody>
                            </table>
                        </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="team"> 
                                         
                    </Tab.Pane>
                </Tab.Content>
                    
            </Tab.Container>
        </div>

        </>
    )
} 

const searchPlayerName = (playersList,idPlayer)=>{
    if(playersList && Array.isArray(playersList)){
        const player = playersList.find(player => player.IdPlayer === idPlayer);
        if(player){
            return player.PlayerName[0].Description;
        }
    }
}

export default MatchHeader;

