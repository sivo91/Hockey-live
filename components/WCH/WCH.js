


 
import React from 'react'
import Link from 'next/link'

const Index = () => {


  return (
    <>
        <h3 className='text-center mt-3'>ICE HOCKEY WORLD CHAMPIONSHIP</h3>
      
       <div className="container-fluid">

         <div className="row mt-3 justify-content-center">
              
              {/* Eastern Conference */}
             
                <div className="col-11 col-md-4 rounded-3 mt-3">
                  <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card movingBorderDiv">
                          <div className="card-header text-center">
                            Eastern Conference
                          </div>
                          <div className="card-body">
                           <table className='w-100'>
                              <thead>
                                  <tr className='border-bottom'>
                                      <th> 1</th>
                                      <th> 2</th>
                                      <th> 3</th>
                                      <th> 3</th>
                                      <th> 3</th>
                                      <th> 3</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr className='border-bottom'>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                  </tr>
                                  <tr className='border-bottom'>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                  </tr>
                                  <tr className='border-bottom'>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                  </tr>
                                  <tr className='border-bottom'>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                  </tr>
                                  <tr className='border-bottom'>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                      <td>Row</td>
                                  </tr>
                                
                              </tbody>
                          </table>
                          </div>
                        </div>
                   </Link>
              </div>
            

               {/* Western Conferene */}
              <div className="col-11 col-md-4 rounded-3 mt-3">
                 <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Western Conference
                          </div>
                          <div className="card-body">
                            <p>asaasdfsdfdf</p>
                            <p>asasdfsssdf</p>
                            <p>asdasdfasdff</p>
                            <p>asdasdfasdfdddf</p>
                            <p>aasasdfdfsdf</p>
                          </div>
                        </div>
                   </Link>
              </div>

               {/* Top Team */}
              <div className="col-11 col-md-4 rounded-3 mt-3">
                <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Eastern Conference
                          </div>
                          <div className="card-body">
                            <p>asasasdfdfdf</p>
                            <p>asdasdff</p>
                            <p>asadasdffsdf</p>
                            <p>asasdasdffdf</p>
                            <p>aasdfasdsasdfdf</p>
                          </div>
                        </div>
                   </Link>
              </div>
         </div>

          <div className="row mt-3 justify-content-center">
              
              {/* Top Players */}
              <div className="col-11 col-md-4 rounded-3 mt-3">
                 <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Players
                          </div>
                          <div className="card-body">
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                          </div>
                        </div>
                   </Link>
              </div>

               {/* Games */}
              <div className="col-11 col-md-4 rounded-3 mt-3">
                <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Games
                          </div>
                          <div className="card-body">
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                          </div>
                        </div>
                   </Link>
              </div>

              {/* Graph */}
              <div className="col-11 col-md-4 rounded-3 mt-3">
                <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Card
                          </div>
                          <div className="card-body">
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                          </div>
                        </div>
                   </Link> 
              </div>
         </div>
         
       </div>



     {/* 

      x - Clinched Playoff spot
      y - Clinched Division
      p - President's Trophy
      z - Clinched Conference
      GP - Games Played
      W - Wins (worth two points)
      L - Losses (worth zero points) 
      
    */}


           

        <style>{`

          .card {
            border: 2px solid #d9d9d9!important;
          }
         
          .card:hover {
            border: 2px dashed black!important;
            position: relative;
            top: -5px;
          }


        
        `}</style>
    </>
  )
}

export default Index