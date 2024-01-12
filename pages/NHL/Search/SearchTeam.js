/* eslint-disable @next/next/no-img-element */





import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import logo from '@/utils/teamSearch'
import { AiOutlineClose } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import teamInfoData from '@/utils/teamInfo';





const Index = () => {


  //const [team, setTeam] = useState("MTL");
  const [teamData, setTeamData] = useState(null)
  const [query, setQuery] = useState('');
  const [alertInfo, setAlertInfo] = useState(false)
  const [load, setLoad] = useState(false)


 console.log(teamData)


const fetchGameData = useCallback(async () => {

  // Clear teamData when query is too short
  if (query.length <= 2) {
    setTeamData(null);
    setAlertInfo(false);
    return; // Exit the function early
  }



  try {
    setLoad(true)
    const queryParam = encodeURIComponent(query);
    const res = await axios.get(`/api/NHL/findTeam?team=${queryParam}`);
    setTeamData(res.data.data);
    setAlertInfo(!res.data.data); 
    setLoad(false)
  } catch (error) {
    console.error(error);
    setTeamData(null); 
    setAlertInfo(true);
    setLoad(false);
  }
}, [query]);


  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);









// if query meet contintion, show team
 const teamInfo = (query) => {
    if (query && teamData) {
        if (query === 'TBL') {
            return currentTeam(1);
        } else if(query === 'NSH') {
           return currentTeam(2)
        } else if(query === 'PIT') {
           return currentTeam(3)
        } else if(query === 'CHI') {
           return currentTeam(4)
        } else if(query === 'VGK') {
           return currentTeam(5)
        } else if(query === 'SEA') {
           return currentTeam(6)
        } else if(query === 'CAR') {
           return currentTeam(29)
        } else if(query === '') {
           return currentTeam(3)
        } else if(query === 'OTT') {
           return currentTeam(8)
        } else if(query === 'TOR') {
           return currentTeam(0)
        } else if(query === 'MTL') {
           return currentTeam(9)
        } else if(query === 'BOS') {
           return currentTeam(10)
        } else if(query === 'LAK') {
           return currentTeam(11)
        } else if(query === 'COL') {
           return currentTeam(12)
        } else if(query === 'VAN') {
           return currentTeam(13)
        } else if(query === 'EDM') {
           return currentTeam(14)
        } else if(query === 'WPG') {
           return currentTeam(15)
        } else if(query === 'BUF') {
           return currentTeam(16)
        } else if(query === 'NYR') {
           return currentTeam(17)
        } else if(query === 'CBJ') {
           return currentTeam(18)
        } else if(query === 'NJD') {
           return currentTeam(19)
        } else if(query === 'DET') {
           return currentTeam(20)
        } else if(query === 'STL') {
           return currentTeam(22)
        } else if(query === 'MIN') {
           return currentTeam(23)
        } else if(query === 'FLA') {
           return currentTeam(24)
        } else if(query === 'PHI') {
           return currentTeam(25)
        } else if(query === 'WSH') {
           return currentTeam(31)
        } else if(query === 'ARI') {
           return currentTeam(26)
        } else if(query === 'NYI') {
           return currentTeam(27)
        } else if(query === 'SJS') {
           return currentTeam(28)
        } else if(query === 'CGY') {
           return currentTeam(29)
        } else if(query === 'ANA') {
           return currentTeam(31)
        } 
    }
};


const currentTeam = (param) => {

    let info_team = teamInfoData[Number(param)];
    return (
       <div className="container-fluid">
         <div className="row justify-content-center">

           <div className="col-10 col-md-2 text-center">
            {logo(query,80,80 )}

            {
              info_team.achievements.stanley_cup_championships.length > 0 &&
              (
                <>
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Stanley Cup Champ.</option>
                      { 
                      info_team.achievements.stanley_cup_championships.map((item, i) => (
                        <option value="i" key={i}>{item} </option>
                      ))
                      }
                    </select>
                </>
              )
            }
           
           </div>

             <div className="col-11 col-md-4 mt-2">
                <div className="card w-100">
                      <p  className='m-1 border-bottom'>Team: {info_team.team}</p>
                      <p  className='m-1 border-bottom'>Arena Name: {info_team.arena.name}</p>
                      {/* <p  className='m-1 border-bottom'>Arena Address: {info_team.arena.address}</p> */}
                      <p  className='m-1 '>Arena Capacity: {info_team.arena.capacity}</p>
                </div>
            </div>

            <div className="col-11 col-md-4 mt-2">
                <div className="card w-100">
                   <p  className='m-1 border-bottom'>City: {info_team.location.city}</p>
                   <p  className='m-1 border-bottom'>State: {info_team.location.state_province}</p>
                   <p  className='m-1'>Country: {info_team.location.country}</p>             
              </div>
            </div>
      

        </div>
       </div>
    );
};


