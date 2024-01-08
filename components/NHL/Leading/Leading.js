/* eslint-disable @next/next/no-img-element */
import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLStandings } from '@/reduxFile/nhlSlice'
import Link from 'next/link';
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import BarChart from './BarChart';
import BarChart2 from './BarChart2';
import VerticalBarChart from './VerticalBar';




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

  // teams selected by conference
  let east = []
  let west = []
  // all teams
  let nhl = []
 

  const conferenceWest = leading?.conference['Západná konferencia'];
  const conferenceEast = leading?.conference['Východná konferencia'];


  // east conference
  for (let key in conferenceEast) {
    if (conferenceEast.hasOwnProperty(key)) {
        const item = conferenceEast[key];
        east.push(item) 
        nhl.push(item)
    }
  }


  // west conference
  for (let key in conferenceWest) {
     if (conferenceWest.hasOwnProperty(key)) {
        const item = conferenceWest[key];
        west.push(item) 
        nhl.push(item)
    } 
  }




 function createTableRowsEastern(east) {

  return east.slice(0, 8).map((item, index) => (
    <tr key={index} className='border'>
      <td>{index + 1}</td> 
      <td>{item.shortname}</td>
      <td>{item.gp}</td>
      <td>{item.wins}</td>
      <td>{item.losts}</td>
      <td className='bg-info-subtle text-center'>{item.points}</td>
      <td className='text-center'>{item.score}</td>
    </tr>
  ));
}

const tableRowsEastern = createTableRowsEastern(east);


 function createTableRowsWestern(west) {

  return west.slice(0, 8).map((item, index) => (
    <tr key={index} className='border'>
      <td>{index + 1}</td> 
      <td>{item.shortname}</td>
      <td>{item.gp}</td>
      <td>{item.wins}</td>
      <td>{item.losts}</td>
      <td className='bg-info-subtle text-center'>{item.points}</td>
      <td className='text-center'>{item.score}</td>
    </tr>
  ));
}

const tableRowsWestern = createTableRowsWestern(west);


  return (


   <>
                {/* first row , waster conf */}
              <div className="row justify-content-evenly ">

                <div className="col-12 col-md-3">
                  <h5 className='text-center mt-3'>Eastern Conference</h5>
                 {/*  <BarChart east={east}/> */}
                 <table className='w-100  border-bottom border-top '>
                      <thead className='border'>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>GP</th>
                          <th>W</th>
                          <th>L</th>
                          <th className='bg-primary-subtle text-center'>PTS</th>
                          <th className='text-center'>S</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                       {tableRowsEastern}
                      </tbody>
                    </table>
                </div>

                <div className="col-12 col-md-5">
                  <h5 className='text-center mt-3'>Playoff Teams</h5>
                  <BarChart east={east}/>
                 {/*  <BarChart2 west={west} /> */}
                </div>
              </div>
              <hr />



              {/* sec row western conference */}
              <div className="row justify-content-evenly">
                <div className="col-12 col-md-3">
                  <h5 className='text-center mt-3'>Western Conference</h5>
                 {/*  <BarChart east={east}/> */}
                 <table className='w-100  border-bottom border-top '>
                      <thead className='border'>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>GP</th>
                          <th>W</th>
                          <th>L</th>
                          <th className='bg-primary-subtle text-center'>PTS</th>
                          <th className='text-center'>S</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                       {tableRowsWestern}
                      </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-5">
                  <h5 className='text-center mt-3'>Playoff Teams</h5>
                   <BarChart2 west={west} /> 
                </div>
              </div>
              <hr />





              <div className="row justify-content-center mb-5">

                <div className="col-12 col-md-8">
                  <h5 className='text-center mt-5'>Playoff Teams</h5>
                  <VerticalBarChart nhl={nhl}/>
                </div>




               {/*  <div className="col-12 col-md-8 my-5 py-5">
                  <h5 className='text-center'>Teams Below the Playoff Line</h5>
                  <VerticalBarDown nhl={nhl}/>
                </div> */}



                

              </div>



                 

              <style>{`
            
              table {
                position: relative;
                height: 80%;
              }

               table tr td, table tr th {
                    padding-top: 2px;
                    padding-bottom: 2px;
                }

              table tr:nth-child(even) {
                  background-color: #f0f0f0;
                }

              table tr:nth-child(odd) {
                  background-color: #f7f7f7;
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