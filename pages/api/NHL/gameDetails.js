


//https://hockey-live-sk-data.p.rapidapi.com/game/${id}




import axios from 'axios';

async function handler(req, res) {


  const id = req.query.id; 



  const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/game/${id}`, 
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
    const game = await axios.request(options);
    res.status(200).json({
      status: "success",
      data: game.data
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;
