import React, {useEffect} from 'react'
import Link from 'next/link'

import { TfiStatsUp } from "react-icons/tfi";
import { GiHockey } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { GiIceSkate } from "react-icons/gi";
import { FaHockeyPuck } from "react-icons/fa6";



const Index = () => {

  

  return (
    <>
 

       <h3 className='text-center mt-3'>NHL Standings</h3>
      
       <div className="d-flex">
          <aside className='pt-5 text-center'>
              
                    
                 <button className='btn btn-light border mt-2'>
                  <TfiStatsUp className=' fs-2'/> 
                </button>
                
                <button className='btn btn-light border mt-2'>
                  <GiHockey className=' fs-2'/> 
                </button>
             
                <button className='btn btn-light border mt-2'>
                  <HiUserGroup className=' fs-2'/> 
                </button>
                <button className='btn btn-light border mt-2'>
                  <CiSearch className=' fs-2'/> 
                </button>
                <button className='btn btn-light border mt-2'>
                  <CgNotes className=' fs-2'/> 
                </button>
                <button className='btn btn-light border mt-2'>
                  <GiIceSkate className=' fs-2'/> 
                </button>

                <button className='btn btn-light border mt-2'>
                  <FaHockeyPuck className=' fs-2'/> 
                </button>
               
                
          </aside>
          <section>
          
    
              
          </section>
        </div>



     {/* 

      x - Clinched Playoff spot
      y - Clinched Division
      p - President's Trophy
      z - Clinched Conference
      GP - Games Played
      W - Wins (worth two points)
      L - Losses (worth zero points) 
      
    */}


           

       <style>{`
 aside {
    position: sticky;
    top: 0;
    width: 80px;
    height: 50vh; 
    border-right: 1px solid #ccc;
    z-index: 100; 
  }

  section {
    position: relative;
    margin-left: 80px;
    width: calc(100% - 80px);
    height: 100vh;
  }



          `}</style>
    </>
  )
}

export default Index