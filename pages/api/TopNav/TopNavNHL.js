





import axios from 'axios';

async function handler(req, res) {


  const options = {
    method: 'GET',
    // MS 20 , yr 2024
    url: `https://hockey-live-sk-data.p.rapidapi.com/games/WJC/2024`, 
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