import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Card = (props) => {
    const {correo, md5} = {...props}
    const navigate = useNavigate();
    const [sw, setSw] = useState(1);
    console.log(correo)
    console.log(md5)

    const handleNo = () => {
        
        console.log("No")
        navigate(`/`, {replace:true})
        const aux = sw - 1;
        setSw(aux);
    }

    const handleSi = () => {
        console.log("si")
        const link = 'https://is2-server-production.up.railway.app/unsuscribe/confirm/' + md5
        console.log(link)

        
        const res = fetch(link).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            console.log("ok")
            return response.json()
          }).catch(err=>{
          console.log(err)
        })
        

        if(res.status!=500){
            const aux = sw + 1;
            setSw(aux);
        } 
        else{
            alert('Error interno de servidor: intente más tarde')
        }
        
    }
    

    return(
        <>
        {sw==1?
            <div className="form-card__container">
                <p className="form-card__title">{"¿Estás seguro que deseas desuscribirte?"} </p>
                <div className="form-card__alter-container">
                    {
                        <div className="form-card__alter" key={1}>
                            <p className="form-card__alter-title">Correo registrado:  {correo}</p>    
                        </div>
                    }
                </div>
                {
                    <div className="form-card__btn-container">
                        <button className="form-card__back-btn" onClick={e=>{
                           handleNo()
                            }}
                            >No
                        </button>

                        <button className="form-card__send-btn-only" onClick={e=>{
                           handleSi()
                            }}
                            
                        >Si</button>
                    </div>
                }
            </div>
        :<div className="form-card__container">
        <p className="form-card__title">{"El correo fue dado de baja"} </p>
        
        
    </div>}
        </>
        
    )
}

export default Card;