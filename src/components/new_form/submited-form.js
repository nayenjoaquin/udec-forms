import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const SubmitedForm = () => {

    const {formId} = useParams();

    const link = "https://webdevcl.me/#/form/"+formId;

    const copyLink = () => {
        navigator.clipboard.writeText(link);
    }

    return (
        <div className="submited-form-page">
            <p className="submited-form-alert">Tu encuesta ha sido creada.</p>
            <p className="submited-form-sub-alert">Gracias por usar UdeC Forms!! , tu encuesta ha sido enviada a todos nuestros contactos.</p>
            {/*AQUI HAY QUE PONER UNA ILUSTRACIÓN*/}
            <div className="submited-form__share-container">
                <p className="submited-form-share-alert">Comparte tu encuesta!</p>
                <div className="submited-form__btn-container">
                    <button className="submited-form__copy-btn" onClick={copyLink}><FontAwesomeIcon icon={faClipboard} className="clipboard-icon"/> copiar</button>
                    <input value={link} readOnly className="submited-form__share-link"></input>
                </div>
            </div>
        </div>
    )
}

export default SubmitedForm;