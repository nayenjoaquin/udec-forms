import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grafico from './grafico';


const FormCard = (props) => {

    const {pregunta, index, setIndex, length, setRespuestas, respuestas ,setLoading, grafico, data,inf} = {...props};
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042"];

    useEffect(()=>{
        const alternativas = document.getElementsByClassName("alter-pregunta-"+pregunta.id);
        changeAlter(index,alternativas)
    },[index])

    const navigate = useNavigate();
    
   



    const changeAlter = (index,alternativas) =>{
        if(respuestas[index-1]>=0){
            for(i=0;i<alternativas.length;i++){
                if(alternativas[i].id=="alter-checkbox-"+respuestas[index-1]){
                    alternativas[i].checked=true;
                }
                else alternativas[i].checked=false;
            } 
        }else{
            for(var i=0;i<alternativas.length;i++){
                alternativas[i].checked=false;
            } 
        }
    }

    const handleBack = () => {
        const aux = index - 1;
        setIndex(aux);
    }

    const handleNext = () => {
        const aux = index +1;
        setIndex(aux);
    }

     


    return(
        <div className="form-card__container-answers">
            <p className="form-card__title">{index}) {pregunta.title}</p>

            <div className='form-card__body'>
                <div className="form-card__alter-container-answers">
                    {
                        pregunta.alter.map((val,indexx)=>{
                            console.log(val)
                            return(
                                <div className="form-card__alter-answers" key={val.id}>
                                    <p className="form-card__alter-title-answers"><div className='answers-alter-color-container'><div className='answers-alter-color' style={{backgroundColor:COLORS[indexx]}}/></div> {val.title} </p> 
                                    <p className="form-card__alter-title-answers-cont">Respuestas: {val.answers}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='grafico-container-answers'><Grafico index={index} grafico={grafico} data={data}></Grafico></div>
            </div>
            {
                length===1
                ? <div className="form-card__btn-container">
                </div>
                : index===1
                ? <div className="form-card__btn-container">
                    <button className="form-card__next-btn-only" onClick={handleNext}>Next{" >>"}</button>
                </div>
                : index===length
                    ? <div className="form-card__btn-container">
                        <button className="form-card__back-btn" onClick={handleBack}>{"<< "}Back</button>
                    </div>
                    : <div className="form-card__btn-container">
                        <button className="form-card__back-btn" onClick={handleBack}>{"<< "}Back</button>
                        <button className="form-card__next-btn" onClick={handleNext}>Next{" >>"}</button>
                    </div>
                
            }
        </div>
    )
}

export default FormCard;