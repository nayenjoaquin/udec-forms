import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React from 'react'
import Loading from "../loading";
import { useEffect, useState } from "react";

const Grafico = (props) => {

    const {index, grafico, data} =  {...props}
    const [loading, setLoading]  = useState(true);
    const [graficos,setGraficos] = useState([[{}]]);
    
    

    useEffect(() => {
              let info = Object.entries(data)
              //console.log(info[1][1])
              //console.log(info[1][1][index])
              //console.log(info[1][1][index].alter)
              for(let i = 0; i < info[1][1].length; i++){
                let size = info[1][1][i].alter.length
                let grafico = []
                for(let j = 0; j < size; j++){
                    let n = info[1][1][i].alter[j].title
                    let num = info[1][1][i].alter[j].answers
                    grafico.push({name: n, value: num})
                    //console.log("nombre " + n+ " cant: " + num)
                  }
                graficos.push(grafico)
              }
              setGraficos(graficos)
        
              setLoading(false);
              
    },[]);


    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        indexx
      }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
  
      return (
        <>
        {
            loading===false?
                <PieChart width={400} height={400}>
                  <Pie
                    data={graficos[index]}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {grafico.map((entry, indexx) =>{

                      return <Cell key={`cell-${indexx}`} fill={COLORS[indexx % COLORS.length]} />
                    })}
                  </Pie>
                </PieChart>
                :<Loading></Loading>

        }
        
        </>


    )
}

export default Grafico;