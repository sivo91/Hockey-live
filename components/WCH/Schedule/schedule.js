











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
import { id } from 'date-fns/locale'




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




let allGames = [];
if (schedule) {
  Object.values(schedule).forEach(gamesForDay => {
    allGames = allGames.concat(gamesForDay);
  });
}

allGames.sort((a, b) => new Date(a.date) - new Date(b.date));
console.log(allGames);

let groupedGames = [];
let currentGroup = [];
let currentDate = "";


for (let i = 0; i < allGames.length; i++) {

  const gameDate = allGames[i].date.split(' ')[0];
  
  if (currentDate === "") {

    currentDate = gameDate;
    currentGroup.push(allGames[i]);
  } else if (gameDate === currentDate) {

    currentGroup.push(allGames[i]);
  } else {

    groupedGames.push(currentGroup);
    currentGroup = [allGames[i]]; 
    currentDate = gameDate; 
  }
}


if (currentGroup.length > 0) {
  groupedGames.push(currentGroup);
}

console.log(groupedGames);


  return (
    <>
           <h3 className='text-center mt-5'>Schedule WCH {year}/{Number(year) + 1}</h3>
           <h4 className='text-center mb-5'>Total games: {allGames.length}</h4>
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


            

            <div>
             {/*   {groupedGames.map((group, groupIndex) => (
                  <div key={groupIndex}>
                     {groupIndex + 1}
                    {group.map((game, gameIndex) => (
                      <div key={game.id}>
                        <h4>Title: Game {gameIndex + 1}</h4>
                        <p>Date: {game.date}</p>
                        <p>Teams: {game.team1short} vs {game.team2short}</p>
                      </div>
                    ))}
                  </div>
                ))} */}


              {groupedGames.map((group, groupIndex) => (
                 <div key={groupIndex} className='mt-4'>
                    <div className="alert alert-primary text-center fw-semibold game-box" role="alert">
                      Game Day {groupIndex + 1}
                    </div>
                  {group.map((game) => ( 
                    <Link href={`#`} key={game.id} 
                          style={{ textDecoration: 'none', color: 'black' }}>
                      <div className='border rounded-2 hover pt-2 my-1 pb-1 cursor game-box'>
                        <p className='text-center m-0'>{game.date.substring(0, 10)}</p>
                        <hr className='mx-5 my-1'/>
                        <div className='d-flex justify-content-evenly'>
                          <div className='d-flex'>
                            {logo(game.team1short, 30, 30)}
                            <h4 className='ms-3'>{game.score.goals1}</h4>
                          </div>
                          <span>vs</span>
                          <div className='d-flex'>
                            <h4 style={{ position: 'relative', top: '-3px' }} className='me-3'>{game.score.goals2}</h4>
                            {logo(game.team2short, 30, 30)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
               </div>
              ))}

            </div>
                    


            <style>{`

              .game-box {
                position:relative;
                max-width: 700px;
                margin: 0 auto;
              }
 
              .hover:hover {
                border: 1px dashed black!important;
                background-color: #f2f2f2;
              }
            
            `}</style>

            </>
          )
        }
      
     


       <Link href={'/'}
            style={{ textDecoration: 'none', width: '200px' }}
            className='btn btn-primary rounded-1 vstack mx-auto my-5'>
        Back
      </Link>
    </>
  )
}

export default Index