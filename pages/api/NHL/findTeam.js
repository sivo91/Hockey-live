



import axios from 'axios';

async function handler(req, res) {
  const team = req.query.team; // Correctly expecting 'team' as the query parameter



  const options = {
    method: 'GET',
    url: `https://www.hockey-live.sk/api/team/${team}/NHL/2023`, 
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
    res.status(200).json({
      status: "success",
      // return teams and players data
      //data: team.data,

      // return only players data
      data: team.data.players
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;

