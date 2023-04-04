import React from 'react';
import { Bar } from "react-chartjs-2";

export default function BarGraph({chartData}) {
    return (
        <div>
            <div className="chart-container">
                <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "user Rsponses"
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}
