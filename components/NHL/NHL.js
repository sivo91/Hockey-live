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
    { letter: 'B3', frequency: 0.01492 },
    { letter: 'B4', frequency: 0.01492 },
    { letter: 'B5', frequency: 0.01492 },
    { letter: 'B6', frequency: 0.01492 },
    { letter: 'B', frequency: 0.01492 },
    { letter: '8B', frequency: 0.01492 },
    { letter: 'B9', frequency: 0.01492 },
    { letter: 'Ba', frequency: 0.01492 },
    { letter: 'Bs', frequency: 0.01492 },
    { letter: 'Bd', frequency: 0.01492 },
    { letter: 'Bf', frequency: 0.01492 },
    { letter: 'Bg', frequency: 0.01492 },
    { letter: 'Bh', frequency: 0.01492 },
    { letter: 'Bj', frequency: 0.01492 },
    { letter: 'Bk', frequency: 0.01492 },
    { letter: 'Bxz', frequency: 0.01492 },
    { letter: 'Bx', frequency: 0.01492 },
    { letter: 'Bc', frequency: 0.01492 },
    { letter: 'Bc', frequency: 0.01492 },
    { letter: 'Bv', frequency: 0.01492 },
    { letter: 'Bb', frequency: 0.01492 },
    { letter: 'Bb', frequency: 0.01492 },
    { letter: 'Bn', frequency: 0.01492 },
    { letter: 'Bm', frequency: 0.01492 },
    { letter: 'Bhy', frequency: 0.01492 },
    { letter: 'Bgt', frequency: 0.01492 },
    { letter: 'Bdr', frequency: 0.01492 },
    { letter: 'Bfs', frequency: 0.01492 },
    { letter: 'Bas', frequency: 0.01492 },
    { letter: 'Bvd', frequency: 0.01492 },
    { letter: 'Bfe', frequency: 0.01492 },
    { letter: 'Bag', frequency: 0.01492 },
    { letter: 'Bed', frequency: 0.01492 },
    // ... more data
  ];


  return (
    <>
 

       <h3 className='text-center mb-3'>NHL</h3>

       <select className="form-select form-select-lg mb-3" 
               value={selectedYear} onChange={handleChangeYear}
               style={{width: '300px', margin: '0 auto'}} aria-label="Large select example">
              <option selected>Select Seasson</option>
              <option value="2023">2023/2024</option>
              <option value="2022">2022/2023</option>
              <option value="2021">2021/2022</option>
              <option value="2020">2020/2021</option>
              <option value="2019">2019/2020</option>
              <option value="2018">2018/2019</option>
              <option value="2017">2017/2018</option>
              <option value="2016">2016/2017</option>
              <option value="2015">2015/2016</option>
              <option value="2014">2014/2015</option>
              <option value="2013">2013/2014</option>
              <option value="2012">2012/2013</option>
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
                      <h3>data</h3>
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
                  <div className="row justify-content-center gap-2">
                    <div className="col-12 col-md-5 border rounded-3">
                      <Standings_Estearn/>
                    </div>
                    <div className="col-12 col-md-5 border rounded-3">
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