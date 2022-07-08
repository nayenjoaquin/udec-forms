import React, { useEffect } from 'react'
import { faAt, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

const Register = () => {


    useEffect(()=>{
        verifyLogin()
    },[])

    const verifyLogin = () => {
        let username = ReactSession.get("username")
        if(username!== undefined){
            navigate(`/${username[0]}/dashboard`, {replace: true})
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("registrandose")
        const data = new FormData(e.target);
        const inputs = Object.fromEntries(data.entries());
        if(inputs.nombre.includes(" ")){
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
                title: '¡El nombre no puede contener espacios!',
            })
            return null
        }
        const datos = {
            Username:inputs.nombre,
            Correo:inputs.correo,
            Clave:inputs.contraseña
        }
        console.log(inputs)
        const datosJSON = JSON.stringify(datos)
        await fetch('http://localhost:5000/newEmpresa',{
            'method' : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body: datosJSON
        }).then(res => res.json())
        .then(data=>{
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
                title: data.message,
            }) 
            navigate("/login", {replace: true})
        })
        .catch(error=>{
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
                title: "El nombre de usuario o correo ya ha sido registrado",
            })
        })

    }
    

    const navigate = useNavigate();
    return(
        <div className="login-page">
            <div className="login-card">
                <p className="login-title">Regístrate</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-item">
                        <label><FontAwesomeIcon icon={faUser} /> nombre de usuario:</label>
                        <input name="nombre" placeholder="nombre de usuario..." required></input>
                    </div>
                    <div className="login-form-item">
                        <label><FontAwesomeIcon icon={faAt} /> correo:</label>
                        <input name="correo" type="email" placeholder="correo@ejemplo.com..." required></input>
                    </div>
                    <div className="login-form-item">
                        <label><FontAwesomeIcon icon={faLock} /> contraseña:</label>
                        <input name="contraseña" type="password" placeholder="********" required></input>
                    </div>
                    <button className="register_send-btn">Registrarse</button>
                </form>
                <div className="login-create-account">¿Ya tienes una cuenta?<p onClick={e=>navigate('/login',{replace:true})}>Inicia sesión</p>
                </div>
            </div>
        </div>
    )
}

export default Register;