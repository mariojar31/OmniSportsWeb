import React from "react";

const PositionRow = ({team, homeId, awayId})=>{

    return(
        <>
        <tr>
            <td>{team.Position} {(team.Position<team.PreviousPosition)?(<span style={{color:"green"}} className="material-symbols-outlined">
                arrow_drop_up
                </span>):((team.Position>team.PreviousPosition)?(<span style={{color:"red"}} className="material-symbols-outlined">
                arrow_drop_down
                </span>):(''))}</td>
            <td style={(team.IdTeam===homeId || team.IdTeam===awayId)?({fontWeight: 700}):({})}>{team.Team.Name[0].Description}</td>
            <td>{team.Played}</td>
            <td>{team.Won}</td>
            <td>{team.Drawn}</td>
            <td>{team.Lost}</td>
            <td>{team.For}</td>
            <td>{team.Against}</td>
            <td>{team.GoalsDiference}</td>
            <td>{team.Points}</td>
        </tr>
        </>
        
    )
}

export default PositionRow;