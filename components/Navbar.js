/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, userLogOut } from '@/reduxFile/userSlice';
import { RootState } from '@/reduxFile/store'; // Import RootState
import axios from 'axios';


const Navbar= () => {

  const user = useSelector((state) => state.userAuth.user);

  const dispatch = useDispatch()




  const CloseRightSideBar = ()=> {
      setTimeout(() => {
        const closeButton = document.querySelector('#offcanvasRight .btn-close') 
        closeButton?.click();
      }, 400);
    };

    const CloseSideBar = () => {
      setTimeout(() => {
        const closeButton = document.querySelector('#offcanvasWithBothOptions .btn-close') 
        closeButton?.click();
      }, 400)
     }




     const handleLogOut = async () => {
      try {
        
        const res = await axios.get('/api/user/logout')
        if(res.data.success === true) {
        dispatch(userLogOut())
        }

        CloseRightSideBar()
      } catch (error) {
        console.log(error)
      }
    }




  return (

   <>

    <nav className='border nav-top'>
        <h1>zapasiky here</h1>
    </nav>


     
    
    <nav className='d-flex justify-content-between border'>

         <div>
           <button className="btn btn-light border ms-3 my-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <GiHamburgerMenu/>
           </button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={0} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">

                <Link href={'/'} 
                      className='rounded-1 my-5 text-dark fs-5 ms-3' 
                      onClick={CloseSideBar}
                      style={{textDecoration: 'none'}}>
                 Home
               </Link>
                <br />
                <Link href={'/stats/standings'} 
                      className='rounded-1 my-5 text-dark fs-5 ms-3' 
                      onClick={CloseSideBar}
                      style={{textDecoration: 'none'}}>
                 Standings
               </Link>
               
               

              </div>
            </div>
         </div>

        

         



        {/* ***************************** */}

         <div>
          <button className="btn btn-light border me-3 my-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <FaRegCircleUser/>
          </button>

            <div className="offcanvas offcanvas-end" tabIndex={0} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className='rightSide'>
                     {
                      user === null ? (
                        <>
                          <Link href={'/login'}
                                onClick={CloseRightSideBar}
                                className='btn btn-outline-secondary rounded-1 mt-3'
                                style={{textDecoration: 'none'}}>
                            Sign In
                          </Link>
                          <Link href={'/signUp'}
                                className='btn btn-outline-secondary rounded-1 mt-3'
                                onClick={CloseRightSideBar}
                                style={{textDecoration: 'none'}}>
                            Sign Up
                          </Link>
                        </>
                      ) : (
                        <>
                           <p>Email: {user?.email} </p>
                           <Link href={'/signOut'}
                                className='btn btn-outline-secondary rounded-1 mt-3'
                                onClick={() => handleLogOut() }
                               style={{textDecoration: 'none'}}>
                            Sign Out
                          </Link>

                        </>
                      )
                    }  

                  {/* <img src="./foxy/foxy.jpg" style={{width: '300px'}} alt="img" />
                  <br />
                  <img src="./foxy/foxy6.jpg" style={{width: '300px'}} alt="img" /> */}

                </div>
              </div>
            </div>
         </div>
         
    </nav>


    <style>{`

      .nav-top  {
        position: relative;
        height: 120px
      }
      
      .rightSide {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
      }
    
    `}</style>
   
   </>

  )
}

export default Navbar