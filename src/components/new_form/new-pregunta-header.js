import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashCan } from '@fortawesome/free-solid-svg-icons';

const NewPreguntaHeader = (props) => {

    const {handleDelete, index, id, handleTitleChange, stopPropagation} = {...props};

    return(
        <div className="new-pregunta__header">
            <div className="new-pregunta__title-container">
                <p className="new-pregunta__title-index">{index})</p>
                <input maxLength={100} className="new-pregunta__title-input" placeholder={"Pregunta "+index+"..."} onClick={(e)=> stopPropagation(e)} onChange={(e)=>handleTitleChange(e.target.value)}></input>
            </div>
            <div className="new-pregunta__btn-container">
                <button className="new-pregunta__delete-btn" onClick={(e)=>{
                    e.stopPropagation();
                    handleDelete();
                }}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
        </div>
    );
}

export default NewPreguntaHeader;