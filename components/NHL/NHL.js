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
import Leading from './Leading'
import Struggled from './StandingsStruggle/VerticalBarDown'
import BarChart  from './Struggle/Struggle'
import StrugleEast from './Struggle/StrungledEast'


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


   const data = [
    { letter: 'A', frequency: 0.08167 },
    { letter: '1B', frequency: 0.01492 },
    { letter: 'B2', frequency: 0.01492 },

  ];



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


     {/* when year react month august , we create new seasson  */}
      <select className="form-select form-select-lg mb-3"
                value={selectedYear} onChange={handleChangeYear}
                style={{width: '300px', margin: '0 auto'}} 
                aria-label="Large select example">
            <option>Select Season</option>
            { 
                generateYears().map(year => (
                  // year - 1 / lebo rocnik 2023 sa rata 23/23
                   <option key={year} value={year - 1}>
                      {`${year - 1}/${year}`}
                   </option>
            ))}
      </select>
      
      
       <div className="d-flex">

          <aside className='pt-2 text-center'>

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
                         data-tooltip="Leaders"
                        onClick={() => handleButtonClick('leaders')}>
                  <GiHockey className='fs-2' />
                </button>

                <button className='btn btn-light border mt-2 custom-tooltip' 
                         data-tooltip="Players"
                        onClick={() => handleButtonClick('players')}>
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


          <section className='pb-5'> 

            {
              sectionNHL === 'top-teams' && (
              <>
                 <h3 className='text-center my-4'>Leading Teams</h3>
                 <hr />
                 <Leading/>
                 <br /><br /><br /><br /><br />
              </>
              )
            }

            {
              sectionNHL === 'soft-teams' && (
              <>
                 <h3 className='text-center my-2'>Struggling Teams</h3>
                  <hr />
                  <div className="row justify-content-center">
                    <div className="col-12 col-5">
                       <div className="col-12 col-5">
                      <StrugleEast  />
                    </div>

                    </div>
                    <div className="col-12 col-5">
                      <BarChart data={data} />
                    </div>
                  </div>

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
                 <h3 className='text-center my-2'>Leaders</h3>
                  <Struggled/>
              </>
              )
            }

           {/*  {
              sectionNHL === 'players' && (
              <>
                 <h3 className='text-center my-2'>Players</h3>
              </>
              )
            } */}

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
              position: relative;
              top: 20vh;
              width: 80px;
              height: 5vh; 
              border-right: 1px solid #ccc;
              z-index: 100; 
            }

            section {
              position: relative;
              margin-left:20px;
              width: calc(100% - 80px);
              height: 100vh;

            }



          `}</style>
    </>
  )
}

export default Index