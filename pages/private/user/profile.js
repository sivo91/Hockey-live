/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import User from '@/modules/User';
import jwt from 'jsonwebtoken'
import connectDB from "@/utils/db"
import NewEvent from '@/modules/NewEvent'
import Shelter from '@/modules/Shelter';
import Order from '@/modules/Order';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInYears,
  parseISO
} from 'date-fns';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

import {Tooltip} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProfileUser from '@/components/ProfileUser'
import ProfileShelter from '@/components/ProfileShelter'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



// GET SERVER SIDE PROPS
export async function getServerSideProps({ req }) {
  const token = req.cookies.userToken;
  //console.log(token)

  await connectDB();

  try {
    const id = jwt.verify(token, process.env.JWT_SECRET);
    const userId = id.userId
    
   
    // USER DATA
    const user = await User.findById( userId ).select('-password -stripeID')  

    if(user) {
          const email = user.email

          // all user payments  = orders
          const orders = await Order.find({email}).sort({ createdAt: -1 }).exec()

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
    
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        orders: JSON.parse(JSON.stringify(orders)),
        animals: JSON.parse(JSON.stringify(animals)),
      }
    };
    }

   // SHELTER DATA
    const shelter = await Shelter.findById( userId).select('-password -stripeID')
    
    const myEvents = await NewEvent.find({email: shelter.email}).sort({ createdAt: -1 })

    const balance = await stripe.balance.retrieve({
      stripeAccount: shelter.stripeID
    })
   

    if(shelter) {
      return {
        props: {
          shelter: JSON.parse(JSON.stringify(shelter)),
          myEvents: JSON.parse(JSON.stringify(myEvents)),
          balance: JSON.parse(JSON.stringify(balance)),
        }
      };
    }

   

  } catch (error) {
    console.error(error);

    return {
      props: {
        notFound: true
      },
    };
  }
}



// profile component
const Index = ({user, orders, animals, shelter, myEvents, balance }) => {

let created

  if(user) {
     created = user?.createdAt
  } 

  if(shelter) {
    created = shelter?.createdAt

  }
 

  const [nameF,setNameF] = useState('')
  const [emailF, setEmailF] = useState(user?.email)
  const [messageF, setMessageF] = useState('')
  const [visible, setVisible] = useState(2)
  const [loading, setLoading] = useState(false)

  const data = {nameF, emailF, messageF}

 const relativeTime = (created) => {
      const now = new Date();
      const createdDate = parseISO(created);

      const minsDiff = differenceInMinutes(now, createdDate);
      if (minsDiff < 60) return `${minsDiff} min${minsDiff !== 1 ? 's' : ''} ago`;

      const hrsDiff = differenceInHours(now, createdDate);
      if (hrsDiff < 24) return `${hrsDiff} hr${hrsDiff !== 1 ? 's' : ''} ago`;

      const daysDiff = differenceInDays(now, createdDate);
      if (daysDiff < 365) return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;

      const yearsDiff = differenceInYears(now, createdDate);
      return `${yearsDiff} year${yearsDiff !== 1 ? 's' : ''} ago`;
    };

  const time = relativeTime(created)

  // FEEDBACK
  const handleFeedback = async (e) => {
    e.preventDefault();


    try {

     setLoading(true)

     const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const res = await axios.post('/api/user/feedback', data, config)
      
      if(res.data.success === true) {
        toast.success(res.data.message)
      }

      // clear fields
      setNameF('')
      setMessageF('')
   
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  };


  const clearFields = () => {
    setNameF('')
    setMessageF('')
  }

  return (
   <>

     

     {  // USER PROFILE
      user &&  <ProfileUser created={created}
                  user={user}
                  time={time}
                  orders={orders}
                  animals={animals} />
     }


   
     {   // SHELTER PROFILE
        shelter && <ProfileShelter 
                    shelter={shelter}
                    time={time}
                    balance={balance}
                    myEvents={myEvents}
                    />
     }


    <style>{`


    .triDots:hover {
      cursor:pointer
    }

    .button-container {
        display: flex;
        justify-content: flex-end; /* Aligns the button to the right */
      }

    table {
        width: 100%;
      }

    .profile_head {
      position: relative;
      width: 97%;
      left: 1.5%;
      border-radius: 10px;
      border: .3px solid gray;
      height: 110px;
      background: linear-gradient(90deg, rgba(228,228,228,1) 0%, rgba(251,251,251,1) 49%, rgba(228,228,228,1) 100%);
    }

    .profile_icon {
      position: relative;
      font-size: 80px;
      padding: 10px;
      background: white;
      border-radius: 50%;
      border:1px solid gray;
    }

   


 

    .textUnderline {
      text-decoration: underline lightgray;
    }
    

    `}</style>


   </>
  )
}

export default Index