import React from "react";
import Nav1 from "./nav1";
import { useState } from "react";
import '../css/createmsg.css'
import Axios  from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";
function CreateMsg(){
    const [state,setState]=useState({
        msg:'',
        ttl:'',
        cat:'m'
    });
    const [Buttonpopup,setButtonpopup]=useState(false)
    const [pgid,setPgid]=useState('')
    function HandleChange(e){
        const {name,value}=e.target;
        setState({
          ...state,
          [name]:value
        });
    }
    //console.log(state);
    
    let navigate=useNavigate();
    async function HandleSubmit(e){
        
        try
        {
        e.preventDefault();
        const response=await Axios.post('http://localhost:3000/api/createmsg',{state});
        console.log(response.data);
       
           /* document.getElementById('ind').innerHTML='Msg Created!';
           document.getElementById('msg1').value=''
           setTimeout(()=>{
            document.getElementById('ind').innerHTML='';
           },1000) */
        
        //navigate(`/m/${response.data.id}`)
        setPgid(response.data.id);
        document.getElementById('msg1').value='';
        var radio = document.querySelector('input[type=radio][name=ttl]:checked');
        radio.checked = false;
        setButtonpopup(true);
        
        
    }
    catch(err){
        //console.log(response.data)
        console.log(err);
    }
    }
 return(
    <div className="CreateMsg">
        <Nav1/>
        <br />
        <br />
        <h1 style={{color:'white'}}>Create a Diassapearing Message/Link</h1>
        <div className='forms1'> 
        <form   onSubmit={HandleSubmit}action='' className="form-control1">
          <label htmlFor="m/l"><b>Do you want to configure a message or a Link?</b></label>
          <select name="cat" id="m/l" onChange={HandleChange} required>
            <option value="m">Message</option>
            <option value="l">Link</option>
          </select>
          <p></p>
          <label htmlFor="msg1" ><b>Create a Message:</b></label>
          <br />
          <input id="msg1" name="msg" type="text" placeholder='Enter a Message' onChange={HandleChange}required /> 
          <br />
          <br />
          <label htmlFor="msg1" ><b>Select a ttl:</b></label>
          <p></p>
          <input type="radio" name='ttl' value='1' onChange={HandleChange}  required/> 
          <label htmlFor="ttl">1 MIN</label>
          <p></p>
          <input type="radio" name='ttl' value='5' onChange={HandleChange}  required/> 
          <label htmlFor="ttl">5 MINS</label>
          <p></p>
          <input type="radio" name='ttl' value='10' onChange={HandleChange}  required/> 
          <label htmlFor="ttl">10 MINS</label>
          <p></p>
          <input type="radio" name='ttl' value='30' onChange={HandleChange}  required/> 
          <label htmlFor="ttl">30 MINS</label>
          <p></p>
          <input type="radio" name='ttl' value='120' onChange={HandleChange} required/> 
          <label htmlFor="ttl">2 HRS</label>
          <br />
          <br />
          <br />
          
          <input id='sub' type="submit" value="Create"/>
        </form> 
        <br />
        <h4 id='ind' style={{color:'white',textAlign:'center'}}></h4>
        </div> 
       
       <Popup trigger={Buttonpopup} setTrigger={setButtonpopup}>
          <h1>Your Message is Here</h1>
          <a className='redirect-link' id="redirect-link"href={`http://localhost:3000/m/${pgid}`}>{`http://localhost:3000/m/${pgid}`}</a>
       </Popup>
    
    </div>
 )
}
export default CreateMsg;