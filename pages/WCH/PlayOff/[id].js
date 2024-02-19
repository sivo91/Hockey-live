

import React, {useState, useEffect, useCallback , useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Logo from '@/utils/wcGameDatail'
import Link from 'next/link';

import 'react-vertical-timeline-component/style.min.css';
import { FaHockeyPuck } from "react-icons/fa";
import { TfiTime } from "react-icons/tfi";




const Index = () => {

 const router = useRouter()
 const { id } = router.query
 const [gameData, setGameData] = useState(null)

 const fetchGameData = useCallback(async () => {
  if (!id) {
    console.log("Can't find game");
    return;
  }

  try {
    const queryParam = encodeURIComponent(id);
    const res = await axios.get(`/api/NHL/gameDetails?id=${queryParam}`); 
    setGameData(res.data.data);
  } catch (error) {
    console.log(error);
  }
}, [id]);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);


  let goalsTeam1 = [];
  let goalsTeam2 = [];

  if(gameData && gameData?.goals) {
    for (let i = 0; i < gameData?.goals?.length; i++) {
       let item = gameData.goals[i];
        if (item.teamshort === gameData?.team1short) {
            goalsTeam1.push(item);
        }
        if (item.teamshort === gameData?.team2short) {
            goalsTeam2.push(item);
        }
       
    }
  }



  const PIM = (x, y) => {
      if (Number(x) < Number(y)) {
        return '#1eab02'; 
      } else if (Number(x) > Number(y)) {
        return '#ff3300'; 
      } else {
      return '#7d7b72'
      }
    }

  const GP = (x, y) => {
    if (Number(x) > Number(y)) {
      return '#1eab02'; 
    } else if (Number(x) < Number(y)) {
      return '#ff3300'; 
    } else {
      return '#7d7b72'
    }
  }


  return (
   <>

      <h3 className='text-center my-5'>Game Summaries</h3>

      {
        gameData === null || gameData === undefined ? (
          <>
            <div className='text-center my-5'>
              <div className="spinner-grow text-warning  mx-auto mt-3" role="status">
             </div>
            </div>
          </>
        ) : (
        <>
             {/* header */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4 col-md-3 text-center">
             <div>
              { Logo(gameData?.team1short, 80, 50)}
               <h3>{gameData?.team1long}</h3>
             </div>
             <h1>{gameData?.score?.goals1}</h1>
          </div>

          <div className="col-1 fs-1 pt-4 text-center">-</div>

          <div className="col-4 col-md-3 text-center">
              <div>
                 { Logo(gameData?.team2short, 80 ,50)}
                 <h3>{gameData?.team2long}</h3>
              </div>
              <h1>{gameData?.score?.goals2}</h1>
          </div>
        </div>
      </div>
      <hr className='mx-5'/>


      {/* scores */}
      <div className="overflow-x-hidden">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 px-2">

                  <div className="timeline-container">
                    <div className="timeline">
                        {gameData.goals.map((goal, index) => (
                            <div key={index} className={`timeline-item ${goal.teamshort === `${gameData.team1short}` ? 'left' : 'right'}`}>
                                <div className="timeline-content">
                                    <div className='d-flex justify-content-between'>
                                      <div className='d-flex'>
                                        <TfiTime className='me-2' style={{position: 'relative', top: '4px'}}/>
                                        <p className="m-0">{goal.time}</p>
                                      </div>
                                      <p className='m-0 fw-semibold'>{goal.teamshort}</p>
                                    </div>
                                    <h6>
                                        <FaHockeyPuck className='me-2' style={{position: 'relative', top: '-1px'}}/> 
                                        {goal.goaler}
                                    </h6>
                                    <p className='m-0'>1st A: {goal.asister1 === 'bez asistencie' ? 'No Assist' : goal.asister1}</p>
                                    <p className='m-0'>2nd A: {goal.asister2 === 'bez asistencie' ? 'No Assist' : goal.asister2}</p>
                                    <div className='d-flex justify-content-between'>
                                      <p className='m-0'>Status: {goal.status}</p>
                                      <p className='m-0'>When: {goal.when}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
         
          </div>
        </div>
      </div>

    



     

        {/* stats  */}
        <div className="container-fluid my-3">
              <div className="row justify-content-center ">
                <div className="col-11 col-md-6 justify-content-center border rounded-3 py-3">
                  
                

                    {/* Score in WINS */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                          <span className="badge px-3" 
                                style={{ backgroundColor: GP(gameData?.stats?.team1?.wins, gameData?.stats?.team2?.wins) }}>
                            {gameData?.stats?.team1?.wins}
                          </span>
                    </h5>
                      <h5>WINS</h5>
                    <h5>
                      <span className="badge px-3" 
                                style={{ backgroundColor: GP(gameData?.stats?.team2?.wins, gameData?.stats?.team1?.wins) }}>
                            {gameData?.stats?.team2?.wins}
                          </span>
                      </h5>
                  </div>
                    {/* PIM */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                      <span className="badge px-3" 
                            style={{ backgroundColor: PIM(gameData?.stats?.team1?.penaltyminutes, gameData?.stats?.team2?.penaltyminutes) }}>
                        {gameData?.stats?.team1?.penaltyminutes}
                      </span>
                    </h5>
                      <h5>PIM</h5>
                    <h5>
                        <span className="badge px-3" 
                              style={{ backgroundColor: PIM(gameData?.stats?.team2?.penaltyminutes, gameData?.stats?.team1?.penaltyminutes) }}>
                          {gameData?.stats?.team2?.penaltyminutes}
                        </span>
                      </h5>
                  </div>

                    {/* GP */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                      <span className="badge px-3" 
                            style={{ backgroundColor: GP(gameData?.stats?.team1?.gp, gameData?.stats?.team2?.gp) }}>
                        {gameData?.stats?.team1?.gp}
                      </span>
                    </h5>
                      <h5>GP</h5>
                    <h5>
                        <span className="badge px-3" 
                              style={{ backgroundColor: GP(gameData?.stats?.team2?.gp, gameData?.stats?.team1?.gp) }}>
                          {gameData?.stats?.team2?.gp}
                        </span>
                      </h5>
                  </div>

                  {/* Losts */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                      <span className="badge px-3" 
                            style={{ backgroundColor: PIM(gameData?.stats?.team1?.losts, gameData?.stats?.team2?.losts) }}>
                        {gameData?.stats?.team1?.losts}
                      </span>
                    </h5>
                      <h5>Losts</h5>
                    <h5>
                        <span className="badge px-3" 
                              style={{ backgroundColor: PIM(gameData?.stats?.team2?.losts, gameData?.stats?.team1?.losts) }}>
                          {gameData?.stats?.team2?.losts}
                        </span>
                      </h5>
                  </div>

                  {/* points  */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                      <span className="badge px-3" 
                            style={{ backgroundColor: GP(gameData?.stats?.team1?.points, gameData?.stats?.team2?.points) }}>
                        {gameData?.stats?.team1?.points}
                      </span>
                    </h5>
                      <h5>Points</h5>
                    <h5>
                        <span className="badge px-3" 
                              style={{ backgroundColor: GP(gameData?.stats?.team2?.points, gameData?.stats?.team1?.points) }}>
                          {gameData?.stats?.team2?.points}
                        </span>
                      </h5>
                  </div>

                  {/* Score */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                        <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team1?.score}
                        </span>
                    </h5>
                      <h5>Score</h5>
                    <h5>
                        <span className="badge px-3 bg-light text-dark border"> 
                              {gameData?.stats?.team2?.score}
                        </span>
                      </h5>
                  </div>

                  {/* Score in PP */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                          <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team1?.scoreinpp}
                        </span>
                    </h5>
                      <h5>PPG</h5>
                    <h5>
                      <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team2?.scoreinpp}
                        </span>
                      </h5>
                  </div>

                  
                  {/* Score in SHG */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                          <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team1?.scoreinsh}
                        </span>
                    </h5>
                      <h5>SHG</h5>
                    <h5>
                      <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team2?.scoreinsh}
                        </span>
                      </h5>
                  </div>

                  {/* Score in SHUTOUTS */}
                  <div className='d-flex justify-content-between border-bottom pt-2'>
                    <h5>
                          <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team1?.shutouts}
                        </span>
                    </h5>
                      <h5>SHUTOUTS</h5>
                    <h5>
                      <span className="badge px-3 bg-light text-dark border"> 
                          {gameData?.stats?.team2?.shutouts}
                        </span>
                      </h5>
                  </div>

                </div>
              </div>
        </div> 
            
      
        {/* Best Players */}
            <div className="container-fluid">
              <div className="row justify-content-center">

                <div className="col-11 col-md-3 mt-2">
                  <div className="card">
                    <div className="card-header text-center fw-semibold">
                      The Best Player: {gameData?.stats?.team1?.bestplayer?.name}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-evenly">
                        <p className='m-0'>G: {gameData?.stats?.team1?.bestplayer?.goals}</p> 
                        <p className='m-0'>A: {gameData?.stats?.team1?.bestplayer?.asists}</p> 
                        <p className='m-0'>PTS: {Number(gameData?.stats?.team1?.bestplayer?.asists) + 
                                    Number(gameData?.stats?.team1?.bestplayer?.goals)}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-11 col-md-3 mt-2">
                  <div className="card">
                    <div className="card-header text-center fw-semibold">
                      The Best Player: {gameData?.stats?.team2?.bestplayer?.name}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-evenly">
                        <p className='m-0'>G: {gameData?.stats?.team2?.bestplayer?.goals}</p> 
                        <p className='m-0'>A: {gameData?.stats?.team2?.bestplayer?.asists}</p> 
                        <p className='m-0'>PTS: {Number(gameData?.stats?.team2?.bestplayer?.asists) + 
                                    Number(gameData?.stats?.team2?.bestplayer?.goals)}</p>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
              </>
        )
      }

     




      <Link href={'/WCH/PlayOff/PlayOff'}
            style={{textDecoration: 'none', width: '150px'}}
            className='btn btn-primary vstack mx-auto my-5'>
        Back
      </Link>


        <style>{`


            .timeline-container {
                position: relative;
                max-width: 800px;
                height: 400px;
                margin: 0 2px;
            }

            .timeline:before {
                content: '';
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
                bottom: 0;
                width: 1px;
                background: #c5c5c5;
            }

            .timeline-item {
                position: relative;
                width: 50%;
                padding: 5px;
                box-sizing: border-box;
            }

            .timeline-item.left {
                left: 0;
            }

            .timeline-item.right {
                left: 50%;
            }

            .timeline-content {
                padding: 10px;
                width: auto;
                background: #f8f9fa;
                border-radius: 4px;
                position: relative;
                border-radius: 7px;
                border: 1px dashed black;
            }



        `}</style>
   </>
  )
}

export default Index