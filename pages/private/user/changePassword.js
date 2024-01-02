import React, {useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';


const Index = () => {



  const [currentPsw, setCurrentPsw] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
 


 const handlePassword = async (e) => {
  e.preventDefault()

  if(newPassword !== confirmPassword) {
    toast.error('New Passwords doesnt matched!')
    return
  }

 try {
    setLoading(true)
   const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

   const data = {currentPsw, newPassword}   
   const res = await axios.post('/api/user/changePassword', data, config)   
 

   if (res.data.success === true) {
    setShowSuccess(true)
    toast.success(res.data.message)
   }

   setLoading(false)
 } catch (error) {
   console.log(error)
   toast.error(error?.response?.data?.message)
   setLoading(false)
 }
 }


// input background
 const myFunc = (element) => {
    if (element) {
      // Do something with the element when it receives focus
      element.style.backgroundColor = '#f2f2f2';
    }
  };

  return (
    <>
       
       <h3 className='text-center my-5'>Change Password:</h3>

     {  showSuccess === false && (
        <>
           <form onSubmit={handlePassword}>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                 Current Password
                </label>
                <input type="password" 
                      className="form-control" 
                      id="password" 
                      value={currentPsw}
                      onFocus={(e) => myFunc(e.currentTarget)}
                      onChange={ e => setCurrentPsw(e.target.value)}
                      placeholder="Enter your password" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                 New Password
                </label>
                <input type="password" 
                      className="form-control" 
                      id="password" 
                      value={newPassword}
                      onFocus={(e) => myFunc(e.currentTarget)}
                      onChange={ e => setNewPassword(e.target.value)}
                      placeholder="Enter your new password" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm" className="form-label">
                  Confirm New Password
                </label>
                <input type="password" 
                      className="form-control" 
                      id="confirm" 
                      value={confirmPassword}
                      onFocus={(e) => myFunc(e.currentTarget)}
                      onChange={ e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password" />
              </div>

              <button 
                disabled={loading}
                className='btn btn-primary rounded-1 w-100 mt-3' >
                Submit
              </button>

           </form>
        </>
        )
     }


     {
      showSuccess === true && (
        <>
          <div className="alert text-center border-2 fs-4" 
               style={{width: '390px', 
                       position:'relative', 
                       top: '30px',
                       margin:'0 auto', 
                       borderColor: '#057322',
                       color:'#038225'}}
               role="alert">
             <q>Password updated successfully.</q>
          </div>

       
          
        </>
      )
     }

     <Link href={'/private/user/profile'}
           className='btn btn-light border-dark rounded-1 vstack mx-auto my-5'
           style={{textDecoration: 'none', width: '200px'}}>
       Back to Profile
     </Link>




      <style jsx>{`
        form {
          position: relative;
          width : 400px;
          margin: 0 auto;
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