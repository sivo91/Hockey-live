

/* eslint-disable @next/next/no-img-element */




import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'
import logo from '@/utils/wchSingleTeam'
import teamFullName from '@/utils/teamFullName'
import { BsArrowUpSquare } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { selectYear } from '@/reduxFile/selectYearSlice';
import ScrooBtn from '@/utils/ScrollBtnUp'
import { AiOutlineLoading } from "react-icons/ai";
import LineGraph from '@/pages/WCH/team/detailGraph'




const Index = () => {

  const router = useRouter()
  const { id } = router.query
  const year = useSelector((state) => state.year.year);

  const dispatch = useDispatch()
    
  


  const [load, setLoad] = useState(false)
  const [team, setTeam] = useState([])
  const [roster, setRoster] = useState([])
  const [schedule, setSchedule] = useState([])
  const [activeTab, setActiveTab] = useState('roster');
  const [noRoster, setNoRoster] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2023');


 useEffect(() => {
  dispatch(selectYear(selectedYear))
  }, [selectedYear, dispatch]);



 // call data
const fetchGameData = useCallback(async () => {
  try {

    setLoad(true)
    const queryParam = encodeURIComponent(id);
    const res = await axios.get(`/api/WCH/findTeam?team=${queryParam}&year=${year}`);
    
    if(res.data) {
      console.log(res.data)
      setTeam(res.data)
      setRoster(res.data.data2.players)
      setSchedule(res.data.data2.games)
    } 

    if(!res.data.data2.players) {
     setNoRoster(true)
    } else {
      setNoRoster(false)
    }

    setLoad(false)

  } catch (error) {

    console.error(error);

    setLoad(false);
  }
}, [id, year]);



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
                              <th>GP</th>
                              <th>G</th>
                              <th>A</th>
                              <th>PTS</th>
                              <th>GWG</th>
                              <th>SHG</th>
                              <th>PPG</th>
                              <th>PIM</th>
                              
                            </tr>
                          </thead>
                          
                          {
                            noRoster ? (
                              <>
                              
                                <tbody>
                                  <tr>
                                    <td colSpan="9"
                                        className='pb-1'><AiOutlineLoading className="rotate" /></td>
                                  </tr>
                                  <tr >
                                  
                                     <td colSpan="9" className="alert border border-dark alert-light  fs-5 w-100"
                                          role="alert">
                                         Waiting for roster
                                      </td >
                                  </tr>
                                </tbody>
                              
                              </>
                            ) : (
                              <>
                                  <tbody>
                                      {roster?.map((player) => (
                                          <tr key={player.id}>
                                            <td style={{textAlign: 'start', paddingLeft:' 8px'}}>
                                              {player.name}
                                            </td>
                                            <td>{player.stats.gp}</td>
                                            <td>{player.stats.asists}</td>
                                            <td>{player.stats.goals}</td>
                                            <td>{player.stats.points}</td>
                                            <td>{player.stats.gwg}</td>
                                            <td>{player.stats.shg}</td>
                                            <td>{player.stats.ppg}</td>
                                            <td>{player.stats.penalty}</td>
                                          </tr>
                                        ))} 
                                      </tbody>
                              </>
                            )
                          }
                        </table>
                     
                </div>
              </div>
            </div>
  }

 
    // select year
    const handleChangeYear = (event) => {
      setSelectedYear(event.target.value);
    };

      const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        let startYear = currentMonth >= 8 ? currentYear + 1 : currentYear; 

        let years = [];

        for (let i = 0; i < 10; i++) {
            years.push(startYear - i);
        }

        return years;
    };

    // details of team

    
let wins = [];
let losses = [];

