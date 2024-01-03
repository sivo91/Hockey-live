/* eslint-disable @next/next/no-img-element */


import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLStandings } from '@/reduxFile/nhlSlice'
import Link from 'next/link';
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";


const Index = () => {


  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const nhl_standings = useSelector(state => state.nhlStandings.data);
  const status = useSelector(state => state.nhlStandings.status);
  const error = useSelector(state => state.nhlStandings.error);



   useEffect(() => {
    if (year) {
      dispatch(fetchNHLStandings(year))
    }
  }, [year, dispatch]);

  

  if (status === 'failed') return <div>Error: {error}</div>;

  return (

   <>
               <h3 className='text-center py-2'>Eastern Conference </h3>
                <table className='w-100 m-0 p-0 '>
                  <thead>
                    <tr className='border-top'>
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
                    {status === 'loading' ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : nhl_standings && nhl_standings.conference && nhl_standings.conference["Východná konferencia"] ? (
                      Object.entries(nhl_standings.conference["Východná konferencia"]).map(([key, team], index) => (
                        <tr className='fw-semibold team-box border-bottom border-top' key={key}>
                          <td>
                            {index + 1}
                          </td>
                          <td className='px-2'>
                            <Link href={'#'}  >
                              {team.shortname}
                              {/* {team.longname} */}
                            </Link>
                          </td>
                          <td>
                            {team.gp}
                          </td>
                          <td>
                            {team.wins}
                          </td>
                          <td>
                            {team.losts}
                          </td>
                          <td className='bg-info-subtle text-center'>
                            {team.points}
                          </td>
                          <td className='text-center'>
                            {team.score}
                          </td>
                          <td>
                            {team.clinch === 'x' ? (
                              <BsArrowUpSquareFill className='text-success'/>
                            ) : team.clinch === 'y' ? (
                              <FaStop className='text-danger'/>
                            ) : (
                              ''
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>



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