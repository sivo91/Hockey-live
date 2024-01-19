

/* 

import axios from 'axios';

async function handler(req, res) {

const year = req.query.year;

  const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/games/WCH/${year}`, 
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
    const ms = await axios.request(options);
    //console.log(ms.data.games)

    let Teams = ms.data.games

    let groupA = []
    let groupB = []

    // sort groups 
    for(let i = 0; i < Teams.length; i++) {

       if(Teams[i].group === 'A') {
        groupA.push(Teams[i])
       } else if( Teams[i].group === 'B') {
        groupB.push(Teams[i])
       }
    }

  //  console.log('skupina A ', groupA)
   // console.log('******************')
   // console.log('skupina B ', groupB) 

    const groups = { groupA, groupB}

    res.status(200).json({
      status: "success",
      data : groups
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;


 */





import axios from 'axios';

async function handler(req, res) {

const year = req.query.year;
const x = Number(year) + 1
let y = x.toString()


  const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/table/WCH/${y}`, 
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
    const ms = await axios.request(options);
    console.log(ms.data)


    res.status(200).json({
      status: "success",
      data : ms.data
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something Went Wrong" 
    });
  }
}

export default handler;