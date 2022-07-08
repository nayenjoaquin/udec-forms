import { useEffect,useState } from "react";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faL } from '@fortawesome/free-solid-svg-icons';
import NewPregunta from "./new-pregunta";
import Loading from "../loading";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";
//import { confirmAlert } from "react-confirm-alert";

const NewForm = () => {
    useEffect(() => {verifySession()})

    const {empresa} = useParams();
    const[preguntasCounter, setPreguntasCounter] = useState(0);
    const [preguntas, setPreguntas] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading]  = useState(false);
    
    const navigate = useNavigate();

    const addPregunta = async () =>{
        const aux=preguntasCounter+1;
        const id = "new-pregunta-"+preguntasCounter;
        const title = "Pregunta "+(preguntasCounter+1);
        setPreguntasCounter(aux);
        await setPreguntas(
            [
                ...preguntas,
                {
                    title: "",
                    id: id,
                    alter: []
                }
            ]
        )
    }

    const addAlterToPregunta = (id, alter) => {
        var aux=preguntas;
        var ind;
        aux.map((val,index)=>{
            if(val.id===id) ind=index;
        })
        aux[ind].alter=alter;
        setPreguntas([
            ...aux
        ])
    }
    const verifySession = () => {
        console.log(ReactSession.get("username"))
        if ( ReactSession.get("username")== undefined || ReactSession.get("username")[0]!== empresa){
            navigate("/login", {replace: true})
        }
    }
    const rmvPregunta = (id) =>{
        Swal.fire({
            title: '¿Está seguro?',
            text: "¡No podrá revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!'
        }).then((result) => {
            if (result.value) {
                var aux=preguntas;
                var ind;
                aux.map((val,index)=>{
                    if(val.id===id) ind=index;
                }
                )
                aux.splice(ind,1);
                setPreguntas([
                    ...aux
                ])
                Swal.fire(
                    '¡Eliminado!',
                    'La pregunta ha sido eliminada.',
                    'success'
                )
            }
        })
    }

    const preguntaTitleChange = (id, title) => {
        var aux = preguntas;
        var ind;
        aux.map((val,index)=>{
            if(val.id===id) ind=index;
        })
        aux[ind].title=title;
        setPreguntas(
            [
                ...aux
            ]
        )
    }

    const alterChange = (idPregunta, idAlternativa, title) => {
        var aux = preguntas;
        aux.map((val,index)=>{
            if(val.id===idPregunta){
                val.alter.map((val,index)=>{
                    if(val.id===idAlternativa) val.title=title;
                })
            }
        })
        setPreguntas(
            [
                ...aux
            ]
        );
    }

    const rmvAlterFromPregunta = (id, alter) => {
        var aux = preguntas;
        aux.map((val,index)=>{
            if(val.id===id) val.alter=alter;
        })
        setPreguntas(
            [
                ...aux
            ]
        )
        
    }


    const checkErrors = () => {
        if(preguntas.length===0){
            Swal.fire({
                title: '¡Error!',
                text: "¡Debe agregar al menos una pregunta!",
                icon: 'error',
                confirmButtonText: '¡Entendido!'
            })
            return null;
        }
        var errorAlert;
        var completeForm = true;
        if(title==="" || description===""){
            setLoading(false);
            Swal.fire({
                title: '¡Error!',
                text: "¡Debe completar todos los campos!",
                icon: 'error',
                confirmButtonText: '¡Entendido!'
            })
            return null;
        }
        for (var i=0; i<preguntas.length; i++){
            if(preguntas[i].title===""){
                completeForm=false;
                errorAlert = "No ha completado todos los campos";
                break;
            }
            if(preguntas[i].alter.length===0){
                completeForm=false;
                errorAlert = "Hay una pregunta sin alternativas";
                break;
            }
            var emptyAlter = false;

            preguntas[i].alter.map(alter=>{
                if(alter.title===""){
                    emptyAlter=true;
                }
            })


            if(emptyAlter===true){
                completeForm = false;
                errorAlert = "No ha completado todos los campos";
                break;
            }
        }
        if(completeForm === false){
            setLoading(false);
            Swal.fire({
                title: '¡Error!',
                text: errorAlert,
                icon: 'error',
                confirmButtonText: '¡Entendido!'
            })
            return null;
        }
    }

    const handleSubmit = async () => {
        
        const form = {
            title,
            description,
            preguntas
        }
        var formId;
        console.log(form);
        const formJson = JSON.stringify(form);

        if(checkErrors()===null) return null;

        Swal.fire({
            title: '¡Su encuesta será creada!',
            text: "¡Lo redirigiremos al dashboard mientras espera!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Continuar!'
        }).then((result) => {
            if (result.value) {
                navigate("/empresa/dashboard", {replace: true});
                const res = fetch('http://localhost:5000/newForm/'+empresa,{
                'method' : 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body:formJson
                }).then(response=>response.json()
                .then(json=>{
                    formId=json;
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        borderColor: '#f8bb86',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: '¡Encuesta lista para enviar!'
                    })

                }))
                .catch(err=>{
                    console.log(err);
                    Swal.fire({
                        title: '¡Error!',
                        text: "¡No se pudo crear la encuesta!",
                        icon: 'error',
                        confirmButtonText: '¡Entendido!'
                    })
                }
                )
            }
        }
        )

    }

    return(
        <div className="new-form__container">
            {loading===false
            ? <>
                <div className="new-form__title-container">
                    <input maxLength={100} className="new-form__title-input" placeholder="Título Encuesta..." onChange={(e)=>setTitle(e.target.value)}></input>
                    <input maxLength={150} className="new-form__description-input" placeholder="Descripción..." onChange={(e)=>setDescription(e.target.value)}></input>
                </div>
                <div className="new-form__preguntas-container">
                    {
                        preguntas.map((val,index)=>{
                            return(
                                <NewPregunta title={val.title} id={val.id} key={val.id} rmvPregunta={rmvPregunta} index={index+1} addAlterToPregunta={addAlterToPregunta} preguntaTitleChange={preguntaTitleChange} alterChange={alterChange} rmvAlterFromPregunta={rmvAlterFromPregunta}/>
                            );
                        })
                    }
                </div>
                <button className="new-form__add-pregunta-btn" onClick={addPregunta}>Añadir pregunta</button>
                <button className="send-btn" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk} /></button>
            </>
            : <Loading></Loading>
            }
        </div>
    )

}

export default NewForm;