


/* eslint-disable @next/next/no-img-element */
import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLSchedule } from '@/reduxFile/nhlScheduleSlice'
import Link from 'next/link';





const Index = () => {

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const nhlSchedule = useSelector(state => state.nhlSchedule.data);
  const status = useSelector(state => state.nhlSchedule.status);
  const error = useSelector(state => state.nhlSchedule.error);

  

  

   useEffect(() => {
    if (year) {
      dispatch(fetchNHLSchedule(year))
    }
  }, [year, dispatch]);

  
  if (status === 'failed') return <div>Error: {error}</div>;



//console.log(nhlSchedule?.games)
//console.log(nhlSchedule.games.length); // 1320


let total_games = nhlSchedule?.data?.games?.length;
let currentTime = new Date();
let games_played = 0;
let waiting_for_game = 0;
let recentGames = 0;
let upcomingGames = 0;
let twoDaysAgo = new Date();
twoDaysAgo.setDate(currentTime.getDate() - 2);
let twoDaysInFuture = new Date();
twoDaysInFuture.setDate(currentTime.getDate() + 2); 


for (let i = 0; i < total_games; i++) {

    let gameDayString = nhlSchedule?.data?.games[i]?.date?.date?.split('.')[0];
    let game_day = new Date(gameDayString);
   // console.log(game_day)  // Thu Apr 18 2024 22:00:00 GMT-0700


    if (game_day < currentTime) {
        games_played++;
    } else if (game_day > currentTime) {
        waiting_for_game++;
    }

    //  last 2 days games
    if (game_day >= twoDaysAgo && game_day < currentTime) {
        recentGames++;
    }
    // next 2 days games
    else if (game_day > currentTime && game_day <= twoDaysInFuture) {
        upcomingGames++;
    }
}





  return (

   <> 
      <h3 className='text-center my-5'>NHL | Schedule {year}/{Number(year)+1}</h3>


     <div className="container-fluid">
       <div className="row d-flex justify-content-evenly">

            <div className="col-11 col-md-5 mt-3">
                <div className="card">
                  <div className="card-header fw-semibold fs-5 text-center">
                    Completed NHL Games
                  </div>
                  <div className="card-body">
                    {
                      status === 'loading' ? (
                            <div className='text-center my-2'>
                                <div className="spinner-grow text-primary" role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                          <p className="card-text fs-3 fw-semibold text-center">{games_played}</p>
                      )
                    }
                   
                    <Link href={'/NHL/Schedule/gameDetail/CompletedGames'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
            </div>

            <div className="col-11 col-md-5 mt-3">
                <div className="card">
                  <div className="card-header fw-semibold fs-5 text-center">
                    Upcoming NHL Games
                  </div>
                  <div className="card-body">
                     {
                      status === 'loading' ? (
                            <div className='text-center my-2'>
                                <div className="spinner-grow text-primary" role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                          <p className="card-text fs-3 fw-semibold text-center">{waiting_for_game}</p>
                      )
                    }
                    <Link href={'/NHL/Schedule/Upcoming'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
            </div>
 
      </div> 



      <div className="row d-flex justify-content-evenly mt-3">

          <div className="col-11 col-md-5 mt-3">
                <div className="card">
                  <div className="card-header fw-semibold fs-5 text-center">
                    NHL Games in the Last 2 Days
                  </div>
                  <div className="card-body">
                     {
                      status === 'loading' ? (
                            <div className='text-center my-2'>
                                <div className="spinner-grow text-primary" role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                          <p className="card-text fs-3 fw-semibold text-center">{recentGames}</p>
                      )
                    }
                    <Link href={'/NHL/Schedule/Last2days'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
           </div>

          <div className="col-11 col-md-5 mt-3">
                <div className="card">
                  <div className="card-header fw-semibold fs-5 text-center">
                    NHL Games in the Next 2 Days
                  </div>
                  <div className="card-body">
                    {
                      status === 'loading' ? (
                            <div className='text-center my-2'>
                                <div className="spinner-grow text-primary" role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                          <p className="card-text fs-3 fw-semibold text-center">{upcomingGames}</p>
                      )
                    }
                    <Link href={'/NHL/Schedule/Next2days'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
           </div>

      </div> 


      <div className="row d-flex justify-content-evenly mt-3">

          <div className="col-11 col-md-5 mt-3 mb-5">
                <div className="card">
                  <div className="card-header fw-semibold fs-5 text-center">
                    Total NHL Games ({Number(year)}/{Number(year)+1})
                  </div>
                  <div className="card-body">
                    <p className="card-text fs-3 fw-semibold text-center">{nhlSchedule?.data?.games?.length}</p>
                  </div>
                </div>
           </div>

     

      </div> 

     </div>


    <style>{`
  
    `}</style>
   </>
  )
}

export default Index