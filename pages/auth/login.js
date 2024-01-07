
import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { userLogin } from '@/reduxFile/userSlice';
import Link from 'next/link';

const Login = () => {

 const dispatch = useDispatch()
 const router = useRouter()

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [process, setProcess] = useState(false)

 
 const data = {email, password}


 const handleLogin = async (e) => {
    e.preventDefault()

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

    try {

      setProcess(true)
      const res = await axios.post('/api/user/login', data, config)
   
      dispatch(userLogin(res.data.userData))
      toast.success(res.data.message)
      router.push('/')
      setProcess(false)
   
    } catch (error) {
      console.log(error)
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
      setProcess(false)
    }
 }


 const participation = (e) => {
  setParticipant(e.target.value)
}



  return (
    <>
      
      <h3 className='text-center mt-5'>Sign In</h3>
     
      

      <form onSubmit={handleLogin}>
        <div className="mb-3">

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" 
                 className="form-control" 
                 id="email" 
                 value={email}
                 onChange={ e => setEmail(e.target.value)}
                 placeholder="Enter your email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" 
                 className="form-control" 
                 id="password" 
                 value={password}
                 onChange={ e => setPassword(e.target.value)}
                 placeholder="Enter your password" />
        </div>

      


        <button type="submit" 
                disabled={process}
                className="btn btn-primary w-100 my-3 rounded-1">
          { process ? 'Processing' : 'Submit' }
        </button>

        <hr />

        <div className='mt-3 d-flex justify-content-between mx-1'>
         {/*  <Link href={'/auth/forgotPassword'}
                style={{textDecoration: 'none'}}>
            Forgot Password
          </Link> */}

          <Link href={'/auth/register'}
                style={{textDecoration: 'none'}}>
            Sign Up
          </Link>
        </div>
      </form>

      <style jsx>{`
        form {
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
  );
};

export default Login