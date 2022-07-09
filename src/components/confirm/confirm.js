import Loading from "../loading";
import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./card.js";
const Confirm = (props) => {
    const {md5} = useParams();
    const [datos, setDatos] = useState({});
    const [loading, setLoading]  = useState(true);
    const [correo, setCorreo] = useState("");
    

    
    useEffect(() => {
        getData().then(data => {
            let info = Object.entries(data)
            let c = ""
            for(let i = 0; i < info.length; i++){
                c += info[i][1]
            }
            setCorreo(c)
            setDatos(data)
        }).then(()=>setLoading(false));
    }, []);


    const getData = async () => {
        const request = await fetch('https://is2-server-production.up.railway.app/getMail/' + md5, {
            'method' : 'GET' 
        });

        return await request.json();
    }


    return (
        <>
        {
            loading===false?
                <div className = "form__container" >
                    <Card correo={correo} md5={md5} ></Card>
                </div>
            :<Loading></Loading>
        }
        </>
    )
}

export default Confirm;