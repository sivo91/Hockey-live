





import React, {useState, useEffect, useCallback , useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Chart from 'chart.js/auto';
import logo from '@/utils/gameDetailsLogo'
import Link from 'next/link';
import { FaHockeyPuck } from "react-icons/fa";
import { TfiTime } from "react-icons/tfi";




const Index = () => {

const router = useRouter()
const { id } = router.query
const chartRef = useRef(null);


const [gameData, setGameData] = useState(null)

console.log(gameData)

 const fetchGameData = useCallback(async () => {
  if (!id) {
    console.log("Can't find game");
    return;
  }

  try {
    const queryParam = encodeURIComponent(id);
    const res = await axios.get(`/api/NHL/gameDetails2?id=${queryParam}`); 
    setGameData(res.data.data);
  } catch (error) {
    console.log(error);
  }
}, [id]);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);



  // Chart
  useEffect(() => {




const team1Data = [
  gameData?.stats?.team1?.gp,
  gameData?.stats?.team1?.losts,
  gameData?.stats?.team1?.points,
  gameData?.stats?.team1?.wins,  
];

const team2Data = [ 
  gameData?.stats?.team2?.gp,
  gameData?.stats?.team2?.losts,
  gameData?.stats?.team2?.points,
  gameData?.stats?.team2?.wins,
];

const labels = ['GP','Losts', 'Points','Wins'];

// Find the index of "Losts"
const lostsIndex = labels.indexOf('Losts');

const backgroundColorForTeam1 = team1Data.map((value, index) => {
  if (index === lostsIndex) {
    return '#ff9100';  // yell
  } else if (value > team2Data[index]) {
    return '#41cf00';   // green
  } else if (value == team2Data[index]) {
    return '#d4d4d4';  // gray
  } else {
    return '#ff303d';  // red
  }
});

const backgroundColorForTeam2 = team2Data.map((value, index) => {
  if (index === lostsIndex) {
    return '#ff9100'; 
  } else if (value > team1Data[index]) {
    return '#41cf00';
  } else if (value == team1Data[index]) {
    return '#d4d4d4';
  } else {
    return '#ff303d';
  }
});

const data = {
  labels: labels,
  datasets: [
     {
      label: gameData?.team1short, // team1
      data: team1Data,
      borderColor: '#d1d1d1',
      backgroundColor: backgroundColorForTeam1,
    },
    {
      label: gameData?.team2short, // team2
      data: team2Data,
      borderColor: '#d1d1d1',
      backgroundColor: backgroundColorForTeam2,
    },
   
  ]
};


const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Game Details'
      }
    }
  },
};

    const chart = new Chart(chartRef.current, config);

    // Cleanup
    return () => chart.destroy();
  }, [gameData]);


 //console.log(gameData)
 

  
  let goalsTeam1 = [];
  let goalsTeam2 = [];

  if(gameData && gameData?.goals) {
    for (let i = 0; i < gameData?.goals?.length; i++) {
       let item = gameData.goals[i];
        if (item.teamshort === gameData?.team1short) {
            goalsTeam1.push(item);
        }
        if (item.teamshort === gameData?.team2short) {
            goalsTeam2.push(item);
        }
       
    }
  }

/*   console.log(goalsTeam1)
  console.log(goalsTeam2) */


  const PIM = (x, y) => {
      if (Number(x) < Number(y)) {
        return '#1eab02'; 
      } else if (Number(x) > Number(y)) {
        return '#ff3300'; 
      } else {
      return '#7d7b72'
      }
    }

  const GP = (x, y) => {
    if (Number(x) > Number(y)) {
      return '#1eab02'; 
    } else if (Number(x) < Number(y)) {
      return '#ff3300'; 
    } else {
      return '#7d7b72'
    }
  }






  return (
   <>

      <h3 className='text-center my-5'>Game Summaries</h3>
      <h3 className='text-center'>Game ID: {id}</h3>

     

     




      <Link href={'/'}
            style={{textDecoration: 'none', width: '150px'}}
            className='btn btn-primary vstack mx-auto my-5'>
        Back
      </Link>


        <style>{`


            .timeline-container {
                position: relative;
                max-width: 800px;
                height: 400px;
                margin: 0 2px;
            }

            .timeline:before {
                content: '';
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
                bottom: 0;
                width: 1px;
                background: #c5c5c5;
            }

            .timeline-item {
                position: relative;
                width: 50%;
                padding: 5px;
                box-sizing: border-box;
            }

            .timeline-item.left {
                left: 0;
            }

            .timeline-item.right {
                left: 50%;
            }

            .timeline-content {
                padding: 10px;
                width: auto;
                background: #f8f9fa;
                border-radius: 4px;
                position: relative;
                border-radius: 7px;
                border: 1px dashed black;
            }



        `}</style>
   </>
  )
}

export default Index