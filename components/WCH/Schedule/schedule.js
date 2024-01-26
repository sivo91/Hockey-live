











/* eslint-disable @next/next/no-img-element */




import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback , useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'
import logo from '@/utils/wchSingleTeam'
import teamFullName from '@/utils/teamFullName'
import { BsArrowUpSquare } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { selectYear } from '@/reduxFile/selectYearSlice';
import ScrooBtn from '@/utils/ScrollBtnUp'
import { AiOutlineLoading } from "react-icons/ai";
import LineGraph from '@/pages/WCH/team/detailGraph'




const Index = () => {


  const year = useSelector((state) => state.year.year);
  
  const dispatch = useDispatch()
    
 
  const [load, setLoad] = useState(false)
  const [schedule, setSchedule] = useState(null)
  const [noRoster, setNoRoster] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2023');


 useEffect(() => {
  dispatch(selectYear(selectedYear))
  }, [selectedYear, dispatch]);


 // call data
const fetchGameData = useCallback(async () => {
  try {
    setLoad(true)
    const res = await axios.get(`/api/WCH/schedule?year=${year}`);
    console.log(res.data)
    
    if(res.data) {
      setSchedule(res.data.data)
    }

    setLoad(false)

  } catch (error) {

    console.error(error);

    setLoad(false);
  }
}, [ year]);


  useEffect(() => {
         fetchGameData();
  }, [fetchGameData]);


  
  console.log(schedule)
 
   if(schedule) {

     for (const date in schedule) {

        if (schedule.hasOwnProperty(date)) {
          const gamesOnDate = schedule[date];
          console.log("Date:", date);
          console.log("Games:", gamesOnDate);

    
          gamesOnDate.forEach(game => {
            console.log("Game details:", game);
           
          });
        }
      }
   }



  return (
    <>
           <h3 className='text-center my-5'>Schedule WCH {year}/{Number(year) + 1}</h3>
       {
          load ? (
            <>
              <div className='text-center my-3'>
                <div className="spinner-grow" style={{backgroundImage: 'radial-gradient(circle, red, white)'}} role="status">
                </div>
              </div>
            </>
          ) : (
            <>
               
               
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-11 col-md-5"></div>
                </div>
              </div>
             


            <style>{`

          
            `}</style>

            </>
          )
        }
      
     


       <Link href={'/'}
            style={{ textDecoration: 'none', width: '200px' }}
            className='btn btn-primary rounded-1 vstack mx-auto'>
        Back
      </Link>
    </>
  )
}

export default Index