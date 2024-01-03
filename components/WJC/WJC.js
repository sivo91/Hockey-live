
import React from 'react'
import Link from 'next/link'

const Index = () => {


  return (
    <>
        <h3 className='text-center mt-3'>WORLD JUNIOR CHAMPIONSHIP</h3>
      
       <div className="container-fluid">

         <div className="row mt-3 justify-content-center">
              
              {/* Eastern Conference */}
             
                <div className="col-11 col-md-4 rounded-3 mt-3">
                  <Link href={'/'} 
                        style={{textDecoration: 'none'}}>
                      <div className="card">
                          <div className="card-header text-center">
                            Group A
                          </div>
                          <div className="card-body">
                            <p>asasddf</p>
                            <p>assadfdf</p>
                            <p>asadfsdf</p>
                            <p>asasdff</p>
                            <p>asasdfdf</p>
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
                            Group B
                          </div>
                          <div className="card-body">
                            <p>asasdfdf</p>
                            <p>assssdf</p>
                            <p>asdasdff</p>
                            <p>asddddf</p>
                            <p>aasdfsdf</p>
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
                            <p>asasdfdf</p>
                            <p>asdasdff</p>
                            <p>asadfsdf</p>
                            <p>asasdfdf</p>
                            <p>asasdfdf</p>
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