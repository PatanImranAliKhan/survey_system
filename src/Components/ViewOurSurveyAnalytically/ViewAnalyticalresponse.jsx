import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from './Visualization/PieChart';

export default function ViewAnalyticalresponse({Responses, index}) {

    useEffect(() => {
      console.log(Responses[index]);
    }, [])
    

  return (
    <div>
      
    </div>
  )
}
