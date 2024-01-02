/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react'
import User from '@/modules/User';
import jwt from 'jsonwebtoken';
import connectDB from "@/utils/db"
import Link from 'next/link';
import NewEvent from '@/modules/NewEvent';
import {Tooltip} from "@nextui-org/react";

import { ProgressEvent } from '@/utils/ProgressEvent';
import { formatUSD } from '@/utils/formatUSD';


// GET SERVER SIDE PROPS
export async function getServerSideProps({ req }) {

  await connectDB();

  const token = req.cookies.userToken;
  let id
  id = jwt.verify(token, process.env.JWT_SECRET);
  const gotenId = id.userId // id

  // find user
  const user = await User.findById( gotenId ).select('-password -stripeID')

  // select wishlist from user
  const dataWishList = user?.wishlist
  
  // got only ids
  const animal = dataWishList.map(item => item.toString())
 
  // create arr for posible objs
  let animals = []

  // loop over ids and find animal by id then push to aminls arr , than return data to front-end
  for(let i = 0; i < animal.length; i++) {
     const data = await NewEvent.findById(animal[i])
     animals.push(data)
  }

  try {
    return {
      props: {
        animals: JSON.parse(JSON.stringify(animals)),
      }
    };

  } catch (error) {
    console.error(error);

    return {
      props: {
        currentCuser: false
      },
    };
  }
}


const Index = ({ animals }) => {


const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 3;
const totalItems = animals.length
const totalPages = Math.ceil(totalItems / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = animals.slice(indexOfFirstItem, indexOfLastItem);





  return (
    <>
      <h3 className='text-center my-5'>My Animal Wishlist</h3>

      <main>
        {
          animals.length >= 1 && (
            <>
              {
                currentItems.map((item, idx) => (
                  <>
                   <Tooltip content={item?.name} key={item?._id}>
                     <Link href={`/urgent/${item?._id}`} 
                           key={item?._id}
                           style={{width: '18rem', margin: '15px 20px', textDecoration: 'none'}}
                      >
                       <div className="card text-center">

                          {/* img */}
                          <div className="imgBox">
                            <img src={item?.imgUrl} alt="img" />
                          </div>

                          <div className="card-body">
                             {/* name */}
                            <h5 className='mt-2'>{item?.name}</h5>

                            {/* show donated and needed $s */}
                            <div className='d-flex justify-content-between'>
                              <div>
                                <p className='m-0 lead'>
                                  Donated
                                </p>
                                {formatUSD(item?.amountDonated)}
                              </div>

                              <div className="text-end">
                                <p className='m-0 lead'>
                                  Donations Needed
                                </p>
                                {formatUSD(item?.amountNeeded)}
                              </div>
                            </div>

                            <ProgressEvent value={item?.amountDonated} 
                                        total={item?.amountNeeded} />
                          </div>

                       </div>
                     </Link>
                    </Tooltip> 
                  </>
                ))
              }
            </>
          )
        }

        {
          animals.length < 1 && (
            <>
              <p className='text-center my-5'>Your wishlist is currently empty. Ready to find your favorite animals? Start your search 
                <Link href={'/donate/supportAnimal'}
                      className='ms-2 fw-semibold'
                      style={{textDecoration: 'none', color:'blue'}}>
                  Here.
                </Link>
              </p>
            </>
          )
        }

      </main>


       {/* Pagination Component */}
          <nav aria-label="Page navigation example my-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</a>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(index + 1); }}>{index + 1}</a>
                

                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</a>
              </li>
            </ul>
          </nav>


      <style>{`

      .card:hover {
        position:relative;
        top:-5px;
        box-shadow: 1px 1px 13px lightgray;
      }

      .my-progress {
        width: 100%;
        background-color: #e9ecef;
        border-radius: 7px;
        height: 1rem; 
        overflow: hidden; 
      }

      .my-progress-bar {
        height: 100%;
        background-color: #007bff; 
        transition: width 0.6s ease; 
        display: flex;
        align-items: center; 
        color: white; 
        white-space: nowrap; 
      }

       .imgBox {
        position: relative;
        width: 100%;
        
       }

       .imgBox > img {
        position: relative;
        object-fit: cover;
        width: 100%;
        height: 20rem;
       }
       
        main {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          justify-content: center;
        }
      
      `}</style>
      
      
    </>
  )
}

export default Index