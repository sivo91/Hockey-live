import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const Index = ({ schedule, id }) => {
    let gameData = [];
    let gameLabels = [];
    let backgroundColors = []; 
    const today = new Date(); 

    if (schedule) {
        schedule.sort((a, b) => new Date(a.date) - new Date(b.date));

        schedule.forEach(game => {
            let isWin = false;
            let opponentShortName;
            let gameDate = new Date(game.date);
            let isFutureGame = gameDate > today; 

            if (id === game.team1short) {
                opponentShortName = game.team2short; 
                isWin = parseInt(game.score.goals1) > parseInt(game.score.goals2);
            } else if (id === game.team2short) {
                opponentShortName = game.team1short; 
                isWin = parseInt(game.score.goals1) < parseInt(game.score.goals2);
            }

            gameData.push(isWin ? 1 : -1); // 1 for win, -1 for loss
            gameLabels.push(`${opponentShortName}`); // opponent shortname

            // Assign color based on whether the game is in the future
            backgroundColors.push(isFutureGame ? 'rgba(255, 255, 255)' : 'rgba(52, 107, 235)');
        });
    }

    const data = {
        labels: gameLabels,
        datasets: [
            {
                label: 'Game Results',
                data: gameData,
                borderColor: 'rgb(52, 107, 235)',
                backgroundColor: backgroundColors, // Use the array of colors for each point
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 5
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Game Wins and Losses'
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        if (value === 1) {
                            return 'Win  ';
                        } else if (value === -1) {
                            return 'Loss  ';
                        }
                        return '';
                    }
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default Index;
