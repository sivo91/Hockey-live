import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Link from 'next/link'


const Index = () => {


  const [emailFP, setEmailFP] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [process, setProcess] = useState(false)



  const forgotPassword = async (e) => {
   e.preventDefault()

     const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

    try {
      setProcess(true)
      
      const res = await axios.post('/api/user/forgotPassw', { emailFP }, config )


      if(res.data === '') {
        toast.error('Email does not exist!')
        setEmailFP('')
      }

      if(res.data.success) {
  
        toast.success('Reset link has been!')
        setShowSuccess(true)
      }

      setProcess(false)

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setShowSuccess(false)
      setProcess(false)
    }

  }


  return (
    <>
      
      {
        showSuccess === false ? (
          <>
             <form onSubmit={forgotPassword}>

                <h3 className='text-center'>Reset Your Password</h3>
                <p className='text-center'>
                  Please enter your email address and we&apos;ll send you instructions on how to reset your password.
                </p>

                <div className="mb-3">

                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" 
                        className="form-control" 
                        id="email" 
                        value={emailFP}
                        onChange={ e => setEmailFP(e.target.value)}
                        placeholder="Enter your email" />
                </div>

                
                <button type="submit" 
                        disabled={process}
                        className="btn btn-primary w-100 rounded-1">
                 { process ? 'Processing' :  'Reset Password' }
                </button>
              </form>
          </>
        ) : (
          <>
            <form>

                 
                  <p className='text-center'>
                    Thanks! If <b>{emailFP}</b> matches an email we have on file, then we&apos;ve sent you an email containing further instructions for resetting your password.
                  </p>
                  <p className='text-center'>
                    If you haven&apos;t received an email in 5 minutes, check your spam, or resend email.
                  </p>

                  <Link href={'/'} 
                        className='btn btn-primary rounded-1 vstack mx-auto mt-5'
                        style={{textDecoration: 'none'}}>
                    Home Page
                  </Link>

                </form>
          </>
        )
      }

      <style jsx>{`
       form {
          position: relative;
          margin: 50px auto;
          width: 400px;
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