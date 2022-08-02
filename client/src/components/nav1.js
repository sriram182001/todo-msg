import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import '../css/nav1.css'
function Nav1()
{
    let navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=async()=>{
        const response=await Axios.get('http://localhost:3000/api/logout');
        console.log(response)
        if(response.data==='loggedout'){
            dispatch({type:'CHECK_LOGIN',loggedIn:false});
            navigate('/signin')
        }
    }



return(
    
        
    <nav className='navbar'>
        <ul>
        <h1 className='navh' ><b>AMOR FATI</b></h1> 
        <li><Link to="/welcome"><b>Home</b></Link></li>
        <li><Link to="/addTodo"><b>Add Task</b></Link></li>
        <li><Link to="/getTodo"><b>My Tasks</b></Link></li>
        <li><Link to='/searchTodo'><b>Search a Task</b></Link></li>
        <li><Link to="/createmsg"><b>Create Msg/Link</b></Link></li>
        <li><Link to="/viewmsg"><b>My Msg/Link History</b></Link></li>
        <li className='lb'><button  className='lgbtn' onClick={logout}><b>LOGOUT</b></button></li>
        </ul>
    </nav>
)};
export default Nav1;

    
