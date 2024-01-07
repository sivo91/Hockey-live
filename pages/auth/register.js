import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
 import { toast } from 'react-toastify';
 import { useRouter } from 'next/router';


const Register = () => {
   
  const router = useRouter()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [process, setProcess] = useState(false)



// input background
 const myFunc = (element) => {
    if (element) {
      // Do something with the element when it receives focus
      element.style.backgroundColor = '#f2f2f2';
    }
  };


  // CREATE USER
const handleSubmit = async (e) => {
    e.preventDefault();

       // if password match
   if (password !== confirmPassword) {
          setPasswordMatchError(true);
          toast.error(`Password don't math!`)
          return;
    } else {
          setPasswordMatchError(false);
       }

    const participant = 'supporter'

      // config
     const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
      
  try {
        setProcess(true)
        const userData = { participant, email, password  }; 
 
        const res = await axios.post('/api/user/register', userData, config);
   
        toast.success(res.data.message)
        
        setTimeout(() => {
          router.push('/auth/login')
        },500)

        setProcess(false)
      
  } catch (error) {
        console.error('Registration failed:', error);
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
        setProcess(false)
   }  

};


  
  return (

    <>
      
      <h3 className='text-center mt-5'>Register</h3>
      <h4 className='text-center text-danger'>Coming Soon</h4>
      
               <form onSubmit={handleSubmit} className='my-5'>
                      <p className='fs-5 m-0 mb-2 text-center fw-semibold'>User</p>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input type="email" 
                              className="form-control" 
                              id="email" 
                              value={email}
                              onFocus={(e) => myFunc(e.currentTarget)}
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
                              onFocus={(e) => myFunc(e.currentTarget)}
                              onChange={ e => setPassword(e.target.value)}
                              placeholder="Enter your password" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">
                          Confirm
                        </label>
                        <input type="password" 
                              className="form-control" 
                              id="confirm" 
                              value={confirmPassword}
                              onFocus={(e) => myFunc(e.currentTarget)}
                              onChange={ e => setConfirmPassword(e.target.value)}
                              placeholder="Confirm your password" />
                      </div>

                      <button type="submit" 
                              disabled={process || true}
                              className="btn btn-primary w-100 rounded-1 my-3">
                        { process ? 'Processing' : 'Submit'}
                      </button>

                      <hr />

                    <div className='text-center'>
                      <Link href={'/auth/login'} 
                            style={{textDecoration: 'none'}}>
                        Sign In
                      </Link>
                    </div>
                      

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
          padding: 20px 40px;;
          border-radius: 7px;
          background-color: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .formShelter {
            position: relative;
            width: 96%;
  
            min-width: 400px;
            max-width: 700px;
            margin: 0 auto;
            border: 1px solid gray;
            padding: 20px 40px;;
            border-radius: 7px;
            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .show {
          position: absolute;
          width: 100%;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s, visibility 0.5s;
        }
        
        .hide {
          opacity: 0;
          visibility: hidden;
        }
      `}</style>
    </>
  );
};

export default Register;