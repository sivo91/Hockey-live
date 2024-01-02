/* eslint-disable @next/next/no-img-element */
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLStandings } from '@/reduxFile/nhlStandingsSlice'
import Link from 'next/link';



const Index = () => {

  const dispatch = useDispatch();
  const nhl_standings = useSelector(state => state.nhlStandings.data);
  const status = useSelector(state => state.nhlStandings.status);
  const error = useSelector(state => state.nhlStandings.error);

 useEffect(() => {
  if (!nhl_standings) {
    dispatch(fetchNHLStandings());
  }
}, [dispatch, nhl_standings]);

   //console.log(nhl_standings?.conference['Západná konferencia'])
  if (status === 'failed') return <div>Error: {error}</div>;





  const handleCloseModal = () => {
    // Hide the modal with Bootstrap's 'hide' method
    $('#exampleModal').modal('hide');
  };




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
  } else if (nhl_standings && nhl_standings?.conference && nhl_standings?.conference["Západná konferencia"]) {
    const arrays = Object.entries(nhl_standings.conference["Západná konferencia"]);
    //console.log('arrays', arrays)

    tableRows = [];

    for (let i = 0; i < arrays.length; i++) {
      const [key, value] = arrays[i];
     // console.log('key + value', key, value)

      tableRows.push(
        <tr className='fw-semibold team-box' key={key}>
          <td>{i + 1}</td>
          <td className='px-2'>
            <Link href={'/'} onClick={handleCloseModal}>
              {value.shortname}
            </Link>
          </td>
          <td>{value.gp}</td>
          <td>{value.wins}</td>
          <td>{value.losts}</td>
          <td>{value.points}</td>
          <td>{value.score}</td>
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
            <div className="card card-west m-1"  
                   data-bs-toggle="modal" 
                   style={{width: '250px', height: '200px'}}
                   data-bs-target="#exampleModal">
                 <img src="./NHL/NHLwestern.png" alt="img" />
              </div>


              <div className="modal fade" id="exampleModal" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <img src="./NHL/nhl.png" alt="nhl" className='me-3' style={{width: '40px'}}/>
                      <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">NHL - Western Conf.</h1>

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
                        </tr>
                      </thead>
                      <tbody>
                       {tableRows}
                      </tbody>
                    </table>



                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <style>{`
                .card-west:hover {
                  position: relative;
                  border: 2px dashed blue;
                  cursor: pointer;
                }

              

              `}</style>
   </>
  )
}

export default Index