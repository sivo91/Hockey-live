/* eslint-disable @next/next/no-img-element */
import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLStandings } from '@/reduxFile/nhlSlice'
import Link from 'next/link';
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import BarChart from './StandingsLead/BarChart';
import BarChart2 from './StandingsLead/BarChart2';
import VerticalBarChart from './StandingsLead/VerticalBar';
import VerticalBarDown from './StandingsStruggle/VerticalBarDown';


const Index = () => {

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const leading = useSelector(state => state.nhlStandings.data);
  const status = useSelector(state => state.nhlStandings.status);
  const error = useSelector(state => state.nhlStandings.error);


  
  useEffect(() => {
    if (year) {
      dispatch(fetchNHLStandings(year))
    }
  }, [year, dispatch]);

  

 
  if (status === 'failed') return <div>Error: {error}</div>;


  let east = []
  let west = []
  let nhl = []
 

  const conferenceWest = leading?.conference['Západná konferencia'];
  const conferenceEast = leading?.conference['Východná konferencia'];

  //console.log(conferenceData)

  for (let key in conferenceEast) {
    if (conferenceEast.hasOwnProperty(key)) {
        const item = conferenceEast[key];
        east.push(item) 
        nhl.push(item)
    }
  }


  for (let key in conferenceWest) {
     if (conferenceWest.hasOwnProperty(key)) {
        const item = conferenceWest[key];
        west.push(item) 
        nhl.push(item)
    } 
  }





  return (


   <>
                
              <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                  <h5>Eastern Conference</h5>
                  <BarChart east={east}/>
                </div>
                <div className="col-12 col-md-5">
                  <h5>Western  Conference</h5>
                  <BarChart2 west={west} />
                </div>
              </div>

              <div className="row justify-content-center my-5">

                <div className="col-12 col-md-8">
                  <h5 className='text-center'>Playoff Teams</h5>
                  <VerticalBarChart nhl={nhl}/>
                </div>

                <div className="col-12 col-md-8 my-5 py-5">
                  <h5 className='text-center'>Teams Below the Playoff Line</h5>
                  <VerticalBarDown nhl={nhl}/>
                </div>
              </div>



                 

              <style>{`

               table tr td, table tr th {
                    padding-top: 10px;
                    padding-bottom: 10px;
                }

            
              
                .card-east:hover {
                  position: relative;
                  border: 2px dashed red;
                  cursor: pointer;
                }
              `}</style>
   </>
  )
}

export default Index