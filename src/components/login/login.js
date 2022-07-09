import React from 'react'
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useContext, require } from "react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

const LOGIN_URL = '/auth';

const Login = () => {
    useEffect(() => {verifyLogin()})
    const md5 = require('md5');
    const navigate = useNavigate();
    const [loading, setLoading]  = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const inputs = Object.fromEntries(data.entries());
        
        console.log("user: "+inputs.correo,"pass: "+md5(inputs.contraseña))
        
        
        setLoading(true);
        const response = fetch('https://is2-server-production.up.railway.app/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({correo:inputs.correo,contraseña:md5(inputs.contraseña)})
        }).then(response=>response.json().then(data=>{
            if(data.message === "Login exitoso"){
                let empresa = data.username
                console.log(response.status)
                ReactSession.set("username", empresa)
                console.log(ReactSession.get("username"))
                navigate(`/${empresa}/dashboard`, {replace: true})
            }
            else{
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true
                })

                Toast.fire({
                    icon: 'error',
                    title: data.message,
                })
                setLoading(false)
            }
        })).catch(err=>{
            console.log(err)
            setLoading(false)
        })

    }
    const verifyLogin = () => {
        let username = ReactSession.get("username")
        if(username!== undefined){
            navigate(`/${username[0]}/dashboard`, {replace: true})
        }
    }
    return(
        <>
        {
            loading===false?
                <div className="login-page">
                <div className="login-card">
                    <p className="login-title">Inicia sesión</p>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form-item">
                            <label><FontAwesomeIcon icon={faAt} /> correo:</label>
                            <input name="correo" type="email" placeholder="correo@ejemplo.com..." required></input>
                        </div>
                        <div className="login-form-item">
                            <label><FontAwesomeIcon icon={faLock} /> contraseña:</label>
                            <input name="contraseña" type="password" placeholder="********" required></input>
                        </div>
                        {/* <div className="login-options">
                            <label className="login-recuerdame">Recuérdame
                                <input type="checkbox"></input>
                                <span className="login-recuerdame-checkmark"></span>
                            </label>
                            <p>Olvidé mi contraseña</p>
                        </div> */}
                        <button>Iniciar sesión</button>
                    </form>
                </div>
            </div>
            :<Loading></Loading>
        }
        </>
    )
}

export default Login;