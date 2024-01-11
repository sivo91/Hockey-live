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
                        <div className="col-12 col-md-6">
                          <div className="card">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">Born: {playerData?.bio?.born}</li>
                                <li className="list-group-item">Height: {playerData?.bio?.kg} cm</li>
                                <li className="list-group-item">Weight: {playerData?.bio?.cm} kg</li>
                              </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="card">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">Position: {playerData?.pos}</li>
                                <li className="list-group-item">Hold: {playerData?.bio?.hold}</li>
                                <li className="list-group-item">Team: {playerData?.teamlong}</li>
                              </ul>
                            </div>
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