if(schedule) {
  for (let i = 0; i < schedule.length; i++) {
    // Check if the current team is team1 and if it won
    if (id === schedule[i].team1short && schedule[i].score.goals1 > schedule[i].score.goals2) {
        wins.push(schedule[i]);
    } 
    // Check if the current team is team2 and if it won
    else if (id === schedule[i].team2short && schedule[i].score.goals1 < schedule[i].score.goals2) {
        wins.push(schedule[i]);
    }
    // Check if the current team is team1 and if it lost
    else if (id === schedule[i].team1short && schedule[i].score.goals1 < schedule[i].score.goals2) {
        losses.push(schedule[i]);
    }
    // Check if the current team is team2 and if it lost
    else if (id === schedule[i].team2short && schedule[i].score.goals1 > schedule[i].score.goals2) {
        losses.push(schedule[i]);
    }
}
}


const table_Wins_Losts = () => {
    return (
                    <table style={{minWidth: 'auto'}} className='mb-5'>
                        <thead>
                            <tr className='border-bottom'>
                                <th>Wins</th>
                                <th>Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fs-5'>{wins.length}</td>
                                <td className='fs-5'>{losses.length}</td>
                            </tr>
                        </tbody>
                    </table>
    );
}




  return (
    <>

       {
          load ? (
            <>
              <div className='text-center my-5'>
                <div className="spinner-grow" style={{backgroundImage: 'radial-gradient(circle, red, white)'}} role="status">
                </div>
              </div>
            </>
          ) : (
            <>
               
               {
                teamFullName(id)
               }

              

               <div className="container-fluid my-5">
              
                   {/*  <h5 className="text-center">{team.name}</h5>
                    <p className='text-center lead m-0'>Year {year}/{Number(year)+1}</p> */}


                   {/* select year */}
                    <div className="row justify-content-center">
                       <div className="col-12 col-md-6">
                           
                              <select className="form-select form-select-lg  my-3"
                                        value={selectedYear} onChange={handleChangeYear}
                                        style={{width: '300px', margin: '0 auto'}} 
                                        aria-label="Large select example">
                                    <option>Select Season</option>
                                    { 
                                        generateYears().map(year => (
                                          // year - 1 / lebo rocnik 2023 sa rata 23/24
                                          <option key={year} value={year - 1}>
                                              {`${year - 1}/${year}`}
                                          </option>
                                    ))}
                              </select>
                        </div>
                    </div>
                        
                    <div className="row justify-content-center">
                       <div className="col-10 col-md-2 mt-3">
                             {logo(id,130,90 )}
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
                                  <>
                                    <h3 className='text-center mt-5'>Schedule</h3>
                                    <div className="row justify-content-center">
                                      

                                      <div className="col-11 col-md-5 mt-2">
                                        <h4 className='text-center mb-3'>Games</h4>
                                        <hr />
                                        
                                        {
                                            schedule.map((item, idx) => (
                                              <>
                                              <Link href={'#'} 
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <div className='border rounded-2 pt-2 my-1 pb-1 cursor'>
                                                
                                                        <p className='text-center m-0'>{item.date.substring(0,10)}</p>
                                                        <hr className='mx-5 my-1'/>
                                                        <div className='d-flex justify-content-evenly '>
                                                          <div className='d-flex'>
                                                          {logo(item?.team1short,40,30 )}
                                                            <h4 className='ms-3'>{item.score.goals1}</h4>
                                                          </div>
                                                          <span>vs</span>
                                                          <div className='d-flex'>
                                                            
                                                            <h4 style={{position:'relative', top:'-3px'}} className='me-3'>{item.score.goals2}</h4>
                                                            {logo(item?.team2short,40,30 )}
                                                          </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                              </>
                                            ))
                                        }
                                      </div>
                                   

                                      {/* statistics */}
                                      <div className="col-11 col-md-5 mt-2">
                                         <h4 className='text-center mb-3'>Details</h4>
                                         <hr />

                                         {
                                          table_Wins_Losts()
                                         }

                                         <LineGraph  schedule={schedule}
                                                    id={id}/>


                                      </div>

                                    </div>
                                  </>
                                }
                            </>
                          )
                         }

                 

                  </div> 

                   <ScrooBtn />


                  <style>{`

                   @keyframes rotate {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }

                  .rotate {
                    animation: rotate 2s linear infinite;
                  }



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