



import axios from 'axios';
import { useEffect, useState, useCallback, useMemo } from 'react';

const Index = () => {
  const [allTopPlayers, setAllTopPlayers] = useState([]);
  const [topGoals, setTopGoals] = useState([])
  const [topAssists, setTopAssists] = useState([])
  const [mostPIM, setMostPIM] = useState([])
  const [load, setLoad] = useState(false)
  const [club, setClub] = useState()

   


  // >>>>>>>>>>>>>> MISSING DEPENDENCY

  // List of teams to query
  /* const teamQuery = [
  "NSH", "TBL", "PIT", "CHI", "VGK", "MIN", "ANA",
  "FLA", "PHI", "WSH", "ARI", "NYI", "SJS", "CGY",
  "BUF", "NYR", "CBJ", "NJD", "DET", "DAL",
  "TOR", "MTL", "BOS", "LAK", "COL", "WPG",
  "SEA", "CAR", "OTT", "EDM", "STL", "VAN"
]; 




const fetchAllTeamsData = async () => {
  const topPlayers = [];

  for (const team of teamQuery) {
    setLoad(true)
    setClub(team)
    const teamData = await fetchTeamData(team);
    if (teamData && teamData.players) {
    
      const sortedPlayers = teamData.players.sort((a, b) => b.stats.points - a.stats.points);
      
      const teamTopPlayers = sortedPlayers.slice(0, 2); 

      topPlayers.push(...teamTopPlayers);
    }
  }
    const sortedTopPlayers = topPlayers.sort((a, b) => b.stats.points - a.stats.points);
    setAllTopPlayers(sortedTopPlayers);

    const sortedTopGoals = topPlayers.sort((a,b) => b.stats.goals - a.stats.goals)
    setTopGoals(sortedTopGoals)

    const sortedTopAssists = topPlayers.sort((a,b) => b.stats.asists - a.stats.asists)
    setTopAssists(sortedTopAssists)

    const sortedMostPIM = topPlayers.sort((a,b) => b.stats.penalty - a.stats.penalty)
    setMostPIM(sortedMostPIM)

    setLoad(false);
};

  useEffect(() => {
    fetchAllTeamsData();
  }, []);  */















// >>>>>>>>>>>>> API CALL TWICE !!!!!!!!!


const teamQuery = useMemo(() => {
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
  




  
/* 

const teamQuery = [
  "NSH", "TBL", "PIT", "CHI", "VGK", "MIN", "ANA",
  "FLA", "PHI", "WSH", "ARI", "NYI", "SJS", "CGY",
  "BUF", "NYR", "CBJ", "NJD", "DET", "DAL",
  "TOR", "MTL", "BOS", "LAK", "COL", "WPG",
  "SEA", "CAR", "OTT", "EDM", "STL", "VAN"
];



  useEffect(() => {

    
 const fetchTeamData = async (team) => {
  
    try {
      const queryParam = encodeURIComponent(team);
      const res = await axios.get(`/api/NHL/findTeam?team=${queryParam}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

    const fetchAllTeamsData = async () => {
      setLoad(true);
      const topPlayers = [];
      console.log('first')
      for (const team of teamQuery) {
        setClub(team);
        const teamData = await fetchTeamData(team);

        if (teamData && teamData.players) {
          const sortedPlayers = teamData.players.sort((a, b) => b.stats.points - a.stats.points);
          const teamTopPlayers = sortedPlayers.slice(0, 2);
          topPlayers.push(...teamTopPlayers);
        }
      }

      // Process and set the state for each category
      setAllTopPlayers(topPlayers.sort((a, b) => b.stats.points - a.stats.points));
      setTopGoals([...topPlayers].sort((a, b) => b.stats.goals - a.stats.goals));
      setTopAssists([...topPlayers].sort((a, b) => b.stats.asists - a.stats.asists));
      setMostPIM([...topPlayers].sort((a, b) => b.stats.penalty - a.stats.penalty));

      setLoad(false);
    };

    fetchAllTeamsData();
  }, []);
 */





  return (

    <>
      
       <h3 className='text-center my-5'>Players Statistics</h3>

       {
        load && <p className='text-center'> Looking for the best players  
                   <span className='fw-semibold ms-2'>
                      {club}
                   </span>
                </p>
       }



      {
        !load && (
          <>
           <div className="row justify-content-center">
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
                          <td>{player.stats.gp}</td>
                          <td>{player.stats.goals}</td>
                          <td>{player.stats.asists}</td>
                          <td className='bg-info-subtle'>{player.stats.points}</td>
                          <td>{player.stats.penalty}</td>
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
                          <td>{player.stats.gp}</td>
                          <td className='bg-info-subtle'>{player.stats.goals}</td>
                          <td>{player.stats.asists}</td>
                          <td >{player.stats.points}</td>
                          <td>{player.stats.penalty}</td>
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
                    <tbody className='text-center'>
                      { topAssists.slice(0,10).map( (player, idx) => (
                        <tr key={player.idx}>
                          <td>{idx+1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.stats.gp}</td>
                          <td>{player.stats.goals}</td>
                          <td className='bg-info-subtle'>{player.stats.asists}</td>
                          <td >{player.stats.points}</td>
                          <td>{player.stats.penalty}</td>
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
                          <td>{idx +1}</td>
                          <td className='text-start ps-1'>{player.name}</td>
                          <td>{player.stats.gp}</td>
                          <td>{player.stats.goals}</td>
                          <td>{player.stats.asists}</td>
                          <td >{player.stats.points}</td>
                          <td className='bg-info-subtle'>{player.stats.penalty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>


           </div>
          </>
        )
      }



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