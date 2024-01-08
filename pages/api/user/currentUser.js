import jwt from 'jsonwebtoken'
import User from '@/modules/User';
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

    } catch (error) {
      console.log(error)

      res.status(500).send({
        success: false,
        currentUser
      })
    }


}

export default handler