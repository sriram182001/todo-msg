import '../css/signup.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import React from 'react';
import Nav from './nav'

function SignUp() {
   const [state,setState]=useState({
      name:'',
      passcode:'',
      mailid:'',
      uid:''
   }); 
   
   const handleChange=(e)=>{
      const {name,value}=e.target;
      setState({
         ...state,
         [name]:value
      });
   }
   let navigate=useNavigate();
   //console.log(state)
   
   return (
      <div className="signUp">
        <Nav/>
        <h1>SIGN UP</h1>
        <form  onSubmit={async (e)=>{
          e.preventDefault();
          const response=await Axios.post('http://localhost:3000/api/storedata', {state})
          console.log(response);
          if(response.data==='already exists')
          {
             alert('userid already exists. Sign up with different userid');
             e.preventDefault();
          }
          else{ 
            alert('submitted '+state.name);
            //console.log(state);
            e.preventDefault();
            navigate('/signin');
          }
          
        }   

        } action='' className="form-control">
          <label htmlFor="user" ><b>NAME:</b></label>
             <br />
          <input id="user" name='name' type="text"   onChange={handleChange}required />
          
          <br />
          <br />
          <label htmlFor="pass" ><b>CREATE PASSWORD:</b></label>
             <br />
          <input id="pass" name='passcode' type="password"   onChange={handleChange}required/>

          <br />
          <br />
          <label htmlFor="mail" ><b>EMAIL ID:</b></label>
             <br />
          <input id="mail" name="mailid" type="email"  onChange={handleChange}required />

          <br />
          <br />
          <label htmlFor="uid" ><b>USERID:</b></label>
             <br />
          <input id="uid" name="uid"type="text"   onChange={handleChange}required/>
          
          <br />
          <br />
          <br />
          <input id='sub'type="submit" value="SIGN UP"/>
        </form> 
       
      </div>
    );
  }
  
  export default SignUp;