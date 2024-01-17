

import axios from 'axios';
import MostPTS from '@/modules/MostPTS';
import MostGoals from '@/modules/MostGoals';
import MostAssists from '@/modules/MostAssists';
import MostPIM from '@/modules/MostPIM';
import connectDB from "@/utils/db"



const handler = async (req, res) =>  {

 await connectDB();
 
   try {
 

    if (req.method !== 'GET') {
      return res.status(401).json({
        success: false,
        message: 'Invalid request method!',
      });
    }



    const mostPTS = await MostPTS.find({})
    const mostGoals = await MostGoals.find({})
    const mostAssists = await MostAssists.find({})
    const mostPIM = await MostPIM.find({})

    const data = { mostPTS, mostGoals, mostAssists, mostPIM}
    
  


    return res.status(201).send({
      success: true,
      message: 'Data from mongoDB',
      data

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