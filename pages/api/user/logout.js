
import { serialize } from "cookie";

const handler = async (req, res) =>  {

 try {
  
    const serialised = serialize("userToken", null, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== 'production', 
      maxAge: -1, // - mean no token
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

   return res.status(201).json({ 
    success: true,
    message: "Successfuly logged out!"
   });
  

 } catch (error) {
   console.log(error)
   res.status(500).send({
    success: false,
    message: 'Something wrong'
   })
 }
 
}

export default handler