import '../css/home.css'
import { Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import Nav from './nav'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Home() {
  
  let currentdate = new Date(); 
  let s=''
  let m=''
  let h=''
  if(currentdate.getSeconds()<10){
    s='0'+currentdate.getSeconds()
  }
  else{
    s=currentdate.getSeconds()
  }
  if(currentdate.getMinutes()<10){
    m='0'+currentdate.getMinutes()
  }
  else{
    m=currentdate.getMinutes()
  }
  if(currentdate.getHours()<10){
    h='0'+currentdate.getHours()
  }
  else{
    h=currentdate.getHours()
  }
  
  
  let time = h + " : "  
            + m + " : " 
            + s
    setInterval(function(){
      let currentdate = new Date(); 
      let s='';
      let m='';
      let h='';
      if(currentdate.getSeconds()<10){
        s='0'+currentdate.getSeconds()
      }
      else{
        s=currentdate.getSeconds()
      }
      if(currentdate.getMinutes()<10){
        m='0'+currentdate.getMinutes()
      }
      else{
        m=currentdate.getMinutes()
      }
      if(currentdate.getHours()<10){
        h='0'+currentdate.getHours()
      }
      else{
        h=currentdate.getHours()
      }
      let time = h + " : "  
                + m + " : " 
                + s
      if(document.getElementById('t')!==null)
      document.getElementById('t').innerHTML=time;
    },1000);
 
  
  
    return (
        <div className="Home">
        <Nav/> 
        <h1><i>HELLO! :)</i></h1>
        <h3><i>Welcome. If you already have an account here sign in to continue or else sign up first.</i></h3>
        <br />
        <br />
        <div style={{textAlign : 'center'}}>
        <h2 ><b>TIME : </b></h2>
        <h2 id='t' >{time}</h2>
        </div>
    </div>
    );
  }
  
export default Home;