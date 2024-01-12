



import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'




const Index = () => {

  const router = useRouter()
  const { id } = router.query

/* const [data, setData] = useState()
 const fetchGameData = useCallback(async ()=> {
  
      try {
        const res = await axios.get(`/api/NHL/Leaders`);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }

}, []);


  useEffect(() => {
    fetchGameData();
   
    const intervalId = setInterval(fetchGameData, 5000000);

    return () => clearInterval(intervalId);
  }, [fetchGameData]); */



  return (
    <>
      <h3 className='text-center my-5'>Single Team</h3>

      <h3 className='text-center my-5'>idddd : {id}</h3>
    </>
  )
}

export default Index