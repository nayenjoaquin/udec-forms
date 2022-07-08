import React from 'react'
import FormCard from "./form-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading";

const Form = (props) => {
    const {id} = useParams();
    const [loading, setLoading]  = useState(true);

    const [datos, setDatos] = useState({});
    const [index, setIndex] = useState(1);
    const [respuestas, setRespuestas] = useState([]);

    
    useEffect(() => {
        getData().then(data => {
            setDatos(data);
        }).then(()=>setLoading(false));
    }, []);

    const getData = async () => {
        const request = await fetch('https://server-encuestas.herokuapp.com/getForm/' + id, {
            'method' : 'GET' 
        });
        return await request.json();
    }

    

    return (
        <>
        {
            loading===false
            ?<div className = "form__container">
                <p className="form-title"> {datos.title}</p>
                <p className="form-description"> {datos.description}</p>
                <p className="form-pregunta-index">{index}/{datos.preguntas.length}</p>
                <FormCard pregunta={datos.preguntas[index-1]} index={index} setIndex={setIndex} length={datos.preguntas.length} respuestas={respuestas} setRespuestas= {setRespuestas} setLoading={setLoading}></FormCard>
            </div>
            :<Loading></Loading>
        }
        </>
    )
}

export default Form;