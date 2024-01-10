


import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'


const Index = () => {


const [query, setQuery] = useState('');
console.log(query)

const [gameData, setGameData] = useState(null)
console.log(gameData)


 const fetchGameData = useCallback(async ()=> {
  
 const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/player/${query}/NHL`,
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
  }, [query]);  // Dependencies array


  useEffect(() => {
    
    if(query.length === 0 || query.length > 4) fetchGameData();
   
  }, [fetchGameData, query]);

  





  
  return (
   <>
     <h3 className='text-center my-5'>Player Search</h3>

       {/* search */}
       <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-11 col-md-4">
          
              <div className='d-flex'>
                <input type="text" 
                className="form-control" 
                id="input" 
                value={query}
                onChange={e => setQuery(e.target.value.toUpperCase())}
                placeholder="Jagr Jaromir"/>
                <button className='btn btn-outline-dark rounded-0 '
                        onClick={() => setQuery('')}>
                  X
                </button>
              </div>
        </div>
        </div>
       </div>


     <Link href={'/'}
           style={{textDecoration: 'none', width: '200px'}}
           className='btn btn-primary rounded-1 vstack mx-auto'>
       Back
     </Link>
   </>
  )
}

export default Index