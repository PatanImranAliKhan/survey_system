import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from './Visualization/PieChart';
import BarGraph from './Visualization/BarGraph';

export default function ViewAnalyticalresponse({ Responses, index, options }) {

  const [data, setData] = useState(Responses[index])

  useEffect(() => {
    console.log(Responses[index]);
    console.log(options);
  }, [])


  return (
    <div>
      {
        data ?
          <div className='row'>
            <PieChart className='col-lg-6 col-lg-12' data={Object.values(data)} options={options} 
              bgcolors={options.map((op) => `#${Math.floor(Math.random() * 16777215).toString(16)}`)} />
            <BarGraph className='col-lg-6 col-lg-12' data={Object.values(data)} options={options} 
              bgcolors={options.map((op) => `#${Math.floor(Math.random() * 16777215).toString(16)}`)} />
          </div>
          :
          
          <div>
            <p>No Responses Till Yet</p>
          </div>
      }
    </div>
  )
}
