import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const FormCard = (props) => {

    const {pregunta, index, setIndex, length, setRespuestas, respuestas ,setLoading} = {...props};

    useEffect(()=>{
        const alternativas = document.getElementsByClassName("alter-pregunta-"+pregunta.id);
        changeAlter(index,alternativas)
    },[index])

    const navigate = useNavigate();
    const toggleCheck = (e,id) =>{
        const alternativas = document.getElementsByClassName("alter-pregunta-"+pregunta.id);
        const estaAlternativa = document.getElementById("alter-checkbox-"+id)
        for(var i=0;i<alternativas.length;i++){
            if(alternativas[i]!==estaAlternativa && alternativas[i].checked===true){
                 alternativas[i].checked=false;
            }
        }
        var auxAlter
        auxAlter = respuestas
        if(!estaAlternativa.checked) auxAlter[index-1] = null
        else auxAlter[index-1] = id
        console.log(auxAlter)
        setRespuestas(auxAlter)
    }
    
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

    const handleSubmit = async() => {
        var banderita = 0;
        for(var  i = 0 ; i < length ; i++){
            if(respuestas[i] == null ) banderita = 1;
        }
        if(banderita){
            Swal.fire({
                title: '¡Error!',
                text: "¡Debe responder todas las preguntas!",
                icon: 'error',
                confirmButtonText: '¡Entendido!'
            })
            return null;
        }
        else {
            setLoading(true);
            const data = JSON.stringify(respuestas);
            const res = await fetch('https://server-encuestas.herokuapp.com/newRespuesta',{
                'method' : 'POST',
                 headers : {
                     'Content-Type':'application/json'
                 },
                 body:data
             });
            
            if(res.status!=500) navigate(`/submited-answer`, {replace: true});
            else{
                await setLoading(false)
                Swal.fire({
                    title: '¡Error!',
                    text: "¡No se pudo enviar su respuesta!",
                    icon: 'error',
                    confirmButtonText: '¡Entendido!'
                })
            }
        }

    }
    return(
        <div className="form-card__container">
            <p className="form-card__title">{index}) {pregunta.title}</p>
            <div className="form-card__alter-container">
                {
                    pregunta.alter.map((val,index)=>{
                        return(
                            <div className="form-card__alter" key={val.id}>
                                <input type='checkbox' className={"form-card__alter-checkbox alter-pregunta-"+pregunta.id} onChange={(e)=>toggleCheck(e,val.id[0])} id={'alter-checkbox-'+val.id}></input>
                                <p className="form-card__alter-title">{val.title}</p>    
                            </div>
                        )
                    })
                }
            </div>
            {
                length===1
                ? <div className="form-card__btn-container">
                    <button className="form-card__send-btn-only" onClick={handleSubmit}>Enviar</button>
                </div>
                : index===1
                ? <div className="form-card__btn-container">
                    <button className="form-card__next-btn-only" onClick={handleNext}>{(index+1)+"  >>"}</button>
                </div>
                : index===length
                    ? <div className="form-card__btn-container">
                        <button className="form-card__back-btn" onClick={handleBack}>{"<<  "+(index-1)}</button>
                        <button className="form-card__send-btn" onClick={handleSubmit}>Enviar</button>
                    </div>
                    : <div className="form-card__btn-container">
                        <button className="form-card__back-btn" onClick={handleBack}>{"<<  "+(index-1)}</button>
                        <button className="form-card__next-btn" onClick={handleNext}>{(index+1)+"  >>"}</button>
                    </div>
                
            }
        </div>
    )
}

export default FormCard;