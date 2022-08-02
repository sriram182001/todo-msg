import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import '../css/viewmsg.css'
import Nav1 from "./nav1";
import Nav from "./nav";
import { useSelector } from "react-redux";


function ViewMsg(){
    const [state,setState]=useState({
        msgs:[]
    });
    const [alive,setAlive]=useState({
      al:[]
    })
    const flag=useSelector(state=>state.Reducer.loggedIn);
    useEffect(()=>{
     async function getmsg(){
        const result=await Axios.get('http://localhost:3000/api/viewmsg');
        console.log(result);
        setState({msgs:result.data})
        setAlive({al:result.data})
     }
     getmsg()
    },[])
    
    function HandleAlive(e){
      e.preventDefault()
      let a=state.msgs.filter(msg=>new Date(msg.endat)-new Date()>=0)
      setAlive({al:a})
      //console.log(a)
    }
    function HandleExpired(e){
      e.preventDefault()
      let a=state.msgs.filter(msg=>new Date(msg.endat)-new Date()<0)
      setAlive({al:a})
      //console.log(a)
    }
    //console.log(state.msgs)
    //console.log(alive.al)
    return(
         
        <div className="ViewMsg">
          {(flag===true)?<Nav1/>:<Nav/>} 
          <br />
          <p id='toggle-btn'><button onClick={HandleAlive} className="A-btn">Alive</button><button onClick={HandleExpired}className="E-btn">Expired</button></p>
          
          <p></p>
          {alive.al.map(msg=>
          <>
          <div className="Msgs">
            <h2 >{`Data:${msg.msg}`}</h2>
            <h2 >{(msg.cat==='m')?`Type: Message`:`Type: Link`}</h2>
            <h2>{(new Date(msg.endat)-new Date()>=0)?'Status: Alive':' Status: Expired'}</h2>
            {/* <h2>{`Expired at: ${msg.endat}`}</h2> */}
            <h2>{`Route: m/${msg.id}`}</h2>
          </div>
          <br />
          </>
         
          
            )}
        </div>
    )
}
export default ViewMsg;