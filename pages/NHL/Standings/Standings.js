import React from 'react'

import Eastern from './Eastern'
import Western from './Western'



const Index = () => {



  return (
   <>

    <h3 className='text-center my-5'>NHL | Standings</h3>

     <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <Eastern/>
        </div>
        <div className="col-md-5">
          <Western/>
        </div>
      </div>
     </div>
     
     
     
   </>
  )
}

export default Index