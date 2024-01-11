import React from 'react'


const Index = ({ playerData,err }) => {


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
                              <tr className=' border'>
                                <th>Note</th>
                                <th>Message</th>
                               
                                {/* Add more headers as needed */}
                              </tr>
                            </thead>
                            <tbody className=''>
                              {playerData && playerData?.diary.map((note, index) => (
                                <tr key={index} className='border'>
                                  <td>{note?.date}</td>
                                  <td dangerouslySetInnerHTML={{ __html: note?.msg }}></td>
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
    </>
  )
}

export default Index