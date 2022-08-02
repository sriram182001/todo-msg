import React, { useEffect } from 'react';
import pic from '../Images/PHOTO.jpeg';
import { useSelector } from 'react-redux';
import { useNavigate,Redirect } from 'react-router-dom';
function Nopage(){
   
    
   return (
        <div>
        <img style={{ width: 300, height: 400,marginLeft:'auto',marginRight:'auto',display:'block' }} src={pic}/>
        <h1 style={{textAlign:'center'}}>Go Back bro, here you can't find anything other than me.</h1>
        </div>
    ) 
}
export default Nopage;