



import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);




const Index = ({ schedule, id }) => {
 
     let gameData = [];
    let gameLabels = [];

   if(schedule) {
     schedule.sort((a, b) => new Date(a.date) - new Date(b.date));

   

     schedule.forEach( game => {

        let isWin = false;
        let opponentShortName;

        if (id === game.team1short) {
            opponentShortName = game.team2short; // opponent is team 2
            isWin = parseInt(game.score.goals1) > parseInt(game.score.goals2);
        } else if (id === game.team2short) {
            opponentShortName = game.team1short; // opponent is team 1
            isWin = parseInt(game.score.goals1) < parseInt(game.score.goals2);
        }

        gameData.push(isWin ? 1 : -1); // 1  win, -1  loss
        gameLabels.push(`${opponentShortName}`); // oponent shortname
        
    });
   }



    const data = {
        labels: gameLabels,
        datasets: [
            {
                label: 'Game Results',
                data: gameData,
                borderColor: 'rgb(52, 107, 235)',
                backgroundColor: 'rgba(52, 107, 235)',
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 5
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Game Wins and Losses'
            }
        },
        scales: {
            y: {
                ticks: {
                    // Customize the Y-axis labels
                    callback: function(value) {
                        if (value === 1) {
                            return 'Win  ';
                        } else if (value === -1) {
                            return 'Loss ';
                        }
                        return '';
                    }
                }
            }
        }
    };

    return (
        <Line data={data} options={options} />
    );
};

export default Index;
