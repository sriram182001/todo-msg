import React from "react";
import '../css/popup.css'
function Popup(props){
    return(props.trigger)?(
        <div className="Popup">
            <div className="Popup-inner">
                <button className='close-btn'onClick={()=>props.setTrigger(false)}><b>X</b></button>
                {props.children}
                <br />
                <br />
                <button className="copy-btn" onClick={async (e)=>{
                    e.preventDefault();
                    var copyText = document.getElementById("redirect-link");
                    //console.log(copyText)

                     /* Select the text field */
                     //copyText.select();
                     //copyText.setSelectionRange(0, 99999); /* For mobile devices */

                     /* Copy the text inside the text field */
                     await navigator.clipboard.writeText(copyText.innerHTML)

                     /* Alert the copied text */
                     alert("Copied the text: " + copyText);
                }}>Copy to clipboard</button>
            </div>
        </div>
    ):""
}
export default Popup;