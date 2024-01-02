/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchJuniors } from '@/reduxFile/wjcSlice'
import Link from 'next/link';
import { BsArrowUpSquareFill } from "react-icons/bs";


const Index = () => {


  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const groupA = useSelector(state => state.wcj.data);
  const status = useSelector(state => state.wcj.status);
  const error = useSelector(state => state.wcj.error);

   useEffect(() => {
    if (year) {
      dispatch(fetchJuniors(year))
    }
  }, [year, dispatch]);

  const closeButtonRef = useRef(null);

  const handleCloseClick = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };


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
  } else if (groupA && groupA.group && groupA.group.A) {

  
    const arrays = Object.entries(groupA.group.A);
    //console.log('arrays', arrays)

    tableRows = [];

    for (let i = 0; i < arrays.length; i++) {

      const [key, value] = arrays[i];
     // console.log('key + value', key, value)

      tableRows.push(
        <tr className='fw-semibold team-box' key={key}>
          <td>{i + 1}</td>
          <td className='px-2'>
            <Link href={'#'} onClick={handleCloseClick  }>
              {value.shortname}
            </Link>
          </td>
          <td>{value.gp}</td>
          <td>{value.wins}</td>
          <td>{value.losts}</td>
          <td>{value.points}</td>
          <td>{value.score}</td>
          <td>{value.clinch !== '' && <BsArrowUpSquareFill className='text-success'/>}</td>
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
             
              <button type="button" 
                    className="btn btn-outline-light text-dark border py-5 " 
                    data-bs-toggle="modal" 
                    style={{width: '120px'}}
                    data-bs-target="#groupA">
              Group A
               <img src="../WJC/wjc.png" className='mt-2' style={{width: '60px'}} alt="khl" />
            </button>


              <div className="modal fade" id="groupA" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <img src="../WJC/wjc.png" alt="nhl" className='me-3' style={{width: '40px'}}/>
                      <h1 className="modal-title fs-5 text-center" id="exampgroupA">WJC - Group A {year}</h1>

                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                   <table className='w-100 m-0 p-0'>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>GP</th>
                          <th>W</th>
                          <th>L</th>
                          <th>PTS</th>
                          <th>S</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                       {tableRows}
                      </tbody>
                    </table>



                    </div>
                    <div className="modal-footer">
                      <button type="button" ref={closeButtonRef} className="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>


   </>
  )
}

export default Index