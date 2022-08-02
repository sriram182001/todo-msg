import Axios from 'axios';
import React from 'react';
import { useNavigate,Link} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import { useDispatch,useSelector ,connect} from 'react-redux';
import Nav1 from './nav1'
import '../css/getTodo.css'
import store from '../reducers';
import { Rating } from 'react-simple-star-rating';

function GetTodo(props){
    const [todo,setTodo]=useState({
        tasks:[],

}); 

const dispatch=useDispatch();
const gettodo=async()=>{
    try{
    const response=await Axios.get('http://localhost:3000/api/gettask');
    console.log(response);
    dispatch({type:'ADD_TODO',payload:response.data})
    return response.data
    }
    catch(error){
     console.log(error);
     return error
    }
};

useEffect(()=>{
    gettodo()
    .then((arr)=>{
        //setTodo({tasks:arr})
        console.log(arr)
        
    })
    .catch((err)=>console.log(err))
    },[])
    //console.log(todo)
    /* async function HandleClick(){
        try{

        const resp=await Axios.post('http://localhost:3000/api/deletetask',{id:this.id});
        console.log(resp)
        }
        catch(error){
            console.log('error');
            console.log(error);
        }
    } */
    const ls=useSelector(state=>state.TodoReducer.todos)
    console.log(ls)
    let i=0;
    return(
      <div className='GetTodo'>
          <Nav1/>
          
          <br />
          <h1 ><b>TASK DASHBOARD</b></h1>
          <br />
          
          {
          (ls.length===0)?
          <h2>No Tasks to Complete</h2>:
          
          ls.map((item)=>
          <div className='tasks'  key={item.id}>
            <div className='para'><div id='no'>{`${i=i+1}.`}</div><i>{`(ID: ${item.id})    `}</i><b><i>{(item.task).toUpperCase()}</i></b><button className='btn-btn' onClick={async()=>{try{const resp=await Axios.post('http://localhost:3000/api/deletetask',{id:item.id});console.log(resp);dispatch({type:"DELETE_TODO",payload:{id:item.id}})}catch(err){console.log(err)}}}><b>X</b></button></div>
            <div className="demo" style={{'textAlign':'center'}} required>
                  <Rating
                    ratingValue={item.score}
                    transition
                    size={30}
                    readonly={true}
                    allowHalfIcon
                  />
        </div>
            <br />
          </div>
          
          )
         
          }
          <br />
      </div>  
    )
}
/* function mapStateToProps(state) {
    console.log(state)
} */
export default GetTodo;