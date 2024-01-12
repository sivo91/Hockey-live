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
import Standings_Estearn from './Standings/Eastern'
import Standings_Western from './Standings/Western'
import Leading from './Leading/Leading'
import Strugle  from './Struggle/Struggle'
import { BsCalendar3 } from "react-icons/bs";
import Schedule from '@/components/NHL/Schedule/Schedule'
import Search from '@/components/NHL/Search/Search'
import BestPlayers from '@/components/NHL/BestPlayers/BestPlayers'




const Index = () => {


const dispatch = useDispatch()
    const year = useSelector((state) => state.year.year);

    const [selectedYear, setSelectedYear] = useState('2023');


   useEffect(() => {
   // console.log('useState year', selectedYear);
    dispatch(selectYear(selectedYear))
  }, [selectedYear, dispatch]);



  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

 const [sectionNHL, setSectionNHL] = useState('top-teams');
 //console.log(sectionNHL)


  const handleButtonClick = (section) => {
    setSectionNHL(section);
  };




   // Generate years dynamically
    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        let startYear = currentMonth >= 8 ? currentYear + 1 : currentYear; 

        let years = [];

        for (let i = 0; i < 10; i++) {
            years.push(startYear - i);
        }

        return years;
    };

  return (
    <>
 

       <h3 className='text-center mb-3'>NHL</h3>

          {/* select year + sub lmenu */}
          <div className="row justify-content-evenly ">

            <div className="col-12 col-md-6">
                {/* when year react month august , we create new seasson  */}
                  <select className="form-select form-select-lg  my-3"
                            value={selectedYear} onChange={handleChangeYear}
                            style={{width: '300px', margin: '0 auto'}} 
                            aria-label="Large select example">
                        <option>Select Season</option>
                        { 
                            generateYears().map(year => (
                              // year - 1 / lebo rocnik 2023 sa rata 23/24
                              <option key={year} value={year - 1}>
                                  {`${year - 1}/${year}`}
                              </option>
                        ))}
                  </select>
            </div>
            <div className="col-12 col-md-6">
              <div className='d-flex justify-content-around sub-menu my-3'>

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
                            onClick={() => handleButtonClick('Standings')}>
                      <SlGraph className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Players Statistics"
                            onClick={() => handleButtonClick('leaders')}>
                      <GiHockey className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Schedule"
                            onClick={() => handleButtonClick('schedule')}>
                      <BsCalendar3 className='fs-2' />
                    </button>

                   <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Search"
                            onClick={() => handleButtonClick('search')}>
                      <CiSearch className='fs-2' />
                    </button>
                  {/*
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
                      data-tooltip="Tooltip">
                      <TfiStatsUp className='fs-2' />
                  </button> */}

              </div>
            </div>

          </div>
        

    

          {/* sub windows */}
          <section className='pb-5'> 

            {
              sectionNHL === 'top-teams' && (
              <>
                 <h3 className='text-center my-4'>
                    Leading Teams &nbsp;
                    {selectedYear}/{Number(selectedYear)+1}</h3>
                 <hr className='mx-5'/>
                 <Leading/>
                 <br /><br /><br /><br /><br />
              </>
              )
            }

            {
              sectionNHL === 'soft-teams' && (
              <>
                 <h3 className='text-center my-4'>Struggling Teams &nbsp;
                    {selectedYear}/{Number(selectedYear)+1}</h3>
                  <hr className='mx-5'/>
                  <Strugle/>
              </>
              )
            }
 
            {
              sectionNHL === 'Standings' && (
                <>
                  <h3 className='text-center my-2'>Standings</h3>
                  <div className="row justify-content-evenly gap-2 my-5">
                    <div className="col-10 col-md-5">
                      <Standings_Estearn/>
                    </div>
                    <div className="col-10 col-md-5">
                      <Standings_Western/>
                    </div>
                  </div>
                </>
              )
            }

            {
              sectionNHL === 'leaders' && (
              <>
                <BestPlayers/>
              </>
              )
            }

           {
              sectionNHL === 'schedule' && (
              <>
                  <Schedule />
              </>
              )
            } 

           {
              sectionNHL === 'search' && (
              <>
                 <Search/>
              </>
              )
            } 

          </section>
       



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
         

          .sub-side-menu {
            position: absolute;
            left: 75px;
            top: 0;
          }
    
   
          .custom-tooltip {
              position: relative;
              display: inline-block;
            }

            .custom-tooltip::after {
              content: attr(data-tooltip);
              position: absolute;
              left: 50%; /* Center the tooltip */
              top: 100%; /* Position it at the bottom of the button */
              transform: translateX(-50%) translateY(10px); /* Adjust horizontal position and move it down */
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


          .sub-menu {
            position: relative;
            width: 400px;
            margin: 0 auto;
          

          }

            section {
              position: relative;
              height: 100vh;
              
            }



          `}</style>
    </>
  )
}

export default Index