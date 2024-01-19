


 
import React,{useCallback, useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios';
import { IoStatsChart } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { MdOutlineSportsHockey } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { selectYear } from '@/reduxFile/selectYearSlice';
import Groups from '@/components/WCH/Groups/Groups'


const Index = () => {


const dispatch = useDispatch()
const year = useSelector((state) => state.year.year);


const [activeTab, setActiveTab] = useState('groups');
const [selectedYear, setSelectedYear] = useState('2023');
 const [sectionWCH, setSectionWCH] = useState('groups');


useEffect(() => {
dispatch(selectYear(selectedYear))
}, [selectedYear, dispatch]);





const handleTab = (e) => {
    e.preventDefault();
    setActiveTab(e.target.getAttribute('value'));
  };

  const getTabClassName = (tabValue) => {
    return `nav-link ${activeTab === tabValue ? 'active' : ''}`;
  };







  

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };





  const handleButtonClick = (section) => {
    setSectionWCH(section);
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

         <h3 className='text-center '>ICE HOCKEY WORLD CHAMPIONSHIP</h3>
         <h4 className='text-center '>{year}/{Number(year)+1}</h4>
 

         <div className="container-fluid">



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
                            data-tooltip="Groups"  
                            onClick={() => handleButtonClick('groups')}>
                      <GrGroup className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Games"
                            onClick={() => handleButtonClick('soft-teams')}>
                      <MdOutlineSportsHockey className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Standings"
                            onClick={() => handleButtonClick('Standings')}>
                      <IoStatsChart className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Players Statistics"
                            onClick={() => handleButtonClick('leaders')}>
                      <IoStatsChart className='fs-2' />
                    </button>

                    <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Schedule"
                            onClick={() => handleButtonClick('schedule')}>
                      <IoStatsChart className='fs-2' />
                    </button>

                   <button className='btn btn-light border mt-2 custom-tooltip' 
                            data-tooltip="Search"
                            onClick={() => handleButtonClick('search')}>
                      <IoStatsChart className='fs-2' />
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


         {
          sectionWCH === 'groups' && <Groups year={year}/>
         }


          {/*  <div className="row justify-content-center">
                  
                   <div className="col-12 col-md-10 justify-content-center mt-3">

                              <div className="card text-center">
                                <div className="card-header">
                                  <ul className="nav nav-tabs card-header-tabs">
                                  <li className="nav-item text">
                                    <a className={getTabClassName('groups')} 
                                       value='groups' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>Groups</a>
                                  </li>

                                  <li className="nav-item">
                                    <a className={getTabClassName('teams')} 
                                       value='teams' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>Teams</a>
                                  </li>

                                  <li className="nav-item">
                                    <a className={getTabClassName('stats')} 
                                       value='stats' 
                                       href="#" 
                                       style={{color: 'black'}}
                                       onClick={handleTab}>Stats</a>
                                  </li>
                                  
                                  <li className="nav-item">
                                    <a className={getTabClassName('standings')} 
                                       value='standings' 
                                       style={{color: 'black'}}
                                       href="#" 
                                       onClick={handleTab}>Standings</a>
                                  </li>
                                </ul>
                                  
                                </div>
                              </div>

                              

          </div>

           </div> */}
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
