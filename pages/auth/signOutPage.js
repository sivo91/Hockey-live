import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '@/reduxFile/userSlice';
import jwt from 'jsonwebtoken'

/* 
export async function getServerSideProps({ req }) {
  let currentCuser
  const token = req.cookies.userToken;
  //console.log(token)
  if(token === undefined) {
    currentCuser = null
  }

  return {
      props: {
        currentCuser
      },
    };
}
 */

const Index = () => {

/*   console.log(props)

   const dispatch = useDispatch()

   if(props.currentCuser === null) {
    dispatch(userLogin(null))
   }
   */

  

  return (
    <>

      <h3 className='text-center my-5'>You have been signed out.</h3>

      <div className='log_out_message'>
          <p className='text-center'>Thank you for visiting our website. We hope you found what you were looking for. Feel free to return anytime. Have a great day!</p>
      </div>

      <style>{`
      
        .log_out_message {
          position: relative;
          width : 400px;
          margin: 50px auto;
          border: 1px solid gray;
          padding: 40px;
          border-radius: 7px;
          background-color: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
      
      `}</style>
    </>
  )
}

export default Index