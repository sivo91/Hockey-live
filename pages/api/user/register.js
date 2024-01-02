
import connectDB from "@/utils/db"
import User from "@/modules/User"
import bcrypt from 'bcrypt';
import Shelter from "@/modules/Shelter";


const handler = async (req, res) =>  {

 await connectDB();

  if (req.method !== 'POST') {
      return res.status(401).json({
        success: false,
        message: 'Invalid request method!',
      });
    }


   try {
  
    const participant = req.body.participant;
    const email = req.body.email;
    const password = req.body.password;
    const shelterName = req.body.shelterName
    const shelterCity = req.body.shelterCity
    const shelterState = req.body.shelterState


    if(participant === 'supporter') {

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
        participant,
        email,
        isAdmin: false,
        wishlist: [],
        password: hashedPassword,
      });

      await newUser.save();



      return res.status(201).send({
        success: true,
        message: 'Your account is ready! Please Sign In.'
      })

    }


    if(participant === 'shelter') {
       const shelterExist = await Shelter.findOne({ email })

        if(shelterExist) {
          res.status(404).send({
            success: false,
            message: 'Email already exist!'
          })
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newShelter = new Shelter({
          participant,
          email,
          shelterName,
          shelterCity,
          shelterDonation: 0,
          shelterState,
          stripeID: '0',
          password: hashedPassword,
        });

        await newShelter.save();



        return res.status(201).send({
          success: true,
          message: 'Account created !'
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