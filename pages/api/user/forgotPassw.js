
import connectDB from "@/utils/db"
import User from "@/modules/User"
import Shelter from "@/modules/Shelter"
import nodeMailer from 'nodemailer'


const handler = async (req, res) =>  {

 await connectDB();

   try {



    if (req.method !== 'POST') {
      return res.status(401).json({
        success: false,
        message: 'Invalid request method!',
      });
    }

    const emailFP = req.body.emailFP;
    //console.log(emailFP)


    const userExist = await User.findOne({ email: emailFP })
    const shelterExist = await Shelter.findOne({ email: emailFP })




    //  *******  USER *******
    if(userExist) {

      const id = userExist._id.toString()

      const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          tls: {
              rejectUnauthorized: false
          }
          });

          let msg = `Click 'Reset Password' link to set up a new password.`
          
          // create link and add id of user as query, we can find user
          // and reset user passw by id
          const link = `<a href="https://anubis-donation.vercel.app/auth/resetPassword?id=${id}">Reset Password</a>`;
          //console.log(link)


      
          const info = await transporter.sendMail({
            from: `p.sivak91@gmail.com`, // sender address
            to: `${emailFP}`, 
            subject: "Reset Password", // Subject line
            text: "Reset Password", // plain text body
            html: `
              <b>Instruction to reset password.</b><br/>
              <b>${msg} </b><br/>
              ${link}
              ` 
          });
    

          
        return res.status(201).json({
          success: true,
          message: `The email has been sent! We will contact you shortly!`
          })
    }



    //  *******  SHELTER *******
     if(shelterExist) {


    
      const id = shelterExist._id.toString()

      const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          tls: {
              rejectUnauthorized: false
          }
          });

          let msg = `Click 'Reset Password' link to set up a new password.`
          
          // create link and add id of user as query, we can find user
          // and reset user passw by id
          const link = `<a href="https://anubis-donation.vercel.app/auth/resetPassword?id=${id}">Reset Password</a>`;
          //console.log(link)


      
          const info = await transporter.sendMail({
            from: `p.sivak91@gmail.com`, // sender address
            to: `${emailFP}`, 
            subject: "Reset Password", // Subject line
            text: "Reset Password", // plain text body
            html: `
              <b>Instruction to reset password.</b><br/>
              <b>${msg} </b><br/>
              ${link}
              ` 
          });
    
        return res.status(201).json({
          success: true,
          message: `The email has been sent! We will contact you shortly!`
          })
    }


     if(!userExist || !shelterExist) {
        return res.status(404).send({
            success: false,
            message: 'Email does not exist!'
          })
        }
 
    

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
   }


 

  }




export default handler 