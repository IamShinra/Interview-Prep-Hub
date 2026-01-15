import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function Piechart() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Your Highest Streak", "Global Highest Streak"],
                datasets: [{
                    data: [30, 70],
                    borderColor: [
                        "#5440FF",
                    ],
                    backgroundColor: [
                        "#5440FF", "#FF6F61"
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                cutout: '60%', // Adjust the cutout percentage for the doughnut shape
                rotation: -90, // Rotate the chart to start from the top
                circumference: 180, // Set the circumference to half circle (180 degrees)
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center', // Center align the legend
                        labels: {
                            boxWidth: 15, // Adjust the size of the legend box
                            // padding: 15,  // Add some padding between the legend items
                            horizontal: true, // Set the legend in horizontal mode
                            
                        }
                    }
                }
            },
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div className="overflow-hidden flex mx-auto my-auto items-center">
            <div className='pt-0 rounded-xl w-full my-auto shadow-xl pb-2'>
                <canvas id='myChart' ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Piechart;
