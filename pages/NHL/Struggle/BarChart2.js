





// components/BarChart.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const BarChart2 = ({ west }) => {



let sestka = []

for(let i = 0; i < west?.length;i++) {
  if( i > 7 ) {
    sestka.push(west[i])
  }
}

let teamNames = [];
let teamPoints = [];

for (let i = 0; i < sestka?.length; i++) {
    teamNames.push(sestka[i].shortname); 
     teamPoints.push(parseInt(-Number(sestka[i].points))); 
}




const data = {
  labels: teamNames,
  datasets: [
    {
      label: 'Western Conference',
       data: teamPoints.reverse(),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'red',
        'blue',
        'brown',
        'green',
        'purple',
        'orange',
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

      return (
        <Bar data={data} options={options} />
      )
  
 
}

export default BarChart2;
