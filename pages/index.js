/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'


import Link from 'next/link';
import React, { useState, useCallback, useEffect} from 'react';
import NHL from '@/components/NHL/NHL'
import WJC from '@/components/WJC/WJC'
import WCH from '@/components/WCH/WCH'
import axios from 'axios';


/* const NHL = 'https://hockey-live-sk-data.p.rapidapi.com/table/NHL/2023'
const KHL = 'https://hockey-live-sk-data.p.rapidapi.com/table/KHL/2023'
const WCH = 'https://hockey-live-sk-data.p.rapidapi.com/table/WCH/2023'
const WJC = 'https://hockey-live-sk-data.p.rapidapi.com/table/WJC/2023' */



const Home= () => {


    const [checkedItem, setCheckedItem] = useState('NHL');
    
    const handleChangeA = (event) => {
        setCheckedItem(event.target.id);
    };


/* 
const [data, setData] = useState()
 const fetchGameData = useCallback(async ()=> {
  
 const options = {
    method: 'GET',
   url: `https://hockey-live-sk-data.p.rapidapi.com/games/NHL/2023`,
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
      console.log(res.data);
      setData(res.data)
    } catch (error) {
      
      console.log(error)
    }
  }, []);  // Dependencies array

  useEffect(() => {
    fetchGameData();
   
    const intervalId = setInterval(fetchGameData, 5000000);

    return () => clearInterval(intervalId);
  }, [fetchGameData]); */


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid my-5">

     
        <div className='d-flex justify-content-center ps-5'
             style={{width: '400px', margin: '0 auto'}}>

            <div className="form-check" 
                 style={{width: '150px'}}>
                <input 
                    className="form-check-input fw-semibold fs-5 hover" 
                    type="checkbox" 
                    id="NHL" 
                    checked={checkedItem === 'NHL'} 
                    onChange={handleChangeA} 
                />
                <label className="form-check-label fs-5 hover" htmlFor="NHL">
                    NHL
                </label>
            </div>

            <div className="form-check form" 
                 style={{width: '150px'}}>
                <input 
                    className="form-check-input fw-semibold fs-5 hover" 
                    type="checkbox" 
                    id="WJC" 
                    checked={checkedItem === 'WJC'} 
                    onChange={handleChangeA} 
                />
                <label className="form-check-label fs-5 hover" htmlFor="WJC">
                    WJC
                </label>
            </div>

            <div className="form-check form" 
                 style={{width: '150px'}}>
                <input 
                    className="form-check-input fw-semibold fs-5 hover" 
                    type="checkbox" 
                    id="WCH" 
                    checked={checkedItem === 'WCH'} 
                    onChange={handleChangeA} 
                />
                <label className="form-check-label fs-5 hover" htmlFor="WCH">
                    WCH
                </label>
            </div>
        </div>
        <hr />



        {
          checkedItem === 'NHL' && <NHL/>
        }
        {
          checkedItem === 'WJC' && <WJC/>
        }
        {
          checkedItem === 'WCH' && <WCH/>
        }



       
      </div>


     

   


      <style>{`

       .selection {
        position: relative;

       }

        .hover:hover {
          cursor: pointer;
         }
      `}</style>
    </>
  )
        }





export default Home