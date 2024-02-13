

/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import  logo  from '@/utils/nhlLogos'






const Index = () => {



  const nhlSchedule = useSelector(state => state.nhlSchedule.data);
  const status = useSelector(state => state.nhlSchedule.status);
  const error = useSelector(state => state.nhlSchedule.error);



  let upcoming_games = []
  let currentTime = new Date();
  let total_games = nhlSchedule?.data?.games?.length || 0



  for(let i = 0; i < total_games; i++) {
   // console.log(nhlSchedule?.games[i]?.date)

   let gameDayString = nhlSchedule?.data?.games[i]?.date?.date?.split('.')[0];
    let game_day = new Date(gameDayString);

  if(game_day > currentTime ) {
     upcoming_games.push(nhlSchedule?.data?.games[i]);
    } 
  }


  //console.log(upcoming_games.slice(0, 50))



  return (
    <>
       <h3 className='text-center my-5'>Upcoming 30 NHL Games</h3>


        
           <div className="container-fluid">
            <div className="row justify-content-center">
               { 
                    upcoming_games.slice(0,30).map((game, index) => (
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


       <Link href={'/NHL/Schedule/Index'}
            className='btn btn-primary vstack mx-auto'
            style={{width: '200px'}}>
        back
      </Link>
    </>
  )
}

export default Index