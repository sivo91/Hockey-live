

import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'



const Index = () => {

const [name, setName] = useState('')  
const [email, setEmail] = useState('')
const [msg, setMsg] = useState('')
const [selectSubject, setSelectSubject] = useState('')
const [process, setProcess] = useState(false)
const [five, setFive] = useState(0)



const data = { name, email, msg, selectSubject }
console.log(data)


 const handleContact = async (e) => {
  e.preventDefault()



  if(name === '' &&
     email === '' &&
     msg === '') {
      toast.error('Please provide: name, email, message')
      return
     }

 
   try {
  setProcess(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post('/api/contact', data, config);


  if (res.status === 201) {
    setName('');
    setEmail('');
    setMsg('');
    setSelectSubject('');
    setFive(0)
    
    toast.success(res.data.message);
  } else {
    // Handle non-201 responses if necessary
    toast.error('Form submission failed');
  }
} catch (error) {
  console.error(error);
  toast.error('An error occurred while submitting the form');
} finally {
  setProcess(false);
}


 }




  const handleSubject = (e) => {
      setSelectSubject(e.target.value)
  }




  return (
    <>
      <h3 className='text-center mt-5'>
         Contact
      </h3>
      <p className='text-center lead mb-5'>
         We&apos;re here to help! Reach out to us with any questions, concerns, or feedback, and we&apos;ll get back to you as soon as possible.
      </p>



     
           <div className="contact-panel"> 
              <form>

              
                <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" 
                      className="form-control" 
                      id="name" 
                      value={name}
                      onChange={ e => setName(e.target.value)}
                      placeholder="Enter your name" />
                </div>
        
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


                <label htmlFor="typeAnimal" className="form-label">
                  Animal category
                </label>
                <select className="form-select" id='typeAnimal' aria-label="Default select example" value={selectSubject} onChange={handleSubject}>
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Feedback</option>
                  <option value="issue">Technical Issue</option>
              </select>
          
                <div className="my-3">
                  <label htmlFor="msg" className="form-label">
                    Message
                  </label>
                  <textarea className="form-control" 
                            id="msg" 
                            value={msg}
                            onChange={ e => setMsg(e.target.value)}
                            placeholder="Your message"
                            rows="3" 
                  ></textarea>

                  <div className='mt-3'>
                    <span>2+3 = </span>
                    <input 
                      type="number" 
                      min={0}
                      max={6}
                      className='ps-2'
                      style={{width: '60px'}}
                      value={five}
                      onChange={e => setFive(e.target.value)} 
                    />
                  </div>

                </div>

              <button 
                  type="submit" 
                  disabled={process || five !== '5'}
                  className="btn btn-primary w-100 my-3 rounded-1"
                  onClick={handleContact}
                >
                  { process ? 'Processing...' : 'Send Message' }
                </button>

              </form>
          </div>
      
      
       

      <style jsx>{`

      .container {
        max-width: 1300px;
      }

      .contact-panel {
        position: relative;
        width: 100%;
        height: 400px;
        background-color: #f7f7f7;
        margin: 150px 0;
      }

        form {
          position: relative;
          max-width : 500px;
          min-width: 280px;
          margin: 0 auto 50px;
          top: -100px;
          border: 0.3px solid lightgray;
          padding: 20px;
          border-radius: 7px;
          background-color: white;
        }

        @media (max-width: 767.98px) { 
          form {
          position: relative;
          max-width : 80%;
          min-width: 280px;
          margin: 0 auto 50px;
          top: -100px;
          border: 0.3px solid lightgray;
          padding: 20px;
          border-radius: 7px;
          background-color: white;
        }
         }
      `}</style>
    </>
  )
}

export default Index



/* 

<div className="col-11 col-md-5">

           <p className='lead fw-semibold mt-5'>Question & Answers</p>

           {
           questions.map(item => (
            <SingleQ key={item._id} {...item} />
           ))
          }
        </div>


*/