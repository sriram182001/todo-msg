import Axios from 'axios';
import React from 'react';
import {useState,useEffect}  from 'react';
import { useDispatch } from 'react-redux';
import Nav1 from './nav1'
import '../css/addTodo.css'
import { Rating } from 'react-simple-star-rating'

function AddTodo(){
    const [state,setState]=useState({
        task:''
    });
    const [rating,setRating]=useState(0);
    function HandleChange(e){
        setState({task:e.target.value})
    }
    //console.log(state);
    //const dispatch=useDispatch();
    async function HandleSubmit(e){
        e.preventDefault();
        let response=[]
        if(rating===0)
        {
        document.getElementById('msg').innerHTML="pls rate your task's importance"
        setTimeout(()=>{
          document.getElementById('msg').innerHTML='';
         },1000)
        } 
        else{
        response=await Axios.post('http://localhost:3000/api/addtask', {state,rating})
        console.log(response.data);
        
        if(response.data[0]==='added'){
           document.getElementById('msg').innerHTML='Task Added!';
           document.getElementById('task').value='';
           setRating(0);
           setTimeout(()=>{
            document.getElementById('msg').innerHTML='';
           },1000)
        }
      }
    }
    
    const handleRating=(rate)=>{
        //console.log(rate)
        setRating(rate);
    }
    console.log(rating);
    return(
      <div className='AddTodo'>
          <Nav1/>
        <div className='forms'> 
        <form  onSubmit={HandleSubmit} action='' className="form-control1">
          <label htmlFor="user" ><b>TASK TO BE DONE:</b></label>
          <br />
          <input id="task" name="Task" type="text" placeholder='Enter a task' onChange={HandleChange}required />      
          <br />
          <br />
          <br />
          <input id='sub' type="submit" value="ADD"/>
        </form> 
        <br />
        <h4 id='msg' style={{color:'white',textAlign:'center'}}></h4>
        <h2 style={{color:'white',textAlign:'center'}}>How Important is your Task</h2>
        <div className="demo" style={{'textAlign':'center'}} required>
                  <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    transition
                    size={50}
                    /* readonly={true} */
                    allowHalfIcon
                  />
        </div>
        </div> 
        
      </div>
    )
};
export default AddTodo;