import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import User from '@/modules/User';
import connectDB from "@/utils/db"
import Shelter from '@/modules/Shelter';
import { toast } from 'react-toastify';
import axios from 'axios';




export async function getServerSideProps(context) {
  await connectDB();
  try {
    
    const { query } = context;
    const id = query.id.trim() || null;

   //console.log('Received ID:', id);

    // reset old password before do anything 
    await User.findByIdAndUpdate(id, { $set: { password: '' } }, { new: true });

    let emailProvided

    // show user
     const user = await User.findById( id )
     const shelter = await Shelter.findById( id )
      
     if(user) {
      emailProvided = user.email
     } 

     if(shelter) {
      emailProvided = shelter.email
     }

    
    return {
      props: { 
         id,
         emailProvided
         },
    };

  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: { 
        id: null, 
        emailProvided: null
       },
    };
  }
}


// **********************************************



const Index = (props) => {
  const id = props.id
  const emailProvided = props.emailProvided

  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [processing, setProcessing] = useState(false)

  // input background
 const myFunc = (element) => {
    if (element) {
      // Do something with the element when it receives focus
      element.style.backgroundColor = '#f2f2f2';
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault()

  setProcessing(true)

  const data = {id, password}

    // if password match
    if (password !== confirmPassword ||
        password.length < 1 || 
        confirmPassword.length < 1) {
      setPasswordMatchError(true);
      toast.error(`Password don't math!`)
      setPassword('')
      setConfirmPassword('')
      setProcessing(false)
      return;
    } else {
      setPasswordMatchError(false);

    }

     const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }


      try {
        const res = await axios.post('/api/user/newPassword', data, config )

        toast.success(res.data.message)
 
        setTimeout(() => {
         router.push('/auth/login')
        },500)
        

        setProcessing(false)

      } catch (error) {
        console.log(error)
        toast.error(error.message)
        setProcessing(false)
      }

  }



  return (
    <>
      <h3 className='text-center mt-5'>Reset Password.</h3>
      <h6 className='text-center mb-5'>user Email: {emailProvided}</h6>


      <form onSubmit={handleSubmit} className='my-5'>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Set New Password
          </label>
          <input type="password" 
                 className="form-control" 
                 id="password" 
                 value={password}
                 onFocus={(e) => myFunc(e.currentTarget)}
                 onChange={ e => setPassword(e.target.value)}
                 placeholder="Enter New Password" />
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
                 placeholder="Confirm New Password" />
        </div>

        <button type="submit" 
                disabled={processing}
                className="btn btn-primary w-100 rounded-1 mt-3">
          {processing ? 'Processing' :  'Create New Password'}
        </button>
       

        {passwordMatchError && (
          <p className="text-danger mt-3">Passwords do not match!</p>
        )}

      </form>


    

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


