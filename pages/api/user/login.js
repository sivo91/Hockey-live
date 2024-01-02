
import connectDB from '@/utils/db';
import User from '@/modules/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Shelter from '@/modules/Shelter';
import { serialize } from "cookie";


const secret = process.env.JWT_SECRET

const handler = async (req, res) =>  {

   await connectDB();

    if (req.method !== 'POST') {
      return;
    }


  try {
  
    const email= req.body.email;
    const password = req.body.password;
    const participant = req.body.participant

    // or const { email, password } = req.body; 



    // *********  USER  **********
    if(participant === 'supporter') {

       const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send({ success: false,
                                      message: 'Please create account first!' });
      }

      const doMatch = await bcrypt.compare(password, user.password);

      if (!doMatch) {
        return res.status(401).send({ success: false,
                                      message: 'Incorect password.' });
      }

      const userData = {
          _id: user._id,
          participant: user.participant,
          email: user.email,
          isAdmin: user.isAdmin,
          wishlist: user.wishlist,
          createdAt: user.createdAt,
      }
      
        // generate token
        const token = jwt.sign({userId: user._id}, secret, {
          expiresIn: '1d', // '1d', or '1w'
        });
      
      /*  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60 * 24 * 1}; Path=/`); */

      const serializedToken = serialize('userToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'production', 
        //maxAge: 60 * 60 * 24 * 30, // 30 days expiration
        // ak vynaham a user zavrie browser token is gone
        path: '/', // Adjust the path as needed
      });

      // set token 
      res.setHeader('Set-Cookie', serializedToken);

        return res.status(201).send({
          success: true,
          message: `Sign-in successful`,
          userData
        })

    }


    // *********  SHELTER ******************
    if(participant === 'shelter') {

       const shelter = await Shelter.findOne({ email });

      if (!shelter) {
        return res.status(404).send({ success: false,
                                      message: 'Please create account first!' });
      }

      const doMatch = await bcrypt.compare(password, shelter.password);

      if (!doMatch) {
        return res.status(401).send({ success: false,
                                      message: 'Incorect password.' });
      }

      const userData = {
          _id: shelter._id,
          participant: shelter.participant,
          email: shelter.email,
          stripeId: shelter.stripeID.substring(0,5), // sent partial id
          isAdmin: shelter.isAdmin,
          city: shelter.shelterCity,
          name: shelter.shelterName,
          state: shelter.shelterState,
          createdAt: shelter.createdAt,
      }
      
        // generate token
        const token = jwt.sign({userId: shelter._id}, secret, {
          expiresIn: '1d', // '1d', or '1w'
        });
      
      /*  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60 * 24 * 1}; Path=/`); */

      const serializedToken = serialize('userToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'production', 
        maxAge: 60 * 60 * 24 * 30, // 30 days expiration
        path: '/', // Adjust the path as needed
      });

      // set token 
      res.setHeader('Set-Cookie', serializedToken);

        return res.status(201).send({
          success: true,
         message: `Sign-in successful`,
          userData
        })

    }


     


    

    
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      message: 'Something',
    });
  }

}


export default handler