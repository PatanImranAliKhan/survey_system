import React from 'react';
import { Pie } from "react-chartjs-2";

export default function PieChart({ data, options, bgcolors }) {
    return (
        <div className='chartvisual'>
            <div className='chart-container'>
                {console.log(bgcolors)}
                <Pie data={{
                    labels: options,
                    datasets: [
                        {
                            label: "Pie Chart Visualization",
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
