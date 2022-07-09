
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink, faSquarePollVertical, faSquarePollHorizontal, faPaperPlane, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from 'react'
import Swal from "sweetalert2";


const DashboardForm = (props) => {
    
    const {empresa,idEncuesta,index, titleEncuesta, descEncuesta, dateEncuesta} = {...props}
    const page = "/form/"+idEncuesta;
    const link = "http://webdevcl.me/#/form/"+idEncuesta;
    const linkAns = "http://webdevcl.me/#/"+empresa+"/getFormAnswers/"+idEncuesta;
    const copyLink = () => {
        navigator.clipboard.writeText(link);
    }

    const navigate = useNavigate();
    const deleteForm = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar esta encuesta?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                const res = fetch('https://is2-server.up.railway.app/deleteForm/' + idEncuesta, {
                'method' : 'GET'
                }).then(response=>response.json())
                res.then(data=>{
                    Swal.fire(
                        'Eliminada!',
                        'La encuesta ha sido eliminada.',
                        'success'
                    ).then(()=>{
                        window.location.reload()
                    })
                })
                res.catch(err => {
                    Swal.fire(
                        'Error!',
                        'No se pudo eliminar la encuesta.',
                        'error'
                    )
                })
            }
        })

    }
    return(

        <div className ="dashboard-forms__element-container" onClick={e=>{
            window.open(linkAns,"_blank");    
                }}>
            <div className = "dashboard-forms__elements-title-container">
                <p className="dashboard-forms__element-title"> {index}) {titleEncuesta} </p>
                <p className="dashboard-forms__element-desc"> {descEncuesta}</p>
                <p className="dashboard-forms__element-date"> Fecha creación: {dateEncuesta['day']}/{dateEncuesta['month']}/{dateEncuesta['year']}</p>
            </div>
            <div className ="dashboard-forms__button-container">
                <button className="dashboard-forms__button-link" onClick={e=>{
                    e.stopPropagation();
                    copyLink();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        showCloseButton: true
                    })
                    Toast.fire({
                        icon: 'success',
                        title: '¡Enlace copiado!'
                    })
                }}>
                    <FontAwesomeIcon icon={faCopy} />
                </button>
                <button className="dashboard-forms__button-results" onClick={e=>{
                    e.stopPropagation();
                    window.open(link,"_blank");  
                }} >
                    <FontAwesomeIcon icon={faShare} />
                </button>
                <button className="dashboard-forms__button-delete" onClick={e=>{
                    e.stopPropagation();
                    deleteForm();

                }} >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
 
    )
}

export default DashboardForm;