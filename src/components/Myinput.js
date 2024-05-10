import { useState } from "react"

function Myinput(props){
    const[name, setName] = useState("")
    
    return(
        <>
            <div>{props.label}</div>
            <div>
                <input onChange={(e) => setName(e.target.value)}/>
                </div>
            <div>{name}</div>
        </>
    )
}

export default Myinput