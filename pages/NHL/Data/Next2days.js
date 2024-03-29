/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import  logo  from '@/utils/nhlLogos'






const Index = () => {



  const nhlSchedule = useSelector(state => state.nhlSchedule.data);
  const status = useSelector(state => state.nhlSchedule.status);
  const error = useSelector(state => state.nhlSchedule.error);
  
  
let future_games = []
let total_games = nhlSchedule?.data?.games?.length;
let currentTime = new Date();
let upcomingGames = 0;
let twoDaysAgo = new Date();
twoDaysAgo.setDate(currentTime.getDate() - 2);
let twoDaysInFuture = new Date();
twoDaysInFuture.setDate(currentTime.getDate() + 2); 


for (let i = 0; i < total_games; i++) {

    let gameDayString = nhlSchedule?.data?.games[i]?.date?.date?.split('.')[0];
    let game_day = new Date(gameDayString);
   // console.log(game_day)  // Thu Apr 18 2024 22:00:00 GMT-0700

   if (game_day > currentTime && game_day <= twoDaysInFuture) {
        upcomingGames++;
        future_games.push(nhlSchedule?.data?.games[i]);
    }
}




  return (
  <>
      <h3 className='text-center my-5'>NHL Games in the Next 2 Days</h3>

       <div className="container-fluid my-5">
          <h5>Total Games: {upcomingGames}</h5>
            <div className="row justify-content-center">
               { 
                    future_games.map((game, index) => (
                        <>
                            <div key={index} className="col-5 col-md-2">
                            
                                  <div className="card my-2 px-3 py-2">
                                    <p className='text-center mb-0'> 
                                      
                                        {new Date(game?.date?.date?.split('.')[0]).toLocaleDateString("en-US", {
                                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                      </p>
                                    <hr />
                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {logo(game?.team1short)}
                                        <p className='fs-5 ms-2'>{game?.team1short}</p>
                                      </div>
                                      <p className='fs-5 fw-bold'>{game?.score?.goals1}</p>
                                    </div>

                                    <div className='d-flex w-100 justify-content-between'>
                                      <div className='d-flex'>
                                        {logo(game?.team2short)}
                                        <p className='fs-5 ms-2'>{game?.team2short}</p>
                                      </div>
                                      <p className='fs-5 fw-bold'>{game?.score?.goals2}</p>
                                    </div>
                                    
                                  </div>
                            </div>
                        
                        </>
                    ))
          
                }
            </div>
           </div>


       <Link href={'/NHL/Data/Data'}
            className='btn btn-primary vstack mx-auto my-5'
            style={{width: '200px'}}>
        back
      </Link>
  </>
  )
}

export default Index