import React from 'react'

const Index = ({ playerData, err }) => {







  return (
    <>

     
     
         {
             playerData === 'No such player in database' && 
              err?.name === 'AxiosError' ? 
              (
                <>
                  <div className="alert alert-warning mt-2 text-center border fw-semibold text-danger border-danger" 
                      role="alert">
                     Player Not Found. Please enter the name in the format: <q>Jagr Jaromir</q>
                  </div>
                </>
              ) :
            (
              <>
                    <div className='border mt-2 py-3 px-2 rounded-3'>
                      <div className="row justify-content-center">
                        <div className="col-12 col-md-12">


                          <table className='w-100'>
                            <thead>
                              <tr className='border'>
                                <th>Season</th>
                                <th>Team</th>
                                <th>GP</th>
                                <th>G</th>
                                <th>A</th>
                                <th className='bg-info-subtle'>PTS</th>
                                {/* Add more headers as needed */}
                              </tr>
                            </thead>
                            <tbody >
                              {playerData && playerData?.league.map((season, index) => (
                                <tr key={index} className='border'>
                                  <td>{season?.name}</td>
                                  <td>{season?.team}</td>
                                  <td>{season?.stats?.gp}</td>
                                  <td>{season?.stats?.goals}</td>
                                  <td>{season?.stats?.asists}</td>
                                  <td>{season?.stats?.points}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
            
                        
                        </div>
                      </div>
                  </div>
              </>
            )
          }
 






    


      <style>{`
      
       table tbody tr:nth-of-type(even) {
          background-color: #f2f2f2; 
        }
      
      `}</style>
    </>
  )
}

export default Index