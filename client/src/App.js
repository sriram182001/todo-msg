import './css/App.css';
import { BrowserRouter,Route,Routes, Navigate, useLocation} from 'react-router-dom';
import { TransitionGroup,CSSTransition } from "react-transition-group";
import SignIn from './components/signin';
import SignUp from './components/signup';
import Home from './components/home';
import Mspc from './components/welcome';
import AddTodo from './components/addTodo';
import GetTodo from './components/getTodo'
import CreateMsg from './components/createmsg';
import Getmsg from './components/getmsg';
import ViewMsg from './components/viewmsg';
import SearchTodo from './components/searchtodo';
import React from 'react';
import {useEffect,useState} from 'react';
import Axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
//import { CookiesProvider } from 'react-cookie';

function App() {
  //loading = true
  // make api call to get user details
  // set loggedIn status in redux
  //if(loading) return 'I am loading';
  
  const dispatch=useDispatch();
  const flag=useSelector(state=>state.Reducer.loggedIn)
  console.log(flag)
  //const[isloggedin,setloggedin]=useState(false)
  useEffect(()=>{
    //setInterval(async ()=>{
    async function apicall(){
      try{
      const response=await Axios.get('http://localhost:3000/api/authenticate'); //401
      console.log(response.data)
      dispatch({type:'CHECK_LOGIN',loggedIn:response.data})
      }
      catch(err){
        console.log(false);
        dispatch({type:'CHECK_LOGIN',loggedIn:false})
      }
    }
  apicall(); 
  //},1000)
},[]) 


const Transition=()=>{
  const location=useLocation();
  return(
  <TransitionGroup>
  <CSSTransition key={location.key} classNames="fade" timeout={300} >
  <Routes >
    {(flag===true)?
    <>
    <Route path='/welcome' element={<Mspc/>}/>
    <Route path='/addTodo' element={<AddTodo/>}/>
    <Route path='/getTodo' element={<GetTodo/>}/>
    <Route path='/createmsg' element={<CreateMsg/>}/>
    <Route path='/viewmsg' element={<ViewMsg/>}/>
    <Route path='/searchTodo' element={<SearchTodo/>}/>
    </>:
    <>
    <Route path="/" element={<Home/>}/>
    <Route path="/signin" element={<SignIn />}/>
    <Route path="/signup" element={<SignUp />}/>
    </>
    
    }
    <Route path='/m/:id' element={<Getmsg/>}/>
    <Route path='*' element={<div><br /><br /><h1>Page Not Found :(</h1></div>/* flag===true)? <Navigate to="/welcome" />:<Navigate to="/"/> */}/>
    </Routes>  
  </CSSTransition>
  </TransitionGroup>
  )
};
return (
  <div className='App'>
    <BrowserRouter>  
    <Transition/>
    </BrowserRouter>

  </div>  

  );
}

export default App;
