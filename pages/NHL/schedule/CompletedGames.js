
/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLSchedule } from '@/reduxFile/nhlScheduleSlice'
import { useRouter } from 'next/router';
import Link from 'next/link';
  import  logo  from '@/utils/nhlLogos'






const Index = () => {

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const nhlSchedule = useSelector(state => state.nhlSchedule.data);
  const status = useSelector(state => state.nhlSchedule.status);
  const error = useSelector(state => state.nhlSchedule.error);
  const router = useRouter();
  

  const teams = ['ANA', 'ARI', 'BOS', 'BUF', 'CAR', 'CBJ', 'CGY', 'CHI', 'COL', 'DAL', 'DET', 'EDM', 'FLA', 'LAK', 'MIN', 'MTL', 'NJD', 'NSH', 'NYI', 'NYR', 'OTT', 'PHI', 'PIT', 'SEA', 'SJS', 'STL', 'TBL', 'TOR', 'VAN', 'VGK', 'WPG', 'WSH']

  const [selectedTeam, setSelectedTeam] = useState('')
  const [show_specific_team, setShowSpecificTeam] = useState(false)
  const [teamOutput, setTeamOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  
   useEffect(() => {
    if (year) {
      dispatch(fetchNHLSchedule(year))
    }
  }, [year, dispatch]);

  
  if (status === 'failed') return <div>Error: {error}</div>;


  
  //console.log('schedullll', nhlSchedule?.games)


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

  //console.log(finished_games) 
  

 // all played games
  const show_all_played_games = () => {
    return finished_games.map((game, index) => (
                  <>
                      <div key={index} className="col-5 col-md-2">
                        {/* Content for each game */}
                        <Link href={`/NHL/schedule/${game?.id}`}
                              style={{textDecoration: 'none'}}>
                            <div className="card my-2 px-3 py-2">
                              <h5 className='card-title text-center'>Game # {index + 1}</h5>
                              <p className='text-center mb-0'> 
                                  {/* get date */}
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
                        </Link>
                      </div>
                  
                  </>
               ))
  }


// select team
 const handleSelectTeam = (e) => {
    setSelectedTeam(e.target.value)
    setShowSpecificTeam(true)
    showTeams(e.target.value)
 }





 // filter all played teams and show only specific_team
 const showTeams = (param) => {
  let specific_team = []
  setIsLoading(true)
 
    for(let i = 0; i < finished_games?.length; i++) {
      let team = finished_games[i]
      
      if(team?.team1short === param || team?.team2short === param) {
        specific_team.push(team)
      }
    }

     const output = specific_team.map((game, index) => (
                  <>
                      <div key={index} className="col-5 col-md-2">
                        {/* Content for each game */}
                        <Link href={`/NHL/schedule/${game?.id}`}
                              style={{textDecoration: 'none'}}>
                            <div className="card my-2 px-3 py-2">
                              <h5 className='card-title text-center'>Game # {index + 1}</h5>
                              <p className='text-center mb-0'> 
                                  {/* get date */}
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
                        </Link>
                      </div>
                  
                  </>

          

        ))

        setTeamOutput(output);
        setIsLoading(false)
 }



  return (
    <>
      <h3 className='text-center my-5'>Completed NHL Games</h3>


      {/* select team */}
      <div className="container-fluid">
        <div className="row justify-content-center">
         <div className="col-12 col-md-6">
            {/* when year react month august , we create new seasson  */}
              <select className="form-select form-select-lg  my-3"
                        value={selectedTeam} onChange={handleSelectTeam}
                        style={{width: '300px', margin: '0 auto'}} 
                        aria-label="Large">
                    <option>Select Team</option>
                    {
                      teams.map((team, idx) => (
                        <>
                           <option value={team} key={idx}>{team}</option>
                         </>
                      ))
                    }
              </select>
        </div>
      </div>
      </div>


      <div className="container my-5">
      <div className="row justify-content-center">


        {
          !show_specific_team && (
            <>
              {

                show_all_played_games()
              }
            </>
          )
        }


     
                {
                  isLoading  ? (
                       <div className="spinner-grow text-primary mx-auto mt-3" role="status">
                      </div>
                  ) :
                  (
                    <>
                     <h5 className='text-center'>Total {selectedTeam} games: {teamOutput?.length}</h5>
                     {show_specific_team && teamOutput}
                    </>
                  )
                }
        

        
      </div>
    </div>


      <Link href={'/'}
            className='btn btn-primary vstack mx-auto'
            style={{width: '200px'}}>
        back
      </Link>


      <style>{`
        
        .card:hover {
          box-shadow: 1px 1px 15px #cccccc;
          position: relative;
          top: -5px;
        }
      
      `}</style>
    </>
  )
}

export default Index