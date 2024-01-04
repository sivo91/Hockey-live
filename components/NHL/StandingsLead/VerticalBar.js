/* // VerticalBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Votes',
      data: [12, -19, 3, -5, 2, -3], // Mix of positive and negative values
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const VerticalBarChart = () => {
  return <Bar data={data} options={options} />;
};





export default VerticalBarChart;
 */





// MixedBarChart.js
import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);



const VerticalBarChart = ({ nhl }) => {

const sortedTeams = [...nhl].sort((a, b) => b.points - a.points);



let playOff = []
let vacation = []

for(let i = 0; i < sortedTeams.length; i++) {
  if(i < 16) {
    playOff.push(sortedTeams[i])
  } else {
    vacation.push(sortedTeams[i])
  }
}

// play off team + points
let teamPlayOff = []
let teamPlayOffPoints = []

for(let i = 0; i < playOff.length;i++) {
  teamPlayOff.push(playOff[i].shortname)
  teamPlayOffPoints.push(playOff[i].points)
}

let vacaTeam = []
let vacaPoints = []

for(let i = 0; i < playOff.length; i++) {
  vacaTeam.push(playOff[i].shortname)
  vacaPoints.push(playOff[i].points)
}


const data = {
  labels: teamPlayOff,
  datasets: [
    {
      type: 'bar',
      label: 'Stanley Cup',
      data: teamPlayOffPoints,
     /*  backgroundColor: ['#ff8882', '#b9c9ed', '#f2b3c8',' #befade','#ffcfba', '#e3e098','#a9f7fc','#c995fc','#f4ffb3','#f2f9fa', '#dad1f0','#fa91f3' ], */
      backgroundColor: ['#87a1ff' ],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    /* {
      type: 'bar',
      label: 'On Vacation',
      data: [-12, -19, -3, -5, -2, -2, -3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    } */
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};



  return (
    <Bar data={data} options={options} />

  )
};

export default VerticalBarChart; 



