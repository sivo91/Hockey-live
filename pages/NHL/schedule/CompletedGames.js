
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


 
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  

  
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
    return currentItems.map((game, index) => (
                  <>
                      <div key={index} className="col-5 col-md-2">
                        {/* Content for each game */}
                        <Link href={`/NHL/schedule/${game?.id}`}
                              style={{textDecoration: 'none'}}>
                            <div className="card my-2 px-3 py-2">
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



 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = finished_games.slice(indexOfFirstItem, indexOfLastItem);



  const totalPages = Math.ceil(finished_games.length / itemsPerPage);



const renderPagination = () => {
  let pageNumbers = [];
  const pageNeighbours = 1;
  const totalBlocks = pageNeighbours * 2 + 3;

  // Previous Button
  pageNumbers.push(
    <li key="prev" className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <span className="page-link" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} style={{ cursor: "pointer" }}>
        Prev
      </span>
    </li>
  );

  const startPage = Math.max(2, currentPage - pageNeighbours);
  const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

  if (totalPages > totalBlocks) {
    if (startPage > 2) {
      pageNumbers.push(
        // First Page
        <li key="start" className="page-item">
          <span className="page-link" onClick={() => setCurrentPage(1)} style={{ cursor: "pointer" }}>
            1
          </span>
        </li>
      );
      pageNumbers.push(<li key="ellipsis1" className="page-item"><span className="page-link">...</span></li>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <span className="page-link" onClick={() => setCurrentPage(i)} style={{ cursor: "pointer" }}>
            {i}
          </span>
        </li>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(<li key="ellipsis2" className="page-item"><span className="page-link">...</span></li>);
      pageNumbers.push(
        // Last Page
        <li key="end" className="page-item">
          <span className="page-link" onClick={() => setCurrentPage(totalPages)} style={{ cursor: "pointer" }}>
            {totalPages}
          </span>
        </li>
      );
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <span className="page-link" onClick={() => setCurrentPage(i)} style={{ cursor: "pointer" }}>
            {i}
          </span>
        </li>
      );
    }
  }

  // Next Button
  pageNumbers.push(
    <li key="next" className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <span className="page-link" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} style={{ cursor: "pointer" }}>
        Next
      </span>
    </li>
  );

  return pageNumbers;
};





  return (
    <>
      <h3 className='text-center my-5'>Completed NHL Games</h3>

     
     
      {/* select specific team */}
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

      
      {/* display games */}
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
              <h5 className='text-center mb-5'>Total {selectedTeam} games: {teamOutput?.length}</h5>
              {show_specific_team && teamOutput}
            </>
          )
        }
        

        
      </div>
      </div>


    {/* pagination */}
     { !show_specific_team &&
       <div className='container-fluid my-5'>
        <div className="row justify-content-center"> 
          <div className="col-10 col-md-6">
            <nav aria-label="Page navigation" className="d-flex justify-content-center"> 
              <ul className="pagination pagination-sm">
                {renderPagination()}
              </ul>
            </nav>
          </div>
        </div>
      </div>
     }



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