const nhlTeamShortKeys = [
  "NSH", "TBL", "PIT", "CHI", "VGK", "MIN", "ANA",
  "FLA", "PHI", "WSH", "ARI", "NYI", "SJS", "CGY",
  "BUF", "NYR", "CBJ", "NJD", "DET", "DAL",
  "TOR", "MTL", "BOS", "LAK", "COL", "WPG",
  "SEA", "CAR", "OTT", "EDM", "STL", "VAN"
];

nhlTeamShortKeys.sort();



  return (
    <>
      <h3 className='text-center my-5'>Search for Team</h3>

     

        {/* search */}
      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-8 col-md-4">
              
              <label htmlFor="input" >Type Abbreviation</label>
              <div className='d-flex'>
                <input type="text" 
                className="form-control rounded-2" 
                id="input" 
                maxLength={3}
                value={query}
                onChange={e => setQuery(e.target.value.toUpperCase().trim())}
                placeholder="SJS"/>
                 
              </div>
          </div>
        </div>
       </div> 

        {
          load && (
            <>
              <div className='text-center my-5'>
                <div className="spinner-grow" style={{color: '#7700a6'}} role="status">
                </div>
              </div>
            </>
          )
        }


         {  // alert wrong qwery
           alertInfo && <div className="alert alert-warning mx-auto border border-dark" 
                            style={{position: 'relative', width: '300px'}}
                            role="alert">
                      Invalid NHL team short key. 
                      <BsQuestionCircle className='ms-5 fs-5 cursor' 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal"/>
              </div>
         }

         <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">NHL Short Key for Team</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-2">
                      {nhlTeamShortKeys.slice(0, 7).map((shortKey) => (
                          <h5 key={shortKey}>{shortKey}</h5>
                        ))}
                    </div>
                    <div className="col-2">
                      {nhlTeamShortKeys.slice(7, 14).map((shortKey) => (
                        <h5 key={shortKey}>{shortKey}</h5>
                      ))}
                    </div>
                    <div className="col-2">
                      {nhlTeamShortKeys.slice(14, 21).map((shortKey) => (
                        <h5 key={shortKey}>{shortKey}</h5>
                      ))}
                    </div>
                    <div className="col-2">
                      {nhlTeamShortKeys.slice(21, 28).map((shortKey) => (
                        <h5 key={shortKey}>{shortKey}</h5>
                      ))}
                    </div>
                    <div className="col-2">
                      {nhlTeamShortKeys.slice(28).map((shortKey) => (
                        <h5 key={shortKey}>{shortKey}</h5>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
                 
                </div>
              </div>
            </div>
          </div>


      
      {
        teamInfo(query)
      }
      

     {
      teamData && (
        <>
 
           <div className="container-fluid my-5">
              <div className="row justify-content-center">
                <div className="col-11 col-md-10 table-container">
                  {teamData?.players && (
                        <table>
                          <thead>
                            <tr className='border-bottom'>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Birthdate</th>
                              <th>Hold</th>
                              <th>Weight (kg)</th>
                              <th>Height (cm)</th>
                              <th>GP</th>
                              <th>G</th>
                              <th>A</th>
                              <th>PTS</th>
                              <th>PIM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamData?.players.map((player) => (
                              <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.pos}</td>
                                <td>{player.bio.born}</td>
                                <td>{player.bio.hold}</td>
                                <td>{player.bio.kg}</td>
                                <td>{player.bio.cm}</td>
                                <td>{player.stats.gp}</td>
                                <td>{player.stats.goals}</td>
                                <td>{player.stats.asists}</td>
                                <td>{player.stats.points}</td>
                                <td>{player.stats.penalty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                </div>
              </div>
            </div>
          
        </>
      )
     }


     
      <Link href={'/'}
            style={{ textDecoration: 'none', width: '200px' }}
            className='btn btn-primary rounded-1 vstack mx-auto'>
        Back
      </Link>



      <style>{`
       
        .cursor {
          cursor: pointer;
        }
         .table-container {
              overflow-x: auto;
            }

            table {
              width: 100%;
              min-width: 700px; 
              border-collapse: collapse; 
            }

            th, td {
              border: 1px solid black;
            }

            tr {
              border: 1px solid black; 
              
            }

          table tr:nth-child(even) {
            background-color: #ededed;
          }

          table tr:nth-child(odd) {
              background-color: #ffffff;
            }

    
      `}</style>
    </>
  );
}

export default Index;
