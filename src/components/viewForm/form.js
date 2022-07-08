import FormCard from "./form-card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading";
import Grafico from "./grafico"
import React from 'react'
import { ReactSession } from 'react-client-session';


const ViewForm = (props) => {

    const navigate = useNavigate();
    const {empresa} = useParams();
    const {id} = useParams();
    const [loading, setLoading]  = useState(true);

    const [datos, setDatos] = useState({});
    const [index, setIndex] = useState(1);
    const [respuestas, setRespuestas] = useState([]);
    
    const [grafico, setGrafico] = useState([{},]);
    const [inf, setInfo] = useState();
    const [aux, setAux] = useState([{}]);
    
    
    const verifySession = () => {
        console.log(ReactSession.get("username"))
        if ( ReactSession.get("username")== undefined || ReactSession.get("username")[0]!== empresa){
            navigate("/login", {replace: true})
        }
    }

    useEffect(() => {
        verifySession()
        getData().then(data => {
              let info = Object.entries(data)
              setInfo(info)
              //console.log(info)
              //console.log(info[1])
              //console.log(info[1][1])
              console.log("hola")
              
              //console.log(info[1][1][index-1].alter[1].id)
              //console.log(info[1][1][index-1].alter[0].title)
              if(info[1][1][index-1].alter[1].title == "No") console.log(info[1][1][index-1].alter[1].answers)
              let size = info[1][1][index-1].alter.length
              //console.log(size)
              //console.log(grafico)
              setGrafico([])
              //console.log(size)
              for(let i = 0; i < size; i++){
                let n = info[1][1][index-1].alter[i].title
                let num = info[1][1][index-1].alter[i].answers
                grafico.push({name: n, value: num})
                //console.log("nombre " + n+ " cant: " + num)
              }
              //console.log("ok")
              //console.log(grafico)
              setGrafico(grafico)
            setDatos(data);
        }).then(()=>setLoading(false));
    }, [empresa]);


    const getIndex=()=>{
      return index;
    }
    const getData = async () => {
        const request = await fetch('http://localhost:5000/getFormAnswers/UdeC/' + id, {
            'method' : 'GET' 
        });

        return await request.json();
    }

    

    return (
        <>
        {
            loading===false
            
            ?<div className = "results__container">
                <div className = "form__container-answers">
                  <p className="form-title"> {datos.title}</p>
                  <p className="form-description"> {datos.description}</p>
                  <p className="form-pregunta-index">{index}/{datos.preguntas.length}</p>
                  <FormCard pregunta={datos.preguntas[index-1]} index={index} setIndex={setIndex} length={datos.preguntas.length} respuestas={respuestas} setRespuestas= {setRespuestas} setLoading={setLoading} grafico={grafico} data={datos} inf={inf}></FormCard>
                </div>
                
            </div>
            :<Loading></Loading>
        }
        
        </>


    )
}

export default ViewForm;