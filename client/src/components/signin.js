import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import '../css/signin.css';
import Axios from 'axios';
import Nav from './nav'
import {useDispatch,useSelector} from 'react-redux'



function SignIn() {
    const [state,setState]=useState({
    uid:"",
    passcode:""
    })
const handleChange=(e)=>{
  const {name,value}=e.target;
  setState({
    ...state,
    [name]:value
  });
}
let navigate=useNavigate();
const dispatch=useDispatch();
    return (
       <div className="signIn">
        <Nav/>
        <h1>SIGN IN</h1>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          const response=await Axios.post('http://localhost:3000/api/login',{state});
          console.log(response);
          if(response.data==='ok'){
            
            console.log(response.data)
            dispatch({type:'CHECK_LOGIN',loggedIn:true});
            navigate('/welcome');
            
          }
          else if(response.data==='wrong password'){
            alert('Enter correct password');
            e.preventDefault();
          }
          else if(response.data==='invalid user'){
             alert('enter correct userid');
             e.preventDefault();
          }
        }  
        } action='' className="form-control1">
          <label htmlFor="user" ><b>USERID:</b></label>
             <br />
          <input id="user" name="uid" type="text" required onChange={handleChange}/>
          
          <br />
          <br />
          <label htmlFor="pass" ><b>PASSWORD:</b></label>
             <br />
          <input id="pass" name="passcode" type="password" required onChange={handleChange} />
          
          <br />
          <br />
          <br />
          <input id='sub'type="submit" value="LOG IN"/>
        </form> 
       
      </div>
    );
  }
  
export default SignIn;