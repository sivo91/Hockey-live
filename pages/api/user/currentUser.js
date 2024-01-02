import jwt from 'jsonwebtoken'
import User from '@/modules/User';
import Shelter from '@/modules/Shelter';
import connectDB from "@/utils/db"


//const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


const handler = async (req, res) =>  {

    await connectDB();

    let currentUser = false

    const token = req.cookies.userToken

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not found',
        currentUser
       });
    }


    try {

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)

    const userId = decodeData?.userId

    const user = await User.findById(userId).select('-password')
    const shelter = await Shelter.findById(userId).select('-password')
    

     
    //   ********   USER ******
    if(user) {
 
        const userData = {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            participant: user.participant,
            createdAt: user.createdAt,
        }

        return res.status(200).send({
          success: true,
          currentUser: true,
          userData,
        })

    }


   // ********   SHELTER   ******
    if(shelter) {
 
        const userData = {
            _id: shelter._id,
            name: shelter.shelterName,
            city: shelter.shelterCity,
            state: shelter.shelterState,
            participant: shelter.participant,
            email: shelter.email,
            stripeId: shelter.stripeID.substring(0,5), // sent partial id
            createdAt: shelter.createdAt,
        }



        return res.status(200).send({
          success: true,
          currentUser: true,
          userData,
        })

    }


      /*   const account = await stripe.accounts.retrieve(user.stripeID)
    console.log('acount stripe retrieve =>>>>>>>> ', account) */

    } catch (error) {
      console.log(error)

      res.status(500).send({
        success: false,
        currentUser
      })
    }


}

export default handler