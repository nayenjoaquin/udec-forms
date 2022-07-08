import React from 'react'
import { useEffect, useState } from "react";
import NewAlter from "./new-alter";
import NewPreguntaHeader from "./new-pregunta-header";
import { faPlus,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const   NewPregunta = (props) => {

    const { id, rmvPregunta, index, addAlterToPregunta, preguntaTitleChange, alterChange, rmvAlterFromPregunta} = {...props};

    const[alterCounter, setAlterCounter] = useState(0);

    const [alter, setAlter] = useState([]);

    const handleAddAlterToPregunta=(alter)=>{
        addAlterToPregunta(id,alter);
    }

    const rmvAlter = (id) => {
        var aux=alter;
        var ind;
        aux.map((val,index)=>{
            if(val.id===id) ind=index;
        })
        aux.splice(ind,1);
        setAlter(
            [
                ...aux
            ]
        )
        rmvAlterFromPregunta(id,alter);
    }

    const handleTitleChange = (title) => {
        preguntaTitleChange(id, title);
    }
    const handleDelete= () => {
        rmvPregunta(id);
    }
    
    const stopPropagation = (e) => {
        const preguntaActiva = document.getElementsByClassName('pregunta-activa');
        const estaPregunta = document.getElementById(id);
        if (preguntaActiva[0]===estaPregunta) e.stopPropagation();
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const hideFullAlterMsj = async()=>{
        await delay(3000);
        document.getElementById(id+"-full-alter-msj").classList.remove("full-alter-msj-show");
    }

    const addAlter = () =>{
        if(alter.length<5){
            const aux1=alterCounter+1;
            const identifier= id+"-new-alter-"+alterCounter;
            const title= "Alternativa "+(alterCounter+1);
            setAlterCounter(aux1);
            const aux2 = [
                ...alter,
                {
                    title: "",
                    id: identifier
                }
            ]
            setAlter(aux2);
            handleAddAlterToPregunta(aux2);
        }else{
            document.getElementById(id+"-full-alter-msj").classList.add("full-alter-msj-show");
            hideFullAlterMsj();
        }
    }

    const toggleActive = () =>{
        const preguntaActiva = document.getElementsByClassName('pregunta-activa');
        const estaPregunta = document.getElementById(id);
        if(preguntaActiva.length===0) estaPregunta.classList.add("pregunta-activa");
        else if(estaPregunta===preguntaActiva[0]) estaPregunta.classList.remove("pregunta-activa");
        else {
            preguntaActiva[0].classList.remove("pregunta-activa");
            estaPregunta.classList.add("pregunta-activa");
        }

    }

    const handleAlterChange = (idAlter, title) => {
        alterChange(id,idAlter,title);
    }

    return(
        <div className="new-pregunta__container " id={id} onClick={toggleActive}>
            <p className="full-alter-msj" id={id+"-full-alter-msj"}>Puede haber un máximo de 5 alternativas...</p>
            <NewPreguntaHeader handleDelete={handleDelete}  stopPropagation={stopPropagation} index={index} id={id} handleTitleChange={handleTitleChange}/>
            <div className="new-pregunta__options">
            {
                alter.map((val,index)=>{
                    return(
                        <NewAlter title={val.title} id={val.id} key={val.id} index={index+1} rmvAlter={rmvAlter} idPregunta={id} handleAlterChange={handleAlterChange}></NewAlter>
                    );
                })
            }
            </div>
            <div className="new-pregunta__options">
                <button className="new-pregunta__add-alter-btn" onClick={(e)=>{
                        stopPropagation(e);
                        addAlter();
                }} ><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    )

}

export default NewPregunta;