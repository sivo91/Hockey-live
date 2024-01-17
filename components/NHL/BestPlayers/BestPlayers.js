



import axios from 'axios';
import { useEffect, useState, useCallback, useMemo } from 'react';


const Index = () => {
  const [allTopPlayers, setAllTopPlayers] = useState([]);
  const [topGoals, setTopGoals] = useState([])
  const [topAssists, setTopAssists] = useState([])
  const [mostPIM, setMostPIM] = useState([])
  const [load, setLoad] = useState(false)
  

 
  useEffect(() => {
    
    const bestPlayers = async () => {
      try {

      setLoad(true)  

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
        // call data from mongo. 
        const res = await axios.get('/api/NHL/playersStats', config)
       // console.log(res.data)
        
        if(res.data) {
          setAllTopPlayers(res.data.data.mostPTS)
          setTopGoals(res.data.data.mostGoals)
          setTopAssists(res.data.data.mostAssists)
          setMostPIM(res.data.data.mostPIM)
        } 

         setLoad(false)
      } catch (error) {
        console.log(error)
        setLoad(false)
      }
    }

    bestPlayers()

  }, [])



  // least PIM / top 10 players
  const leastPIM = allTopPlayers.slice(0,10)
  const leastPenalty = leastPIM.sort((a,b) => a.pim - b.pim)






 

/* const teamQuery = useMemo(() => {
    return [
      "NSH", "TBL", "PIT", "CHI", "VGK", "MIN", "ANA",
      "FLA", "PHI", "WSH", "ARI", "NYI", "SJS", "CGY",
      "BUF", "NYR", "CBJ", "NJD", "DET", "DAL",
      "TOR", "MTL", "BOS", "LAK", "COL", "WPG",
      "SEA", "CAR", "OTT", "EDM", "STL", "VAN"
    ];
  }, []);

  const fetchTeamData = async (teamQuery) => {
    try {
      const queryParam = encodeURIComponent(teamQuery);
      const res = await axios.get(`/api/NHL/findTeam?team=${queryParam}`);
      console.log(res.data.data)
      return res.data.data; 
    } catch (error) {
      console.error(error);
      return null; 
    }
  };


  
const fetchAllTeamsData = useCallback(async () => {
    setLoad(true);
    const topPlayers = [];

    for (const team of teamQuery) {

      setClub(team);
      const teamData = await fetchTeamData(team);

      if (teamData && teamData) {
        const sortedPlayers = teamData.sort((a, b) => b.stats.points - a.stats.points);
        const teamTopPlayers = sortedPlayers.slice(0, 2);
        topPlayers.push(...teamTopPlayers);
      }
    }

    // sort players 
    const sortedTopPlayers = topPlayers.sort((a, b) => b.stats.points - a.stats.points);
    setAllTopPlayers(sortedTopPlayers);

    const sortedTopGoals = [...topPlayers].sort((a, b) => b.stats.goals - a.stats.goals);
    setTopGoals(sortedTopGoals);

    const sortedTopAssists = [...topPlayers].sort((a, b) => b.stats.asists - a.stats.asists);
    setTopAssists(sortedTopAssists);

    const sortedMostPIM = [...topPlayers].sort((a, b) => b.stats.penalty - a.stats.penalty);
    setMostPIM(sortedMostPIM);

    setLoad(false);
  }, [teamQuery]);

  useEffect(() => {
    fetchAllTeamsData();
  }, [fetchAllTeamsData]); 
   */




  return (

    <>
      
       <h3 className='text-center my-5'>Players Statistics</h3>

       {
        load &&   <div className='text-center my-5'>
                        <div className="spinner-grow" style={{color:'#48d1db'}} role="status">
                        </div>
                 </div>
       }



      {
        !load && (
          <>
           <div className="row justify-content-center ">
            {/* most points */}
              <div className="col-11 col-md-5 mt-2">
                <h4>Points</h4>
                <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th>G</th>
                        <th>A</th>
                        <th className='bg-info-subtle'>PTS</th>
                        <th>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                       { allTopPlayers.slice(0,10).map( (player, idx) => (
                        <tr key={player.idx}>
                          <td>{idx+1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td>{player.goals}</td>
                          <td>{player.assists}</td>
                          <td className='bg-info-subtle'>{player.pts}</td>
                          <td>{player.pim}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>

            {/* most goals */}
              <div className="col-11 col-md-5 mt-2">
                <h4>Goals</h4>
                <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th className='bg-info-subtle'>G</th>
                        <th>A</th>
                        <th >PTS</th>
                        <th>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                     { topGoals.slice(0,10).map( (player, idx) => (
                        <tr key={player.idx}>
                          <td>{idx+1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td className='bg-info-subtle'>{player.goals}</td>
                          <td>{player.assists}</td>
                          <td >{player.pts}</td>
                          <td>{player.pim}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>


           </div>


           <div className="row justify-content-center mt-2">
            

            {/* most apples */}
              <div className="col-11 col-md-5 mt-2">
                <h4>Assists</h4>
                <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th >G</th>
                        <th className='bg-info-subtle'>A</th>
                        <th >PTS</th>
                        <th>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center scrollable-tbody'>
                      { topAssists.slice(0,10).map( (player, idx) => (
                        <tr key={player.idx}>
                          <td>{idx+1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td>{player.goals}</td>
                          <td className='bg-info-subtle'>{player.assists}</td>
                          <td >{player.pts}</td>
                          <td>{player.pim}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>


              {/* most PIM */}
              <div className="col-11 col-md-5 mt-2">
                <h4>Leaders with the most PIM </h4>
                    <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th>G</th>
                        <th>A</th>
                        <th >PTS</th>
                        <th className='bg-info-subtle'>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      { mostPIM.slice(0,10).map( (player,idx) => (
                        <tr key={player.idx}>
                          <td>{idx + 1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td>{player.goals}</td>
                          <td>{player.assists}</td>
                          <td >{player.pts}</td>
                          <td className='bg-info-subtle'>{player.pim}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>


           </div>

           <div className="row justify-content-center mt-2">
            

            {/* most apples */}
              <div className="col-11 col-md-5 mt-2">
                <h4>Leaders with the Least PIM</h4>
                <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th >G</th>
                        <th >A</th>
                        <th >PTS</th>
                        <th className='bg-info-subtle'>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center scrollable-tbody'>
                      { leastPenalty.map( (player, idx) => (
                        <tr key={player.idx}>
                          <td>{idx+1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td>{player.goals}</td>
                          <td >{player.assists}</td>
                          <td >{player.pts}</td>
                          <td className={idx === 0 ?
                                'bg-danger-subtle' :
                                 'bg-info-subtle'}>
                                  {player.pim}
                         </td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>


              {/* most PIM */}
             {/*  <div className="col-11 col-md-5 mt-2">
                <h4>Leaders with the most PIM </h4>
                    <table>
                    <thead>
                      <tr className='border-bottom text-center'>
                        <th>#</th>
                        <th className='text-start'>Name</th>
                        <th>GP</th>
                        <th>G</th>
                        <th>A</th>
                        <th >PTS</th>
                        <th className='bg-info-subtle'>PIM</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      { mostPIM.slice(0,10).map( (player,idx) => (
                        <tr key={player.idx}>
                          <td>{idx + 1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.gp}</td>
                          <td>{player.goals}</td>
                          <td>{player.assists}</td>
                          <td >{player.pts}</td>
                          <td className='bg-info-subtle'>{player.pim}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div> */}


           </div>
          </>
        )
      }

      <br /><br />



  <style>{`
       
        .cursor {
          cursor: pointer;
        }

         .table-container {
              overflow-x: auto;
            }

            table {
            width: 100%;
            border-collapse: collapse; 
          }

            th, td {
              border: 1px solid black;
            }

           .scrollable-table {
                width: 100%;
                height: 100px; /* Set your desired height */
                overflow-y: auto;
            }

            .scrollable-table table {
                width: 100%;
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

};


export default Index