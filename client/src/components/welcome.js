import Axios from 'axios';
import React from 'react';
import { useNavigate,Link} from 'react-router-dom';
import '../css/welcome.css'
import {useState,useEffect}  from 'react';
import { useDispatch } from 'react-redux';
import Nav1 from './nav1'



function Mspc(){
    
    const[details,setdetails]=useState({
        value:{},
        flag:false
    });
    useEffect(()=>{
    async function fetchdata(){
        const response=await Axios.get('http://localhost:3000/api/getdetails');
        //console.log(response.data)
        setdetails({value:response.data,flag:true});
    }
    fetchdata()},[]);
    
        
    
    
    const a= 
    <div className="Mspc">
    <Nav1/>
    <br />
    <br />
    <h1 ><i>WELCOME TO TASK MANAGER</i></h1>
    <br />
    <br />
    {(details.flag===false)?<div className='loader'></div>:
    <>
    <h2 id='wel2'><i>Welcome {details.value.name} @ {details.value.mailid} </i></h2>
    <h3 id='wel3'>This is a place Where you can schedule your Tasks.</h3>
    </>}
    </div>
    return(
       a
    )
}
export default Mspc;