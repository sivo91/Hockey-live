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



const VerticalBarDown = ({ nhl }) => {

const sortedTeams = [...nhl].sort((a, b) => a.points - b.points);



let playOff = []
let vacation = []

for(let i = 0; i < sortedTeams.length; i++) {
  if(i < 16) {
    playOff.push(sortedTeams[i])
  } else {
    vacation.push(sortedTeams[i])
  }
}

let vacaTeam = []
let vacaPoints = []

for(let i = 0; i < playOff.length; i++) {
  vacaTeam.push(playOff[i].shortname)
  vacaPoints.push(-Number(playOff[i].points));
}

// sorted 
const sortedVacation = [...vacaPoints].sort((a, b) => a.points - b.points).reverse()


const data = {
  labels: vacaTeam,
  datasets: [
   /*  {
      type: 'bar',
      label: 'Stanley Cup P.O.',
      data: vacaTeam,
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }, */
    {
      type: 'bar',
      label: 'On Vacation',
      data: sortedVacation,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }
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

export default VerticalBarDown; 



