




//   https://hockey-live-sk-data.p.rapidapi.com/player/${query}/NHL



import axios from 'axios';

async function handler(req, res) {

  const player = req.query.player; 



  const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/player/${player}/NHL`, 
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
      data: team.data
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;

