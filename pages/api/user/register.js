
import connectDB from "@/utils/db"
import User from "@/modules/User"
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
  
 
    const email = req.body.email;
    const password = req.body.password;



      const userExist = await User.findOne({ email })

      if(userExist) {
        res.status(404).send({
          success: false,
          message: 'Email already exist!'
        })
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        isAdmin: false,
        password: hashedPassword,
      });

      await newUser.save();


      return res.status(201).send({
        success: true,
        message: 'Your account is ready! Please Sign In.'
      })

    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error! Try it later.',
    });
   }
  }




export default handler