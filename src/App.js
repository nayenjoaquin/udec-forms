
import NewForm from './components/new_form/new-form';
import Form from './components/form/form';
import Dashboard from './components/dashboard/dashboard';
import {Route, Routes, useNavigate,Navigate} from 'react-router-dom';
import SubmitedForm from './components/new_form/submited-form';
import SubmitedAnswer from './components/form/submited-answer';
import ViewForm from './components/viewForm/form';
import Confirm from './components/confirm/confirm';
import logo from './LOGO.png';
import Login from './components/login/login';
import Register from './components/login/register';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ReactSession } from 'react-client-session';


import React from 'react';
import RegisteredUser from './components/login/registered-user';
import Swal from 'sweetalert2';

function App() {
  ReactSession.setStoreType("localStorage");
  
  const navigate = useNavigate();
  const logoClick = () => {
    navigate('/login',{replace:true})
  }
  const logout = () => {
    
    let user = ReactSession.get("username");
    if (user!=undefined){
      ReactSession.remove("username");
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
        title: '¡Sesión cerrada!',
      })
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
        title: '¡No se ha iniciado sesión!',
      })
    }
    navigate('/login',{replace:true})
  }
  return (
    <div className="App">
        <div className='page-navbar'>
          <div className='logo-container'><img src={logo} className='logo-img' onClick={logoClick}/></div>
          <button className='login-btn' onClick={logout}><FontAwesomeIcon icon={faRightToBracket} /></button>
        </div>
        <div className='background-pattern'></div>
        <div className='page-content'>
        <Routes>
          <Route path='/:empresa/createForm' element={<NewForm/>}/>
          <Route path= '/form/:id' element={<Form/>}/>
          <Route path= '/:empresa/dashboard' element={<Dashboard/>}/>
          <Route path='/submited-form/:formId' element={<SubmitedForm/>}/>
          <Route path='/submited-answer' element={<SubmitedAnswer/>}/>
          <Route path='/login' element={<Login/>}/>
          {//<Route path='/register' element={<Register/>}/> 
          }
          <Route path= '/unsuscribe/:md5' element={<Confirm/>}/>
          <Route path= '/:empresa/getFormAnswers/:id' element={<ViewForm/>}/>
          <Route path="/" element={<Navigate to="/:empresa/dashboard" replace />}/>
          <Route path='/registered-user' element={<RegisteredUser/>}/>
        </Routes>
        </div>
    </div>
  );
}

export default App;
