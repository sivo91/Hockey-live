import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'


const Index = () => {



  

const [gameData, setGameData] = useState(null)
console.log(gameData)


 const fetchGameData = useCallback(async ()=> {
  
 const options = {
    method: 'GET',
    //url: `https://hockey-live-sk-data.p.rapidapi.com/games/NHL/2023`,
    url: `https://hockey-live-sk-data.p.rapidapi.com/player/EICHEL%20Jack/NHL`,
    params: {
      key: process.env.NEXT_PUBLIC_API_KEY2,
      tz: 'America/New_York'
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
    }
  };

    try {
      const res = await axios.request(options);
      setGameData(res.data)
    } catch (error) {
      
      console.log(error)
    }
  }, []);  // Dependencies array


  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  //console.log(gameData)





  
  return (
   <>
     <h3 className='text-center my-5'>Search for Team</h3>


     
     <Link href={'/'}
           style={{textDecoration: 'none', width: '200px'}}
           className='btn btn-primary rounded-1 vstack mx-auto'>
       Back
     </Link>
   </>
  )
}

export default Index