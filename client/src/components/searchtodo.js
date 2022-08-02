import React from "react";
import Axios from "axios";
import { useState } from "react";
import Nav1 from './nav1';
import { useSelector } from "react-redux";
import '../css/searchtodo.css';
import { useEffect } from "react";
import { Rating } from 'react-simple-star-rating';


function SearchTodo(){
    const [state,setState]=useState({
        input:'',
    });
    //const [edit,setEdit]=useState('');
    const [todo,setTodo]=useState({
        task:[],
        load:true
    })
    
    const [edit,setEdit]=useState({
      val:'',
      id:-1,
      star:0
    })
    async function HandleChange(e){
      setState({input:e.target.value})
      
    }
    
    //console.log(state.input);
    
  
    useEffect(()=>{
        Axios.post('http://localhost:3000/api/gettaskelastic', {state})
        .then((res)=>{console.log(res.data);setTodo({task:res.data,load:false})});
        console.log('im triggered')
    },[state])
    //console.log(todo.task)
    console.log(todo.task)

    const [rating,setRating]=useState(0);
    const [prev,setPrev]=useState(0);
    function EditChange(e)
    {
      console.log(prev)
      if(prev!==+(e.target.name))
      {
      var t=0
      todo.task.map(item=>{if(item._source.id===+(e.target.name)){t=item._source.score}});
      setRating(t)
      setEdit({val:(e.target.value).toLowerCase(),
        id:+(e.target.name),star:t})
      }
      else{
      setEdit({
        val:(e.target.value).toLowerCase(),
        id:+(e.target.name),
        star:rating
      })
    }
    setPrev(+(e.target.name))
    }

   
    const handleRating=(rate)=>{
      setRating(rate)
      setEdit({
        ...edit,
        star:rate
      })
      
    }
    
    console.log(edit)

    async function EditSubmit(e)
    {
      try{
      e.preventDefault();
      const results=await Axios.post('http://localhost:3000/api/updatetask',{edit});
      setState({input:state.input})
      setEdit({val:'',id:-1,star:0});
      console.log(results);
      }
      catch(err){
        console.log(err)
      }

    }

    return(
        <div className="searchTodo">
           <Nav1/>
           <br />
        <form action='' className="form-control1">
          <label htmlFor="user" ><b>Search Task :</b></label>
          <br />
          <input id="task" name="Task" type="text" placeholder='Enter a task' onChange={HandleChange} required /> 
        </form> 
        <br />
        <br />
        {  
        todo.load===true?<div className="loader"></div>:
        (todo.task.length===0)?
          <h2 style={{"color":"azure","textAlign":"center"}}>No such Task</h2>:
          todo.task.map((item)=>
          <div className='tasks'  key={item._source.id}>
              <div className='para' ><i style={{'marginLeft':'4%'}}>{`(ID: ${item._source.id})    `}</i>
              <button className='btn-btn' onClick={async ()=>{try{ await Axios.post('http://localhost:3000/api/deletetask',{id:item._source.id});setTodo({task:todo.task.filter(t=>t._source.id!==item._source.id),load:false});}catch(err){console.log(err)}}}><b>X</b></button>
              <form action="" onSubmit={EditSubmit}>
              <input type='text' id='edit-tasks' name={`${item._source.id}`} defaultValue={`${(item._source.task)}`} onChange={EditChange} onFocus={EditChange} style={{"textTransform":"uppercase"}} required />
              {(item._source.id===+edit.id)?
              
              <div className="demo" style={{'textAlign':'center'}} >
              <Rating
                onClick={handleRating}
                ratingValue={item._source.score}
                /* transition */
                size={30}
                /* readonly={true} */
                allowHalfIcon  />
                <br />
                <input type="submit" value='Update' style={{"backgroundColor":"greenyellow","borderRadius":"5px","height":"30px"}}/>
           </div>
            
            :<></>}
              
               </form>
              </div>
              <br />
          </div>
          )
        }
        <br />
        </div>
    )
};
export default SearchTodo;