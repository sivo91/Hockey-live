/* 

import axios from 'axios';
import MostPTS from '@/modules/MostPTS';
import MostGoals from '@/modules/MostGoals';
import MostAssists from '@/modules/MostAssists';
import MostPIM from '@/modules/MostPIM';
import connectDB from "@/utils/db"




async function handler(req, res) {

  await connectDB();

  const teamQuery = [
    "NSH", "TBL", "PIT", "CHI", "VGK", "MIN", "ANA",
    "FLA", "PHI", "WSH", "ARI", "NYI", "SJS", "CGY",
    "BUF", "NYR", "CBJ", "NJD", "DET", "DAL",
    "TOR", "MTL", "BOS", "LAK", "COL", "WPG",
    "SEA", "CAR", "OTT", "EDM", "STL", "VAN"
  ];


  try {
    const teamRequests = []

    for(let i = 0; i < teamQuery.length; i++) {
       const data = axios.get(`https://www.hockey-live.sk/api/team/${teamQuery[i]}/NHL/2023`, {
        params: {
          key: process.env.API_KEY2,
          tz: 'America/New_York'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
        }
      })

      teamRequests.push(data)
    }

    const teamRes = await Promise.all(teamRequests)

    const allTeamData = teamRes.map(res => {
      if (res.data && res.data.players) {
        return res.data.players.slice(0, 2);
      }

      return []

    }).flat()


 


    // total points 
    const PTS = allTeamData.sort(( a,b ) => b.stats.points - a.stats.points )
    //console.log('all points', PTS)

    for (let i = 0; i < PTS.length; i++) {
      const playerData = {
        name: PTS[i].name,
        gp: PTS[i].stats.gp,
        assists: PTS[i].stats.asists, 
        goals: PTS[i].stats.goals,
        pts: PTS[i].stats.points,
        pim: PTS[i].stats.penalty
      }

      // find player and update
      await MostPTS.findOneAndUpdate(
        { name: playerData.name },  // Find player by name
        playerData,                 // Update player
        { upsert: true, new: true } // Options: if no player, create new one
      )
    }


    

    // most goals
    const Goals = allTeamData.sort((a, b) => b.stats.goals - a.stats.goals)

    for (let i = 0; i < Goals.length; i++) {
      const playerData = {
        name: Goals[i].name,
        gp: Goals[i].stats.gp,
        assists: Goals[i].stats.asists, 
        goals: Goals[i].stats.goals,
        pts: Goals[i].stats.points,
        pim: Goals[i].stats.penalty
      }

      // find player and update
      await MostGoals.findOneAndUpdate(
        { name: playerData.name }, 
        playerData,                
        { upsert: true, new: true } 
      )
    }

   



   

    // most assists
    const Assists = allTeamData.sort((a, b) => b.stats.asists - a.stats.asists)

    for (let i = 0; i < Assists.length; i++) {
      const playerData = {
        name: Assists[i].name,
        gp: Assists[i].stats.gp,
        assists: Assists[i].stats.asists, 
        goals: Assists[i].stats.goals,
        pts: Assists[i].stats.points,
        pim: Assists[i].stats.penalty
      }

      // find player and update
      await MostAssists.findOneAndUpdate(
        { name: playerData.name }, 
        playerData,                
        { upsert: true, new: true } 
      )
    }








    // most PIM
    const mostPIM = allTeamData.sort((a, b) => b.stats.penalty - a.stats.penalty)


    for (let i = 0; i < mostPIM.length; i++) {
      const playerData = {
        name: mostPIM[i].name,
        gp: mostPIM[i].stats.gp,
        assists: mostPIM[i].stats.asists, 
        goals: mostPIM[i].stats.goals,
        pts: mostPIM[i].stats.points,
        pim: mostPIM[i].stats.penalty
      }

      // find player and update
      await MostPIM.findOneAndUpdate(
        { name: playerData.name }, 
        playerData,                
        { upsert: true, new: true } 
      )
    }



    res.status(200).json({
      status: "success",
      data: Assists
      
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ 
      message: "Something Went Wrong",
      error: error.message
    });
  }
}

export default handler;



 */



 
   /*  
     // create and save players

     for(let i = 0; i < PTS.length; i++) {
       const player = new MostPTS({
       name: mostPIM[i].name,
        gp: mostPIM[i].stats.gp,
        assists: mostPIM[i].stats.asists, 
        goals: mostPIM[i].stats.goals,
        pts: mostPIM[i].stats.points,
        pim: mostPIM[i].stats.penalty
      });
      await player.save(); 
    } */




/* const teamRequests = teamQuery.map(team => 
      axios.get(`https://www.hockey-live.sk/api/team/${team}/NHL/2023`, {
        params: {
          key: process.env.API_KEY2,
          tz: 'America/New_York'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
        }
      })
    ); */