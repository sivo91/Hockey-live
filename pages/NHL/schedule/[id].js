import React, {useState, useEffect, useCallback , useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Chart from 'chart.js/auto';
import logo from '@/utils/gameDetailsLogo'




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

  //console.log(gameData)


  // Initialize Chart
  useEffect(() => {




const team1Data = [
  gameData?.stats?.team1?.gp,
  gameData?.stats?.team1?.losts,
  gameData?.stats?.team1?.points,
  gameData?.stats?.team1?.wins,  
];
const team2Data = [ 
  -Number(gameData?.stats?.team2?.gp),
  -Number(gameData?.stats?.team2?.losts),
  -Number(gameData?.stats?.team2?.points),
  -Number(gameData?.stats?.team2?.wins),
];

const labels = ['GP','Losts', 'Points','Wins'];

// Find the index of "Losts"
const lostsIndex = labels.indexOf('Losts');

const backgroundColorForTeam1 = team1Data.map((value, index) => {
  if (index === lostsIndex) {
    return '#ffc800'; 
  }
  return value > Math.abs(team2Data[index]) ? '#41cf00' : '#ff303d';
});

const backgroundColorForTeam2 = team2Data.map((value, index) => {
  if (index === lostsIndex) {
    return '#ff6a00'; 
  }
  return Math.abs(value) > team1Data[index] ? '#41cf00' : '#ff303d';
});

const data = {
  labels: labels,
  datasets: [
    {
      label: gameData?.team1short,
      data: team1Data,
      borderColor: '#d1d1d1',
      backgroundColor: backgroundColorForTeam1,
    },
    {
     label: gameData?.team2short,
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
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += Math.abs(context.parsed.x);
            }
            return label;
          }
        }
      }
    }
  },
};

    const chart = new Chart(chartRef.current, config);

    // Cleanup
    return () => chart.destroy();
  }, [gameData]);


  let goals_team1 = []
  let goals_team2 = []

 console.log(gameData)
 

/*   const teamShorts = gameData?.goals.map(item => item.teamshort);
  console.log(gameData) */
 
  
  
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
  } else {
    return '#ff3300'; 
  }
}

