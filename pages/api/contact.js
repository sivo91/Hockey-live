



import nodeMailer from 'nodemailer'


const handler = async (req, res) =>  {


   try {

    if (req.method !== 'POST') {
      return res.status(401).json({
        success: false,
        message: 'Invalid request method!',
      });
    }

      const name = req.body.name
      const email = req.body.email
      const msg = req.body.msg
      const selectSubject = req.body.selectSubject
    


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
      
          const info = await transporter.sendMail({
            from: `p.sivak91@gmail.com`, 
            to: `p.sivak91@gmail.com`,
            subject: "Hockey-Stats", 
            text: "Hockey-Stats", 
            html: `
              <b>Name: ${name}</b><br/>
              <b>Email: ${email}</b><br/>
              <b>Subject: ${selectSubject}</b><br/>
              <b>Message: ${msg} </b><br/>
              
              ` 
          }); 
    

          
        return res.status(201).json({
          success: true,
          message: `The email has been sent! We will contact you shortly!`
          })
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Something went wrong!',
        });
      }
  }




export default handler  
