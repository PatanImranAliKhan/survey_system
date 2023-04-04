import React, { useState, useEffect } from 'react'
import Chart from "chart.js/auto";
import { Pie,Bar } from "react-chartjs-2";

const PieChart = ({data,options,bgcolors}) => {
// const labels = ["January", "February", "March", "April", "May", "June"];
  return (
    <div>
      {console.log(bgcolors)}
      <Pie data={{
  labels: options,
  datasets: [
    {
      label: "My First dataset",
      // backgroundColor: "rgb(255, 99, 132)",
      backgroundColor:bgcolors,
      borderColor: "rgb(255, 99, 132)",
      data:data,
    },
  ],
}} />
    </div>
  );
};

const BarChart = ({data,options,bgcolors}) => {
  return (
    <div>
      <Bar data = {{
  labels: options,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor:bgcolors,
      borderColor: "rgb(255, 99, 132)",
      data:data,
    },
  ],
}} />
    </div>
  );
};
export default function ViewAnalyticalresponse({Responses,options}) {
    const [data,setData]=useState(Responses)
    useEffect(() => {
      console.log(Responses,options)
    }, [])
    

  return (
    <div>
       {/* <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">ViewAnalyticalresponse</button> */}
       <PieChart data={Object.values(data)} options ={options} bgcolors = {options.map((op)=>`#${Math.floor(Math.random()*16777215).toString(16)}`)}/>
       <BarChart data={Object.values(data)} options ={options} bgcolors = {options.map((op)=>`#${Math.floor(Math.random()*16777215).toString(16)}`)}/>
    </div>
  )
}
