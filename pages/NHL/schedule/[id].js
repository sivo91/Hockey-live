import React, {useState, useEffect, useCallback , useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Chart from 'chart.js/auto';




const Index = () => {

const router = useRouter()
const { id } = router.query
const chartRef = useRef(null);




const [gameData, setGameData] = useState()

 const fetchGameData = useCallback(async ()=> {
  
 const options = {
    method: 'GET',
    //url: `https://hockey-live-sk-data.p.rapidapi.com/games/NHL/2023`,
    url: `https://hockey-live-sk-data.p.rapidapi.com/game/${id}`,
    params: {
      key: process.env.NEXT_PUBLIC_API_KEY2,
      tz: 'America/New_York'
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
    }
  };

    try {
      const res = await axios.request(options);
      console.log(res.data);
      setGameData(res.data)
    } catch (error) {
      
      console.log(error)
    }
  }, [id]);  // Dependencies array

  useEffect(() => {
    fetchGameData();
   
    const intervalId = setInterval(fetchGameData, 5000000);

    return () => clearInterval(intervalId);
  }, [fetchGameData]);

  console.log(gameData)

  


  // Initialize Chart
  useEffect(() => {


const labels = ['Points','Wins', 'asdf','asdf','asdf', 'asdf', 'asdf','asdf']

const team1Data = [
  gameData?.stats?.team1?.points,
  gameData?.stats?.team1?.wins,
  gameData?.stats?.team1?.shutouts,
  gameData?.stats?.team1?.score,
  gameData?.stats?.team1?.scoreinpp,
  gameData?.stats?.team1?.scoreinsh,
  gameData?.stats?.team1?.gp,

  
];
const team2Data = [ 
  -Number(gameData?.stats?.team2?.points),
  -Number(gameData?.stats?.team2?.wins),
  -Number(gameData?.stats?.team2?.shutouts),
  -Number(gameData?.stats?.team2.score),
  -Number(gameData?.stats?.team2.scoreinpp),
  -Number(gameData?.stats?.team2?.scoreinsh),
  -Number(gameData?.stats?.team2?.gp)  
];

const backgroundColorForTeam1 = team1Data.map((value, index) => {
  return value < Math.abs(team2Data[index]) ? '#66d48b' : '#ff303d';
});

const backgroundColorForTeam2 = team2Data.map((value, index) => {
  return Math.abs(value) < team1Data[index] ? '#66d48b' : '#ff303d';
});

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Team 1',
      data: team1Data,
      borderColor: '#d1d1d1',
      backgroundColor: backgroundColorForTeam1,
    },
    {
      label: 'Team 2',
      data: team2Data,
      borderColor: '#d1d1d1',
      backgroundColor: backgroundColorForTeam2,
    }
  ]
};

    const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 1,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
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




  return (
   <>

      <h3 className='text-center my-5'>Game Summaries</h3>

      <div style={{position: 'relative', maxWidth: '1000px', margin: '0 auto'}}>
        <canvas ref={chartRef} />
      </div>
      

       <div className="game-stats">

            <div className="team-stats ps-3">
                <h2 className='text-end'>team1</h2>
               <div className='d-flex justify-content-between border-bottom pt-1'>
                 <h5><span class="badge bg-info px-3">5</span></h5>
                 <h5>G</h5>
               </div>

               <div className='d-flex justify-content-between border-bottom pt-1'>
                 <h5><span class="badge bg-success px-3">25</span></h5>
                 <h5>PIM</h5>
               </div>

                <h5>Penalties: 55</h5>
                {/* More stats */}
            </div>

            <div className="divider"></div>

            <div className="team-stats pe-3">
                <h2 className='text-start'>team2</h2>

                <div className='d-flex justify-content-between border-bottom pt-1'>
                 <h5>G</h5>
                 <h5><span class="badge bg-info px-3">5</span></h5>
               </div>
                <div className='d-flex justify-content-between border-bottom pt-1'>
                 <h5>PIM</h5>
                 <h5><span class="badge bg-danger px-3">45</span></h5>
               </div>

                <h5>Penalties: 11</h5>
                {/* More stats */}
            </div>
        </div>



        <style>{`
          .game-stats {
              display: flex;
              justify-content: space-around;
              align-items: center;
              text-align: center;
              height: 100vh;
              max-width: 1100px;
              margin: 0 auto;
          }

          .team-stats {
              width: 49%; 
             
          }

          .divider {
              border: 1px dotted black; 
              height: 100%;
          }

        `}</style>
   </>
  )
}

export default Index