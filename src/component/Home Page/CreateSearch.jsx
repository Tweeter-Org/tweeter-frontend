import React, { useState } from "react";

function CreateSearch(props){
    const [text, setText] = useState("");
   
return <>
    <div className="ctSearchBlock">
   
    <p id="ctSearchATR">@{props.username}</p>
       
    </div>
</>
}

export default CreateSearch