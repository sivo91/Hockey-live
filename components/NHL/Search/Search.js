

import React from 'react'
import Link from 'next/link'


const Index = () => {


  


  return (
    <>
      <h3 className='text-center my-5'>Search Section</h3>

      <div className="container-fluid">
        <div className="row justify-content-center gap-3">
          <div className="col-11 col-md-3 px-3 rounded-2 text-center">
            <Link href={'/NHL/Search/SearchPlayer'} 
                  style={{textDecoration: 'none'}}
                  className='btn btn-outline-dark rounded-2 py-3 px-3'>
              <h4>NHL Player Search</h4>
            </Link>
          </div>
          <div className="col-11 col-md-3 px-3 rounded-2 text-center">
            <Link href={'/NHL/Search/SearchTeam'} 
                  style={{textDecoration: 'none'}}
                  className='btn btn-outline-dark rounded-2 py-3 px-3'>
                <h4>NHL Team Search</h4>
              </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index