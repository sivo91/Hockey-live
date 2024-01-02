
import connectDB from "@/utils/db"
import User from "@/modules/User"
import Shelter from "@/modules/Shelter";
import bcrypt from 'bcrypt';


const handler = async (req, res) =>  {

 await connectDB();

  if (req.method !== 'POST') {
      return res.status(401).json({
        success: false,
        message: 'Invalid request method!',
      });
    }

   try {
    
    const id = req.body.id
    const password = req.body.password;


    const user = await User.findById(id)
    const shelter = await Shelter.findById(id)

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    //  ************  USER  ********
    if(user) {

      await User.findByIdAndUpdate(id, { $set: { password: hashedPassword } }, { new: true });

    

      return res.status(201).send({
        success: true,
        message: 'Password Updated. Login now.'
      })
      
    }


    // ***********  SHELTER *******
    if(shelter) {

      await Shelter.findByIdAndUpdate(id, { $set: { password: hashedPassword } }, { new: true });

    

      return res.status(201).send({
        success: true,
        message: 'Password Updated. Login now.'
      })
      
    }

    

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error! Try it later.',
    });
   }
  }




export default handler