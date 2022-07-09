import { faAngleDown, faAngleUp, faAngleLeft, faAngleRight, faCirclePlus, faPlus, faSquarePollVertical, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading";
import DashboardForm from "./dashboard-form";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import React from 'react'
import Swal from "sweetalert2";


const Dashboard = (props) => {
    const {empresa} = useParams();
    const [imgProfile, setImgProfile] = useState("https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg");
    const [loading, setLoading]  = useState(true);
    const [index, setIndex] = useState(1);
    const [encuestas, setEncuestas] = useState(0);
    const [paginas, setPaginas] = useState([]);
    const [nUsers, setNUsers] = useState(0);
    const [user, setUser] = useState("");
    const [iconShow, setIconShow] = useState(faAngleDown);
    const elemPag = 5;
    const navigate = useNavigate();
    
    useEffect(() => {
        verifySession()
        getInfo().then(data => {
            if(data.img!=null)setImgProfile(data.img)
            setNUsers(data.nUsers)
        })
        getData().then(data => {
            let paginas = []
            let info = Object.entries(data)
            setEncuestas(info.length)
            var numPages = Math.ceil(info.length / elemPag)
            for(let i = 0; i < numPages; i++){
                let pagina = []
                for(let j = 0; j < elemPag; j++){
                    if(Object.entries(data)[j+ (i*elemPag)] !=undefined){
                        pagina.push(Object.entries(data)[j+ (i*elemPag)])
                    }
                }
                paginas.push(pagina)
            }
            setPaginas(paginas)
        }).then(()=>setLoading(false))
        .catch(err => console.log(err))//navigate("/login", {replace: true}))
    }, []);

    
    const getData = async () => {
        const request = await fetch('https://is2-server.up.railway.app/getForms/' + empresa, {
            'method' : 'GET'

        });
        return await request.json();
    }
    const getInfo = async () => {
        const img = await fetch('https://is2-server.up.railway.app/getInfo/' + empresa, {
            'method' : 'GET'

        });
        return await img.json();
    }
    const handleBack = () => {
        const aux = index - 1;
        setIndex(aux);
    }

    const handleNext = () => {
        const aux = index +1;
        setIndex(aux);
    }
    const verifySession = () => {
        console.log(ReactSession.get("username"))
        if ( ReactSession.get("username")== undefined || ReactSession.get("username")[0]!== empresa){
            navigate("/login", {replace: true})
        }
    }
    const addUser = () => {
        const usuario = {
            Correo: user
        }
        if (user !== "") {
            const res = fetch('https://is2-server.up.railway.app/newUser', {
                'method' : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(usuario)
            }).then(response=>response.json())
            console.log(res.then(data=>{
                alert(data.message)
                if(data.message==="Usuario agregado con exito") setNUsers(nUsers+1)
            }))
            document.getElementById("user").value = ""
            setUser("")
        }
        else {
            alert("No ha ingresado un correo")
        }
        
    }
    const showAddUser = () => {
        if (document.getElementById("containerAddPeople").style.display === "none") {
            document.getElementById("containerAddPeople").style.display = "flex";
            setIconShow(faAngleUp)
            
            
        } else {
            document.getElementById("containerAddPeople").style.display = "none";
            setIconShow(faAngleDown)
        }
    }


    return (
        <>
        {
            loading===false
            ?<div className = "dashboard__container">
                <div className = "dashboard-profile">
                    <div className = "dashboard-profile__img-container"> <img src={imgProfile} className="dashboard-profile__img"></img></div>
                    <div className="dashboard-profile__info-container">
                        <p className = "dashboard-profile__title">Bienvenid@ {empresa}</p>
                        <div className="dashboard-profile__people-menu">
                            <div className="dashboard-profile__people-container">
                                <p className="dashboard-profile__people">{nUsers} personas reciben tus encuestas </p>
                                <button className="dashboard-forms__button-addPeople" onClick={e=>{
                                        e.stopPropagation();
                                        showAddUser();
                                        }} >
                                    <FontAwesomeIcon icon={iconShow} />
                                </button>
                            </div>
                            <div className="dashboard-addPeople-container" id = "containerAddPeople" style={{display: "none"}}>
                                <input className="dashboard-addPeople-input" id = "user" maxLength={50} placeholder="añadirCorreo@correo.com" onChange={(e)=>setUser(e.target.value)}></input>
                                <button className="dashboard-forms__button-addPeople" onClick={e=>{
                                        
                                        e.stopPropagation();
                                        addUser()
                                        }} >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className = "dashboard-forms">
                    <div className="dashboard-forms-header-container">
                        <div className="dashboard-forms-title-container">
                            <p className = "dashboard-forms-title">Encuestas creadas</p>
                            <p className = "dashboard-forms-created">Has creado {encuestas} encuestas</p>
                        </div>
                        <button className="dashboard-forms__button-create" onClick={e=>{
                                navigate(`/${empresa}/createForm`)
                                }} >
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
                    <div className = "dashboard-forms__container">
                        {   paginas.length===0
                            ?   <></>
                            :    paginas[index-1].map((val,ind)=>{
                                    return(
                                        <DashboardForm empresa={empresa} idEncuesta={val[1].id} index ={(ind+1)+((index-1)*elemPag)} titleEncuesta={val[1].title} descEncuesta={val[1].description} dateEncuesta={val[1].date} />
                                    );
                                })
                        }
                    </div>
                    
                    {
                        paginas.length===0
                        ? <></>
                        : paginas.length===1
                        ? <div className="dashboard__btn-container">
                            <p className="dashboard-forms-index">{index}/{paginas.length}</p> 
                        </div>
                        : index===1
                        ? <div className="dashboard__btn-container">
                            <button className="dashboard__back-btn"></button>
                            <p className="dashboard-forms-index" >{index}/{paginas.length}</p> 
                            <button className="dashboard__next-btn" onClick={handleNext}>
                                    <FontAwesomeIcon icon={faAngleRight} />    
                            </button>
                        </div>
                        : index===paginas.length
                            ? <div className="dashboard__btn-container">
                                <button className="dashboard__back-btn" onClick={handleBack}>
                                    <FontAwesomeIcon icon={faAngleLeft} />    
                                </button>
                                <p className="dashboard-forms-index">{index}/{paginas.length}</p> 
                                <button className="dashboard__next-btn"></button>
                            </div>
                            : <div className="dashboard__btn-container">
                                <button className="dashboard__back-btn" onClick={handleBack}>
                                    <FontAwesomeIcon icon={faAngleLeft} />    
                                </button>
                                <p className="dashboard-forms-index">{index}/{paginas.length}</p> 
                                <button className="dashboard__next-btn" onClick={handleNext}>
                                    <FontAwesomeIcon icon={faAngleRight} />    
                                </button>
                            </div>
                    }
                </div>
                        
            </div>
            :<Loading></Loading>
        }

        </>
    )
}

export default Dashboard;