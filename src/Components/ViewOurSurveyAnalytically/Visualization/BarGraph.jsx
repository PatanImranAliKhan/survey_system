import React from 'react';
import { Bar } from "react-chartjs-2";

export default function BarGraph({ data, options, bgcolors }) {
    return (
        <div className='chartvisual'>
            <div className="chart-container">
                <Bar data={{
                    labels: options,
                    datasets: [
                        {
                            label: "Bar Graph Visualization",
                            backgroundColor: bgcolors,
                            borderColor: "rgb(255, 99, 132)",
                            data: data,
                        },
                    ],
                }} />
            </div>
        </div>
    )
}
