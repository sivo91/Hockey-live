/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'


import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Eastern from '@/components/NHL/Eastern'
import Western from '@/components/NHL/Western'
import WJCgroupA from '@/components/WJC/GroupA'
import WJCgroupB from '@/components/WJC/GroupB'
import EasternKHL from '@/components/KHL/Eastern'
import WesternKHL from '@/components/KHL/Western'
import { useSelector, useDispatch } from 'react-redux';
import { selectYear } from '@/reduxFile/selectYearSlice';



const NHL = 'https://hockey-live-sk-data.p.rapidapi.com/table/NHL/2023'
const KHL = 'https://hockey-live-sk-data.p.rapidapi.com/table/KHL/2023'
const WCH = 'https://hockey-live-sk-data.p.rapidapi.com/table/WCH/2023'
const WJC = 'https://hockey-live-sk-data.p.rapidapi.com/table/WJC/2023'



const Home= () => {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid my-5">

         <div className="row justify-content-center">
          
           <div className="col-11 col-md-3 border bg-light rounded-3 mx-2 p-5 text-center">
               <h3>NHL</h3>
               <div className="image-container" style={{ maxWidth: '200px', margin: 'auto' }}>
                  <img src="./NHL/nhl.png" style={{ width: '30%', height: 'auto' }} alt="nhl" />
              </div>
           </div>  

           <div className="col-11 col-md-3 border bg-light rounded-3 mx-2 p-5 text-center">
                <h3>WJC U20 2024</h3>
                 <div className="image-container" style={{ maxWidth: '200px', margin: 'auto' }}>
                  <img src="./WJC/wjc.png" style={{ width: '30%', height: 'auto' }} alt="nhl" />
              </div>
           </div>  

           <div className="col-11 col-md-3 border bg-light rounded-3 mx-2 p-5 text-center">
                <h3>IIHF ICE HOCKEY WORLD CHAMPIONSHIP</h3>
                 <div className="image-container" style={{ maxWidth: '200px', margin: 'auto' }}>
                  <img src="./NHL/nhl.png" style={{ width: '30%', height: 'auto' }} alt="nhl" />
              </div>
           </div>  
          
        </div> 
       
      </div>

   


      <style>{`

      
      `}</style>
    </>
  )
        }





export default Home