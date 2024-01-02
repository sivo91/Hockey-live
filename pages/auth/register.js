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
  const [shelterName, setShelterName] = useState('')
  const [shelterCity, setShelterCity] = useState('')
  const [shelterState, setShelterState] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [process, setProcess] = useState(false)
  const [shelter, setIsToggled] = useState(false);


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


 // CREATE SHELTER
const handleSubmitShelter = async (e) => {
  e.preventDefault()

   // if password match
   if (password !== confirmPassword) {
        setPasswordMatchError(true);
        toast.error(`Password don't math!`)
        return;
  } else {
        setPasswordMatchError(false);
     }

 const participant = 'shelter'

    // config
  const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
    
  try {
      setProcess(true)
      const userData = { participant, email, password, shelterCity, shelterName, shelterState  }; 

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

}


  const toggle = () => {
    setIsToggled(!shelter)
  };

  
  return (

    <>
      
      <h3 className='text-center mt-5'>🌟 Welcome to Anubis!</h3>
      <h5 className='text-center mb-5'>
          We&apos;re thrilled to have you join our community dedicated to the welfare of animals. 
      </h5>

             <p className='text-center fs-5'>Sing Up as</p>
             <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '300px',
                  height: '10px',
                  border: '1px solid black',
                  margin: '0 auto',
                  backgroundColor: shelter ? '#85f2ff' : '#f3ff9c',
                  borderRadius: '3px',
                  transition: 'background-color 0.3s ease-in-out',
                }}
              >
                <button
                  onClick={toggle}
                  className='fs-5'
                  style={{
                    width: '130px',
                    height: '40px',
                    top: '-16px',
                    position: 'absolute',
                    left: shelter ? '170px' : '-5px',
                    transition: 'left 0.1s ease-in-out',
                    borderRadius: '9px',
                  }}
                >
                  {shelter ? 'Shelter' : 'User'}
                </button>
              </div>
            </div>
      
      
            {/*  USER  */}

              {
              !shelter && (
                <>
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
                              disabled={process}
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
                </>
              )
            }


            {/* SHELTER  */}
            {
              shelter && (
                <>
                   <form onSubmit={handleSubmitShelter} className='my-5 formShelter'>
                      <p className='fs-5 m-0 mb-2 text-center fw-semibold'>Shelter</p>

                      <div className="row">
 
                          <div className="col-11 col-md-6">

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

                          </div>

                          <div className="col-11 col-md-6">
                               <div className="mb-3">
                                <label htmlFor="shelterName" className="form-label">
                                  Shleter Name
                                </label>
                                <input type="text" 
                                      className="form-control" 
                                      id="shelterName" 
                                      value={shelterName}
                                      onFocus={(e) => myFunc(e.currentTarget)}
                                      onChange={ e => setShelterName(e.target.value)}
                                      placeholder="Shelter Name" />
                              </div>

                              <div className="mb-3">
                                <label htmlFor="shelterCity" className="form-label">
                                  City
                                </label>
                                <input type="text" 
                                      className="form-control" 
                                      id="shelterCity" 
                                      value={shelterCity}
                                      onFocus={(e) => myFunc(e.currentTarget)}
                                      onChange={ e => setShelterCity(e.target.value)}
                                      placeholder="Shelter City" />
                              </div>

                              <div className="mb-3">
                                <label htmlFor="shelterState" className="form-label">
                                  State
                                </label>
                                <input type="text" 
                                      className="form-control" 
                                      id="shelterState" 
                                      value={shelterState}
                                      onFocus={(e) => myFunc(e.currentTarget)}
                                      onChange={ e => setShelterState(e.target.value)}
                                      placeholder="Shelter State" />
                              </div>
                          </div>

                      </div>

                      <button type="submit" 
                              disabled={process}
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
                </>
              )
            }

        
  
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