/* eslint-disable @next/next/no-img-element */



import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { AiOutlineClose } from "react-icons/ai";
import Bio from '@/pages/NHL/Search/SearchPlayerTabs/Bio'
import League from '@/pages/NHL/Search/SearchPlayerTabs/League'
import Note from '@/pages/NHL/Search/SearchPlayerTabs/Note'
import OverAll from '@/pages/NHL/Search/SearchPlayerTabs/OverAll'


const Index = () => {


const [query, setQuery] = useState('');
const [load, setLoad] = useState(false)
const [activeTab, setActiveTab] = useState('bio');
const [err, setErr] = useState()
const [playerData, setPlayerData] = useState(null)

/* 

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
      setLoad(true)
      const res = await axios.request(options);
      setPlayerData(res.data)
      setLoad(false)
    } catch (error) {
        console.error('An error occurred:', error);
        setErr(error); 
        setLoad(false);
    }
  }, [query]);  


  useEffect(() => {
    
    if(query.length === 0 || query.length > 5 ) fetchGameData();
   
  }, [fetchGameData, query]); */

  
 const fetchGameData = useCallback(async () => {
  
  try {
    const queryParam = encodeURIComponent(query);
    const res = await axios.get(`/api/NHL/searchPlayer?player=${queryParam}`); 
    setPlayerData(res.data.data);
  } catch (error) {
    console.log(error);
  }
}, [query]);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);

  

 const handleClear = () => {
  setQuery('')
  setPlayerData(null)
 }


const handleTab = (e) => {
    e.preventDefault();
    setActiveTab(e.target.getAttribute('value'));
  };

  const getTabClassName = (tabValue) => {
    return `nav-link ${activeTab === tabValue ? 'active' : ''}`;
  };

  
  return (
   <>
     <h3 className='text-center my-5'>Player Search</h3>

       {/* search */}
      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-11 col-md-4">
          
              <div className='d-flex'>
                <input type="text" 
                className="form-control rounded-0" 
                id="input" 
                value={query}
                onChange={e => setQuery(e.target.value.toUpperCase())}
                placeholder="Jagr Jaromir"/>
                <button className='btn btn-outline-dark rounded-0 '
                        onClick={handleClear}>
                  <AiOutlineClose/>
                </button>
              </div>
          </div>
        </div>
       </div> 

      
       {
          load === true && (
            <>
               <div className='text-center my-5'>
                    <div className="spinner-grow text-primary  mx-auto mt-3" role="status">
                  </div>
              </div>
            </>
          ) 
       }

       {
         playerData && (
            <>
                <div className="container-fluid my-5">
              
                    <h5 className="card-title text-center">{playerData.name}</h5>
                        
                    <div className="row justify-content-center">
                       <div className="col-10 col-md-2 mt-3">
                        <div className="card" >
                            <img src="../../player.png" className="card-img-top" alt="img"/>
                          </div>
                       </div>

                       <div className="col-10 col-md-7 justify-content-center mt-3">

                              <div className="card text-center">
                                <div className="card-header">
                                  <ul className="nav nav-tabs card-header-tabs">
                                  <li className="nav-item text">
                                    <a className={getTabClassName('bio')} 
                                       value='bio' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>Bio</a>
                                  </li>

                                  <li className="nav-item">
                                    <a className={getTabClassName('overall')} 
                                       value='overall' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>Overall</a>
                                  </li>

                                  <li className="nav-item">
                                    <a className={getTabClassName('league')} 
                                       value='league' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>League</a>
                                  </li>
                                  
                                  <li className="nav-item">
                                    <a className={getTabClassName('note')} 
                                       value='note' 
                                       style={{color: 'black'}}
                                       href="#" 
                                       onClick={handleTab}>Note</a>
                                  </li>
                                </ul>
                                  
                                </div>
                              </div>

                              {
                                activeTab === 'bio' && <Bio playerData={playerData}
                                                            err={err}/>
                              }

                              {
                                activeTab === 'league' && <League playerData={playerData}
                                                                   err={err}/>
                              }

                              {
                                activeTab === 'overall' && <OverAll playerData={playerData}
                                                                    err={err}/>
                              }

                              {
                                activeTab === 'note' && <Note playerData={playerData}
                                                                  err={err}/>
                              }

                       </div>
                    </div>
                  </div>
            </>
          )
       }

       

       


     <Link href={'/'}
           style={{textDecoration: 'none', width: '200px'}}
           className='btn btn-primary rounded-1 vstack mx-auto'>
       Back
     </Link>


     <style>{`
        
      .nav-tabs.card-header-tabs {
            display: flex;
            justify-content: space-between;
            padding-left: 0; 
            list-style-type: none; 
          }

        .nav-item {
          flex-grow: 1; 
          text-align: center; 
        }

     `}</style>
   </>
  )
}

export default Index