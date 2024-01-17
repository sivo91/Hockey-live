/* eslint-disable @next/next/no-img-element */




import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'
import logo from '@/utils/teamSearch'
import teamFullName from '@/utils/teamFullName'
import { BsArrowUpSquare } from "react-icons/bs";




const Index = () => {

  const router = useRouter()
  const { id } = router.query

  const [load, setLoad] = useState(false)
  const [team, setTeam] = useState([])
  const [roster, setRoster] = useState([])
  const [schedule, setSchedule] = useState([])
  const [activeTab, setActiveTab] = useState('roster');



 // call data
const fetchGameData = useCallback(async () => {
  try {

    setLoad(true)
    const queryParam = encodeURIComponent(id);
    const res = await axios.get(`/api/NHL/findTeam?team=${queryParam}`);
    if(res.data) {
       //console.log(res.data.data2)
      setTeam(res.data)
      setRoster(res.data.data2.players)
      setSchedule(res.data.data2.games)
    }
    setLoad(false)

  } catch (error) {

    console.error(error);

    setLoad(false);
  }
}, [id]);


  useEffect(() => {
         fetchGameData();
  }, [fetchGameData]);


const handleTab = (e) => {
    e.preventDefault();
    setActiveTab(e.target.getAttribute('value'));
  };

const getTabClassName = (tabValue) => {
    return `nav-link ${activeTab === tabValue ? 'active' : ''}`;
  };



  const rorster_function = () => {

   return  <div className="container-fluid my-5">
              <div className="row justify-content-center">
                 <h3 className='text-center '>Roster</h3>
                <div className="col-11 col-md-10 table-container mt-2">
                      
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
                           {roster?.map((player) => (
                              <tr key={player.id}>
                                <td style={{textAlign: 'start', paddingLeft:' 8px'}}>
                                  {player.name}
                                </td>
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
                     
                </div>
              </div>
            </div>
  }




  return (
    <>

       {
          load ? (
            <>
              <div className='text-center my-5'>
                <div className="spinner-grow" style={{color: '#ff2e17'}} role="status">
                </div>
              </div>
            </>
          ) : (
            <>
               
               {
                teamFullName(id)
               }

              

                <div className="container-fluid my-5">
              
                    <h5 className="card-title text-center">{team.name}</h5>
                        
                    <div className="row justify-content-center">
                       <div className="col-10 col-md-2 mt-3">
                             {logo(id,110,110 )}
                       </div>

                       <div className="col-10 col-md-7 justify-content-center mt-4">

                              <div className="card text-center">
                                <div className="card-header">
                                  <ul className="nav nav-tabs card-header-tabs">

                                      <li className="nav-item text">
                                        <a className={getTabClassName('roster')} 
                                          value='roster' 
                                          href="#" 
                                          style={{color: 'black'}}
                                          onClick={handleTab}>Roster</a>
                                      </li>

                                      <li className="nav-item">
                                        <a className={getTabClassName('schedule')} 
                                          value='schedule' 
                                          href="#" 
                                          style={{color: 'black'}}
                                          onClick={handleTab}>Schedule</a>
                                      </li>

                                    </ul>
                                  
                                </div>
                              </div>

                       </div>
                    </div>

                    

                         {
                          activeTab === 'roster' && rorster_function()
                         }

                         {
                          activeTab === 'schedule' && (
                            <>

                                {
                                  <div className="row justify-content-center">
                                     <h3 className='text-center mt-5'>Schedule</h3>

                                    <div className="col-11 col-md-5 mt-2">
                                      
                                      {
                                          schedule.slice(0,41).map((item, idx) => (
                                            <>
                                             <Link href={'#'} 
                                                     style={{textDecoration: 'none', color: 'black'}}>
                                                   <div className='border rounded-2 pt-2 my-1 pb-1 cursor'>
                                                    {/*  <p className='text-center m-0'>game #{idx + 1}</p> */}
                                                      <p className='text-center m-0'>{item.date.substring(0,10)}</p>
                                                      <hr className='mx-5 my-1'/>
                                                      <div className='d-flex justify-content-evenly '>
                                                        <div className='d-flex'>
                                                        {logo(item?.team1short,30,30 )}
                                                          <h4 className='ms-3'>{item.score.goals1}</h4>
                                                        </div>
                                                        <span>vs</span>
                                                        <div className='d-flex'>
                                                          
                                                          <h4 style={{position:'relative', top:'-3px'}} className='me-3'>{item.score.goals2}</h4>
                                                          {logo(item?.team2short,30,30 )}
                                                        </div>
                                                      </div>
                                                  </div>
                                              </Link>
                                            </>
                                          ))
                                      }
                                    </div>

                                    <div className="col-11 col-md-5 mt-2">
                                      {
                                          schedule.slice(41,schedule.length).map((item, idx) => (
                                            <>
                                               <Link href={'#'} 
                                                     key={idx}
                                                     style={{textDecoration: 'none', color: 'black'}}>
                                                    <div className='border rounded-2 pt-2 my-1 pb-1 cursor'>
                                                        <p className='text-center m-0'>{item.date.substring(0,10)}</p>
                                                        <hr className='mx-5 my-1'/>
                                                        <div className='d-flex justify-content-evenly '>
                                                          <div className='d-flex'>
                                                          {logo(item?.team1short,30,30 )}
                                                            <h4 className='ms-3'>{item.score.goals1}</h4>
                                                          </div>
                                                          <span>vs</span>
                                                          <div className='d-flex'>
                                                            
                                                            <h4 style={{position:'relative', top:'-3px'}} className='me-3'>{item.score.goals2}</h4>
                                                            {logo(item?.team2short,30,30 )}
                                                          </div>
                                                        </div>
                                                    </div>
                                               </Link>
                                                   
                                            </>
                                          ))
                                      }
                                    </div>

                                  </div>
                                }
                            </>
                          )
                         }

                 

                  </div>


                  <style>{`



                  .cursor:hover {
                    box-shadow: 1px 1px 5px gray;
                     cursor: pointer;
                  }
        
                    .nav-tabs.card-header-tabs {
                          display: flex;
                          justify-content: space-between;
                          padding-left: 0; 
                          list-style-type: none; 
                        }

                      .nav-item {
                        flex-grow: 1; 
                        text-align: center; 
                      }

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
              text-align: center;
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
          )
        }
      
     


       <Link href={'/'}
            style={{ textDecoration: 'none', width: '200px' }}
            className='btn btn-primary rounded-1 vstack mx-auto'>
        Back
      </Link>
    </>
  )
}

export default Index