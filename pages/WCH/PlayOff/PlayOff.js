/* eslint-disable @next/next/no-img-element */


import React , {useEffect, useCallback, useState } from 'react'
import axios from 'axios';
import { style } from 'd3';
import { BsTrophyFill } from "react-icons/bs";
import { useSelector } from 'react-redux'
import Link from 'next/link';
import { ImSpinner11 } from "react-icons/im";
import Logo from '@/utils/wcGameDatail'
import { FaArrowAltCircleUp } from "react-icons/fa";




const Index = () => {

const { year } = useSelector((state) => state.year)

const yr = Number(year) + 1
  
 const [data, setData] = useState()
 const [loading, setLoading] = useState(false)
 console.log(data)
 const fetchGameData = useCallback(async () => {
  
  try {
    setLoading(true)
    const res = await axios.get(`/api/WCH/allGames?year=${yr}`); 
    setData(res.data);
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}, [yr]);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);
 


 const [quarterfinals, setQuaarterfinals] = useState([])
 const [semifinals, setSemifinal] = useState([])
 const [finals, setFinal] = useState([])
 const [oTretie, setOtretie] = useState([])




  useEffect(() => {
    const x = data?.data?.games;
    const filteredGames = [];
    const playedGames = []
    const stvtfinale = []
    const semifinale = []
    const finale = []
    const oBrondz = []
    

    for (let i = 0; i < x?.length; i++) {
      if (x[i]?.score?.status?.startsWith('na programe')) {
        filteredGames.push(x[i]);
      }
    }

    for(let i = 0; i < x?.length; i++) {
      if (x[i]?.score?.status?.startsWith('kon')) {
        playedGames.push(x[i]);
      }
    }

    for(let i = 0; i < x?.length; i++) {
       if(x[i]?.po_type === 'QF') {
         stvtfinale.push(x[i])
       }
    }

    for(let i = 0; i < x?.length; i++) {
       if(x[i]?.po_type === 'SF') {
         semifinale.push(x[i])
       }
    }

    for(let i = 0; i < x?.length; i++) {
       if(x[i]?.po_type === 'F') {
         finale.push(x[i])
       }
    }

    for(let i = 0; i < x?.length; i++) {
       if(x[i]?.po_type === 'B') {
         oBrondz.push(x[i])
       }
    }


    setQuaarterfinals(stvtfinale)
    setSemifinal(semifinale)
    setFinal(finale)
    setOtretie(oBrondz)
  }, [data]);




  function nextRound1 (a , b) {
    if(a > b) {
      return <p className='ms-2 fs-4 text-success' style={{position: 'relative', top: '-7px'}}>
        <FaArrowAltCircleUp />
      </p>
    }
  }

  function nextRound2 (a , b) {
    if(a < b) {
      return <p className='ms-2 fs-4 text-success' style={{position: 'relative', top: '-7px'}}>
        <FaArrowAltCircleUp />
      </p>
    }
  }

  function winCup1 (a , b) {
       if(a > b) {
      return <p className='ms-2 fs-4 text-warning' style={{position: 'relative', top: '-7px'}}>
        <BsTrophyFill />
      </p>
    }
  }

  function winCup2 (a , b) {
       if(a < b) {
      return <p className='ms-2 fs-4 text-warning' style={{position: 'relative', top: '-7px'}}>
        <BsTrophyFill />
      </p>
    }
  }


  return (
    <>

     <h3 className='text-center my-5'>Play Off | Ice Hockey World Championships {year}/{Number(year)+1}</h3>
    
      {
        loading ? 
        (<> 
          <div className='text-center my-5'>
             <ImSpinner11 className='fs-4 rotate-infinite'/> 
          </div>
        </>) :
        (<>
           {
            data?.data === undefined || data?.data == null || data?.data[60]?.po_type === null ? (
              <p className='text-center my-5 fs-5'>Sorry, data are currently not available!</p>
            ) : (
              <>
                  <div className="container-fluid py-5">

                    <h4 className='text-center my-3'>Quarter-finals</h4>
                    <div className="panelquarter"> 
                      { quarterfinals &&
                        quarterfinals?.map((game, index) => (
                          <>
                            <div key={index} className="m-2">
                              <Link href={`/WCH/PlayOff/${game?.id}`}
                                    style={{textDecoration: 'none'}}>
                                  <div className="card my-2 px-3 py-2">
                                    <p className='text-center mb-0'> 
                                      
                                        {new Date(game?.date?.date?.split('.')[0]).toLocaleDateString("en-US", {
                                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                      </p>
                                    <hr />

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team1short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team1short}
                                        </p>
                                           {nextRound1(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals1}
                                      </p>
                                    </div>

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team2short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team2short}
                                        </p>
                                        {nextRound2(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals2}
                                      </p>
                                    </div>
                                    
                                  </div>
                              </Link>
                            </div> 
                          </>
                        ))
                      }
                    </div>

                    <hr className='mx-5'/>
                    <h4 className='text-center my-3'>Semi-finals</h4>
                    <div className="panelquarter"> 
                      { semifinals &&
                        semifinals?.map((game, index) => (
                          <>
                            <div key={index} className="m-2">
                              <Link href={`/WCH/PlayOff/${game?.id}`}
                                    style={{textDecoration: 'none'}}>
                                  <div className="card my-2 px-3 py-2">
                                    <p className='text-center mb-0'> 
                                      
                                        {new Date(game?.date?.date?.split('.')[0]).toLocaleDateString("en-US", {
                                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                      </p>
                                    <hr />

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team1short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team1short}
                                        </p>
                                           {nextRound1(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals1}
                                      </p>
                                    </div>

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team2short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team2short}
                                        </p>
                                        {nextRound2(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals2}
                                      </p>
                                    </div>
                                    
                                  </div>
                              </Link>
                            </div> 
                          </>
                        ))
                      }
                    </div>

                    <hr className='mx-5'/>
                    <h4 className='text-center my-3'>Finals</h4>
                    <div className="panelquarter"> 
                      { finals &&
                        finals?.map((game, index) => (
                          <>
                            <div key={index} className="m-2">
                              <Link href={`/WCH/PlayOff/${game?.id}`}
                                    style={{textDecoration: 'none'}}>
                                  <div className="card my-2 px-3 py-2">
                                    <p className='text-center mb-0'> 
                                      
                                        {new Date(game?.date?.date?.split('.')[0]).toLocaleDateString("en-US", {
                                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                      </p>
                                    <hr />

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team1short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team1short}
                                        </p>
                                           {winCup1(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals1}
                                      </p>
                                    </div>

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team2short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team2short}
                                        </p>
                                        {winCup2(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals2}
                                      </p>
                                    </div>
                                    
                                  </div>
                              </Link>
                            </div> 
                          </>
                        ))
                      }
                    </div>


                    <hr className='mx-5'/>
                    <h4 className='text-center my-3'>bronze medal hockey game</h4>
                    <div className="panelquarter"> 
                      { oTretie &&
                        oTretie?.map((game, index) => (
                          <>
                            <div key={index} className="m-2">
                              <Link href={`/WCH/PlayOff/${game?.id}`}
                                    style={{textDecoration: 'none'}}>
                                  <div className="card my-2 px-3 py-2">
                                    <p className='text-center mb-0'> 
                                      
                                        {new Date(game?.date?.date?.split('.')[0]).toLocaleDateString("en-US", {
                                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                      </p>
                                    <hr />

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team1short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team1short}
                                        </p>
                                           {nextRound1(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals1}
                                      </p>
                                    </div>

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {Logo(game?.team2short, 50, 35)}
                                        <p className='fs-5 ms-2'>
                                          {game?.team2short}
                                        </p>
                                        {nextRound2(game?.score?.goals1, game?.score?.goals2)}
                                      </div>
                                      <p className='fs-5 fw-bold'>
                                        {game?.score?.goals2}
                                      </p>
                                    </div>
                                    
                                  </div>
                              </Link>
                            </div> 
                          </>
                        ))
                      }
                    </div>



               

                </div>
              </>
            )
           }
         </>)
      }


    <style>{`

       .panelquarter {
        position: relative;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
       }

        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

          .rotate-infinite {
            animation: rotate360 1s linear infinite;
          }


       

            .cursor:hover {
              cursor: pointer;
            }

      `}</style>
        
    </>
  )
}

export default Index