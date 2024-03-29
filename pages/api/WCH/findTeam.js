



import axios from 'axios';

async function handler(req, res) {
  const team = req.query.team; 
  const year = req.query.year
  console.log(team, year)
 
  let y = Number(year) + 1

  console.log('yearrrrr',typeof year)



  const options = {
    method: 'GET',
    url: `https://www.hockey-live.sk/api/team/${team}/WCH/${y}`, 
    params: {
      key: process.env.API_KEY2,
      tz: 'America/New_York'
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
    }
  };

  try {
    const team = await axios.request(options);
    console.log(team)

    res.status(200).json({
      status: "success",
      // return teams and players data
      //data: team.data,

      // return only players data
      data: team.data.players,
      data2: team.data
    
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;
