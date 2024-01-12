/* eslint-disable @next/next/no-img-element */
import React, {useEffect } from 'react'
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


  let tableRows;

  if (status === 'loading') {
    tableRows = (
      <tr>
        <td colSpan="7" className="text-center">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </td>
      </tr>
    );
  } else if (nhl_standings && nhl_standings?.data?.conference && nhl_standings?.data?.conference["Západná konferencia"]) {
    const arrays = Object.entries(nhl_standings?.data?.conference["Západná konferencia"]);
    //console.log('arrays', arrays)

    tableRows = [];

    for (let i = 0; i < arrays.length; i++) {
      const [key, value] = arrays[i];
     // console.log('key + value', key, value)

      tableRows.push(
        <tr className='fw-semibold team-box border text-center' key={key}>
          <td>{i + 1}</td>
          <td className='px-2'>
            <Link href={'#'} >
              {value.shortname}
            </Link>
          </td>
          <td>{value.gp}</td>
          <td>{value.wins}</td>
          <td>{value.losts}</td>
          <td className='bg-info-subtle text-center'>
            {value.points}
          </td>
          <td className='text-center'>
            {value.score}
          </td>
           <td>
              {value.clinch === 'x' ? (
                <BsArrowUpSquareFill className='text-success'/>
              ) : value.clinch === 'y' ? (
                <FaStop className='text-danger'/>
              ) : (
                ''
              )}
            </td>
        </tr>
      );
    }
  } else {
    tableRows = (
      <tr>
        <td colSpan="7" className="text-center">No data available</td>
      </tr>
    );
  }





  return (


   <>
                   <h3 className='text-center py-2'>Western Conference </h3>
                   <table className='w-100 m-0 p-0 border'>
                      <thead>
                        <tr className='text-center border'>
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
                       {tableRows}
                      </tbody>
                    </table>




              <style>{`

               table tr td, table tr th {
                    padding-top: 10px;
                    padding-bottom: 10px;
                }

                 table tr:nth-child(even) {
                  background-color: #f0f0f0;
                }

              table tr:nth-child(odd) {
                  background-color: #fafafa;
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