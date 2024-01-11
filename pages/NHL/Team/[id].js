



import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'




const Index = () => {

  const router = useRouter()
  const { id } = router.query

  

const [gameData, setGameData] = useState(null)
console.log(gameData)



 const fetchGameData = useCallback(async ()=> {
  
 const options = {
    method: 'GET',
    url: `https://www.hockey-live.sk/api/team/MTL/NHL/2023`,
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
        console.error('An error occurred:', error);
    }
  }, []); 


  useEffect(() => {
       fetchGameData();
  }, [fetchGameData]);


  return (
    <>
      <h3 className='text-center my-5'>Single Team</h3>

      <h3 className='text-center my-5'>idddd : {id}</h3>
    </>
  )
}

export default Index