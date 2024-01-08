


import jwt from 'jsonwebtoken'
import User from '@/modules/User';
import connectDB from "@/utils/db"
import bcrypt from 'bcrypt';


const handler = async (req, res) =>  {

    await connectDB();

    const currentPsw = req.body.currentPsw
    const newPassword = req.body.newPassword

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

    
    const user = await User.findById(userId).select('-password -stripeID')
   

   // *********   USER ******
   if(user) {
      // current pass
      const userPassword = await User.findById(userId).select('password')

      const doMatch = await bcrypt.compare(currentPsw, userPassword.password);

      if (!doMatch) {
        return res.status(401).send({ 
            success: false,
            message: 'Incorrect currect password!' });
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

      await User.updateOne({ email: user.email }, { password: hashedPassword })  


      return res.status(200).send({
        success: true,
        message: 'Password updated successfully!'
      })   

   }


    } catch (error) {
      console.log(error)

      res.status(500).send({
        success: false,

      })
    }


}

export default handler