const GP = (x, y) => {
  if (Number(x) > Number(y)) {
    return '#1eab02'; 
  } else {
    return '#ff3300'; 
  }
}



  return (
   <>

      <h3 className='text-center my-5'>Game Summaries</h3>

       {/* header */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4 col-md-3 text-center">
             <div>
              { logo(gameData?.team1short)}
               <h3>{gameData?.team1long}</h3>
             </div>
             <h1>{gameData?.score?.goals1}</h1>
          </div>

          <div className="col-1 fs-1 pt-4">-</div>

          <div className="col-4 col-md-3 text-center">
              <div>
                 { logo(gameData?.team2short)}
                 <h3>{gameData?.team2long}</h3>
              </div>
              <h1>{gameData?.score?.goals2}</h1>
          </div>
        </div>
      </div>
      <hr className='mx-5'/>



     {/* accordion graph */}
     <div className='mx-2'>
       <div className="accordion accordion-flush border rounded-2" 
           style={{position: 'relative', maxWidth: '900px', margin: ' 0 auto'}} 
           id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Graph
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div style={{position: 'relative', maxWidth: '1000px', margin: '0 auto'}}>
                  <canvas ref={chartRef} />
                </div>
          </div>
        </div>
      </div>
     </div>


     
 

      


   {/* stats  */}
   <div className="container-fluid my-5">
        <div className="row justify-content-center ">
           <div className="col-11 col-md-6 justify-content-center border rounded-3 py-3">
             
           

               {/* Score in WINS */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                     <span className="badge px-3" 
                          style={{ backgroundColor: GP(gameData?.stats?.team1?.wins, gameData?.stats?.team2?.wins) }}>
                      {gameData?.stats?.team1?.wins}
                    </span>
              </h5>
                <h5>WINS</h5>
               <h5>
                 <span className="badge px-3" 
                          style={{ backgroundColor: GP(gameData?.stats?.team2?.wins, gameData?.stats?.team1?.wins) }}>
                      {gameData?.stats?.team2?.wins}
                    </span>
                </h5>
             </div>
               {/* PIM */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                <span className="badge px-3" 
                      style={{ backgroundColor: PIM(gameData?.stats?.team1?.penaltyminutes, gameData?.stats?.team2?.penaltyminutes) }}>
                  {gameData?.stats?.team1?.penaltyminutes}
                </span>
              </h5>
                <h5>PIM</h5>
               <h5>
                  <span className="badge px-3" 
                        style={{ backgroundColor: PIM(gameData?.stats?.team2?.penaltyminutes, gameData?.stats?.team2?.penaltyminutes) }}>
                    {gameData?.stats?.team2?.penaltyminutes}
                  </span>
                </h5>
             </div>

               {/* GP */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                <span className="badge px-3" 
                      style={{ backgroundColor: GP(gameData?.stats?.team1?.gp, gameData?.stats?.team2?.gp) }}>
                  {gameData?.stats?.team1?.gp}
                </span>
              </h5>
                <h5>GP</h5>
               <h5>
                  <span className="badge px-3" 
                        style={{ backgroundColor: GP(gameData?.stats?.team2?.gp, gameData?.stats?.team1?.gp) }}>
                    {gameData?.stats?.team2?.gp}
                  </span>
                </h5>
             </div>

             {/* Losts */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                <span className="badge px-3" 
                      style={{ backgroundColor: GP(gameData?.stats?.team1?.losts, gameData?.stats?.team2?.losts) }}>
                  {gameData?.stats?.team1?.losts}
                </span>
              </h5>
                <h5>Losts</h5>
               <h5>
                  <span className="badge px-3" 
                        style={{ backgroundColor: GP(gameData?.stats?.team2?.losts, gameData?.stats?.team1?.losts) }}>
                    {gameData?.stats?.team2?.losts}
                  </span>
                </h5>
             </div>

             {/* points  */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                <span className="badge px-3" 
                      style={{ backgroundColor: GP(gameData?.stats?.team1?.points, gameData?.stats?.team2?.points) }}>
                  {gameData?.stats?.team1?.points}
                </span>
              </h5>
                <h5>Points</h5>
               <h5>
                  <span className="badge px-3" 
                        style={{ backgroundColor: GP(gameData?.stats?.team2?.points, gameData?.stats?.team1?.points) }}>
                    {gameData?.stats?.team2?.points}
                  </span>
                </h5>
             </div>

             {/* Score */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                   <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team1?.score}
                  </span>
              </h5>
                <h5>Score</h5>
               <h5>
                  <span className="badge px-3 bg-light text-dark border"> 
                        {gameData?.stats?.team2?.score}
                  </span>
                </h5>
             </div>

             {/* Score in PP */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                    <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team1?.scoreinpp}
                  </span>
              </h5>
                <h5>PPG</h5>
               <h5>
                 <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team2?.scoreinpp}
                  </span>
                </h5>
             </div>

             
             {/* Score in SHG */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                    <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team1?.scoreinsh}
                  </span>
              </h5>
                <h5>SHG</h5>
               <h5>
                 <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team2?.scoreinsh}
                  </span>
                </h5>
             </div>

             {/* Score in SHUTOUTS */}
             <div className='d-flex justify-content-between border-bottom pt-2'>
               <h5>
                    <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team1?.shutouts}
                  </span>
              </h5>
                <h5>SHUTOUTS</h5>
               <h5>
                 <span className="badge px-3 bg-light text-dark border"> 
                    {gameData?.stats?.team2?.shutouts}
                  </span>
                </h5>
             </div>

           </div>
        </div>
   </div> 
      
  <div className="container-fluid">
    <div className="row justify-content-center">

      <div className="col-11 col-md-3 mt-2">
        <div className="card">
          <div className="card-header">
             The Best Player: {gameData?.stats?.team1?.bestplayer?.name}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">G: {gameData?.stats?.team1?.bestplayer?.goals}</li>
            <li className="list-group-item">A: {gameData?.stats?.team1?.bestplayer?.asists}</li>
            <li className="list-group-item">P: {Number(gameData?.stats?.team1?.bestplayer?.asists) + 
                                                Number(gameData?.stats?.team1?.bestplayer?.goals)}</li>
            
          </ul>
        </div>
      </div>

      <div className="col-11 col-md-3 mt-2">
        <div className="card">
          <div className="card-header">
             The Best Player: {gameData?.stats?.team2?.bestplayer?.name}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">G: {gameData?.stats?.team2?.bestplayer?.goals}</li>
            <li className="list-group-item">A: {gameData?.stats?.team2?.bestplayer?.asists}</li>
            <li className="list-group-item">P: {Number(gameData?.stats?.team2?.bestplayer?.asists) + 
                                                Number(gameData?.stats?.team2?.bestplayer?.goals)}</li>
            
          </ul>
        </div>
      </div>

    </div>
  </div>
       



        <style>{`
         

        `}</style>
   </>
  )
}

export default Index