import  Axios  from "axios";
import React from "react";
import '../css/getmsg.css'
import Nav from "./nav";
import Nav1 from "./nav1";
import { useEffect } from "react";
import { useState } from "react";
import {  useParams } from "react-router-dom";
import { useSelector } from "react-redux";


function Getmsg(){
    let {id}=useParams();
    //console.log(id);
    const flag=useSelector(state=>state.Reducer.loggedIn);
    const [state,setState]=useState({
        msg:'',
        endat:new Date(),
        cat:''
    })
    const [cnt,setCnt]=useState(``);
    useEffect(()=>{
    async function gm(){
        try{
    let res=await Axios.post('http://localhost:3000/api/getmsg',{idd:id})
    //.then(res=>{console.log(res.data);console.log(res.data.endat);setState({msg:res.data.msg,endat:new Date(res.data.endat.replace(' ', 'T'))})}).catch(err=>console.log(err));
    //console.log(res.data.endat)
    let x=new Date(res.data.endat)
    setState({msg:res.data.msg,endat:x,cat:res.data.cat})
    //console.log(res)
    //console.log(x)
        }
        catch(err){
            console.log(err)
        }
}
gm(); 
    
},[]) 
    




setInterval(async ()=>{
    try{
    const time=new Date()
    /*
    const res=await Axios.post('http://localhost:3000/api/getmsg',{idd:id})
    const x=new Date(res.data.endat) */
    
    //setState({msg:res.data.msg,endat:x})
    //console.log(state)
    if(state.endat-time>=0){
        
        
        //document.getElementById('ans').innerHTML=`${state.endat}`
        
        //document.getElementById('time').innerHTML=`${Math.floor((state.endat-time)/(1000*60))+":"+(Math.floor((state.endat-time)/1000))%60}`
        //console.log(Math.floor((state.endat-time)/(1000*60))+":"+(Math.floor((state.endat-time)/1000))%60)
        setCnt(`${Math.floor((state.endat-time)/(1000*60*60))%24+":"+Math.floor((state.endat-time)/(1000*60))%60+":"+(Math.floor((state.endat-time)/1000))%60}`)
        
    }
    else{
        setCnt('')
    }
    
    }
    catch(err){
    console.log(err)
    //if(document.getElementById('ans').innerHTML!==null)
    //document.getElementById('ans').innerHTML='Oops! sry this page May or May not have existed.'

    }
   
    

},1000)
    


/* console.log(state.msg)
console.log(state.endat)
const time=new Date()
console.log(time)
console.log(Math.ceil((time-state.endat)/1000)) */
return(
     <div className="GetMsg">
      {(flag===true)?<Nav1/>:<Nav/>}  
      <br />
      <div className="msgbox">
      {(state.cat==='m')?
      <h1>{(state.endat-new Date()>=0)?'Message : ':''}</h1>
      :<h1>{(state.endat-new Date()>=0)?'Link : ':''}</h1>}
      {(state.cat==='m')?
      <h1 id='ans'>{(state.endat-new Date()>=0)?state.msg:'Oops! sry this page May or May not have existed'}</h1>
      :<h1 id="ans">{(state.endat-new Date()>=0)?<a style={{color:"whitesmoke"}}href={`${state.msg}`} target="_blank">{state.msg}</a>:'Oops! sry this page May or May not have existed'}</h1>}
      </div>
      <p id='time'>{(state.endat-new Date()>=0)?'This message will disappear in :':''}</p>
      <p style={(parseInt(cnt[cnt.length-3])==0 && parseInt(cnt[cnt.length-1])<=5)?{color:"red"}:{color:"greenyellow"}}id='time'>{(state.endat-new Date()>=0)?cnt:''}</p>
      
    </div> 
    
) 
}

export default Getmsg;