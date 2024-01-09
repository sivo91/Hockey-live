


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


let total_games = nhlSchedule?.games?.length;
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

    let gameDayString = nhlSchedule?.games[i]?.date?.date?.split('.')[0];
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


/* console.log('Played: ', games_played);
console.log('Scheduled: ', waiting_for_game); 
console.log('Games in the last 2 days: ', recentGames);
console.log('Games in the next 2 days: ', upcomingGames); */


  return (

   <> 
      <h3 className='text-center my-5'>Schedule</h3>

      <div className="row d-flex justify-content-evenly">

            <div className="col-11 col-md-5 mt-3">
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    Completed NHL Games
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center">{games_played}</p>
                    <Link href={'/NHL/schedule/CompletedGames'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
            </div>

            <div className="col-11 col-md-5 mt-3">
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    Upcoming NHL Games
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center">{waiting_for_game}</p>
                    <Link href={'#'}
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
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    NHL Games in the Last 2 Days
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center">{recentGames}</p>
                    <Link href={'#'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
           </div>

          <div className="col-11 col-md-5 mt-3">
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    NHL Games in the Next 2 Days
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center">{upcomingGames}</p>
                    <Link href={'#'}
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
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    Total NHL Games
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center">{nhlSchedule?.games?.length}</p>
                    <Link href={'#'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
           </div>

         {/*  <div className="col-11 col-md-5 mt-3">
                <div class="card">
                  <div class="card-header fw-semibold fs-5 text-center">
                    Upcoming games in 2 days
                  </div>
                  <div class="card-body">
                    <p class="card-text fs-3 fw-semibold text-center"></p>
                    <Link href={'/'}
                          style={{width: '120px', textDecoration: 'none'}}
                          className='btn btn-primary vstack mx-auto'>
                        Visit
                    </Link>
                  </div>
                </div>
           </div> */}

      </div> 



        

    <style>{`
  
    `}</style>
   </>
  )
}

export default Index