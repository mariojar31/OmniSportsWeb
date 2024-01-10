
import { Container, Card } from "react-bootstrap";
import { searchImg, country, matchStatus, timeSet } from "@/app/scripts/sc_utilities";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImgError from "@/public/img/ImgError.png";



const CardMatch = (props)=>{

    const [imgCountry, setImgCountry] = useState('');
    // const [time, setTime] = useState('');

    useEffect(()=>{
        async function loadCountryImage(){

            if(props.match && props.match.IdCompetition){
            const url=await country(props.match);

                setImgCountry(url);           }

        }
        loadCountryImage();
    },[props.match])

    const imageError = (e)=>{
        e.target.src=ImgError;
    };

    return((props.match==null || props.match.Home.ShortClubName == null || props.match.Away == null)?(<span></span>):(
        <>      
        <a target="_blank" style={{textDecoration:'none', color:'black', width: '32%', minWidth: 280}} href={'/scores/matchdetails?competition='+props.match.IdCompetition+'&season='+props.match.IdSeason+'&stage='+props.match.IdStage+'&match='+props.match.IdMatch} className="list-group-item list-group-item-action card text-center match_card mx-1 my-1 py-2" aria-current="true">
            <div>
                <h6 className="mb-1"><span>{(imgCountry === 'null')?(''):(<Image src={imgCountry} alt="Country" width={15} height={15} onError={imageError}></Image>)}</span><b style={{color: 'rgb(100, 100, 100)'}}> {(props.match.SeasonName)?(props.match.SeasonName[0].Description):(props.match.CompetitionName[0].Description)}</b></h6>
                <small>{props.match.StageName[0].Description} - </small>
                <span>{matchStatus(props.match,props.match.OfficialityStatus)}</span>
            </div>
            <p className="mb-1  flex-nowrap" style={{fontWeight:450}}>
            <span>{searchImg(props.match,'home')}</span>
                {(props.match.HomeTeamScore == null || props.match.AwayTeamScore == null)?(props.match.Home.ShortClubName+' '+' Vs '+' '+props.match.Away.ShortClubName):(props.match.Home.ShortClubName+' '+props.match.HomeTeamScore+' Vs '+props.match.AwayTeamScore+' '+props.match.Away.ShortClubName)}
            <span>{searchImg(props.match,'away')}</span>
            </p>
            <small className="text-muted">{timeSet(props.match)}</small>
        </a>
        </>)
    )
}

export default CardMatch;