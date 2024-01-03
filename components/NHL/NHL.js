import React, {useEffect, useState} from 'react'
import Link from 'next/link'

import { TfiStatsUp } from "react-icons/tfi";
import { GiHockey } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { GiIceSkate } from "react-icons/gi";
import { FaHockeyPuck } from "react-icons/fa6";
import { TfiStatsDown } from "react-icons/tfi";
import { SlGraph } from "react-icons/sl";
import { useSelector, useDispatch } from 'react-redux';
import { selectYear } from '@/reduxFile/selectYearSlice';


const Index = () => {


const dispatch = useDispatch()
    const year = useSelector((state) => state.year.year);

    const [selectedYear, setSelectedYear] = useState('');


   useEffect(() => {
    console.log('useState year', selectedYear);
    dispatch(selectYear(selectedYear))
  }, [selectedYear, dispatch]);



  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };




 const [sectionNHL, setSectionNHL] = useState('home-page');
 console.log(sectionNHL)


  const handleButtonClick = (section) => {
    setSectionNHL(section);
  };

  return (
    <>
 

       <h3 className='text-center mt-3'>NHL Standings</h3>

      
      
       <div className="d-flex">

          <aside className='pt-2 text-center'>

                  <form className='my-3'>
                  <label htmlFor="years" className='me-2'>Seasson</label>
                  <select name="years" id="years" value={selectedYear} onChange={handleChangeYear}>
                    <option value="">Year</option>
                    <option value="2023">23/24</option>
                    <option value="2022">22/23</option>
                    <option value="2021">21/22</option>
                    <option value="2020">20/21</option>
                    <option value="2019">19/20</option>
                  </select>
                </form>

                 <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Home Page"
                        onClick={() => handleButtonClick('home-page')}>
                  <FaHockeyPuck className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                        data-tooltip="Leading Teams"  
                        onClick={() => handleButtonClick('top-teams')}>
                  <TfiStatsUp className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Struggling Teams"
                        onClick={() => handleButtonClick('soft-teams')}>
                  <TfiStatsDown className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Standings"
                        onClick={() => handleButtonClick('graph')}>
                  <SlGraph className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Leaders"
                        onClick={() => handleButtonClick('leaders')}>
                  <GiHockey className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Players"
                        onClick={() => handleButtonClick('playeys')}>
                  <HiUserGroup className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Search"
                        onClick={() => handleButtonClick('search')}>
                  <CiSearch className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                        data-tooltip="Notes"
                        onClick={() => handleButtonClick('notes')}>
                  <CgNotes className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip'
                         data-tooltip="Tooltip" 
                        onClick={() => handleButtonClick('ice-skate')}>
                  <GiIceSkate className='fs-2' />
                </button>

               


                <button 
                  className='btn btn-light border mt-2 custom-tooltip' 
                  onClick={() => handleButtonClick('top-teams')}
                  data-tooltip="Tooltip"  
              >
                  <TfiStatsUp className='fs-2' />
              </button>

                
          </aside>


          <section> </section>
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


   
          .custom-tooltip {
            position: relative;
            display: inline-block;
          }

          .custom-tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            left: 100%;  
            top: 50%;
            transform: translateX(10px) translateY(-50%);
            white-space: nowrap;
            background-color: black;
            color: white;
            text-align: center;
            padding: 5px 10px;
            border-radius: 6px;
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
          }

          .custom-tooltip:hover::after {
            opacity: 1;
            visibility: visible;
          }


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