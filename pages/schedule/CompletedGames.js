
/* eslint-disable @next/next/no-img-element */
import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLSchedule } from '@/reduxFile/nhlScheduleSlice'
import { useRouter } from 'next/router';
import Link from 'next/link';






const Index = () => {

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const nhlSchedule = useSelector(state => state.nhlSchedule.data);
  const status = useSelector(state => state.nhlSchedule.status);
  const error = useSelector(state => state.nhlSchedule.error);
  const router = useRouter();

  
   useEffect(() => {
    if (year) {
      dispatch(fetchNHLSchedule(year))
    }
  }, [year, dispatch]);

  
  if (status === 'failed') return <div>Error: {error}</div>;


  
  console.log('schedullll', nhlSchedule?.games)


  let finished_games = []
  let currentTime = new Date();
  let total_games = nhlSchedule?.games?.length || 0


  for(let i = 0; i < total_games; i++) {
   // console.log(nhlSchedule?.games[i]?.date)

   let gameDayString = nhlSchedule?.games[i]?.date?.date?.split('.')[0];
    let game_day = new Date(gameDayString);

  if(game_day < currentTime) {
     finished_games.push(nhlSchedule?.games[i]);
    } 
  }

  //console.log(finished_games) ok





  return (
    <>
      <h3 className='text-center my-5'>Completed NHL Games</h3>

      <div className="container my-5">
      <div className="row justify-content-center">
        {finished_games.map((game, index) => (
          <div key={index} className="col-5 col-md-2">
            {/* Content for each game */}
            <div className="card my-2 px-3 py-2">
              <h5 className='card-title text-center'>Game # {index + 1}</h5>
              <hr />
              <div className='d-flex w-100 justify-content-between'>
                <p className='fs-5'>{game?.team1short}</p>
                <p className='fs-5'>{game?.score?.goals1}</p>
              </div>

              <div className='d-flex w-100 justify-content-between'>
                <p className='fs-5'>{game?.team2short}</p>
                <p className='fs-5'>{game?.score?.goals2}</p>
              </div>
              
              
             
            </div>
          </div>
        ))}
      </div>
    </div>


      <Link href={'/'}
            className='btn btn-primary vstack mx-auto'
            style={{width: '200px'}}>
        back
      </Link>
    </>
  )
}

export default Index