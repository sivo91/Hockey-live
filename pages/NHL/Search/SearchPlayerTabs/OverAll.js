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
                        <div className="col-12 col-md-6">
                          <div className="card">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">Games: {playerData?.overall?.gp} </li>
                                <li className="list-group-item">Assists: {playerData?.overall?.asists}</li>
                                <li className="list-group-item">Goals: {playerData?.overall?.goals} </li>
                                <li className="list-group-item">Points {playerData?.overall?.points} </li>
                              </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="card">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">Winning Goals: {playerData?.overall?.gwg} </li>
                                <li className="list-group-item">PPG: {playerData?.overall?.ppg}</li>
                                <li className="list-group-item">SHG: {playerData?.overall?.shg} </li>
                                <li className="list-group-item">PIM {playerData?.overall?.penalty} </li>
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