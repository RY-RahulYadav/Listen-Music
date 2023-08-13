import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

const ApiUrl= import.meta.env.VITE_URL
function loginUp(props){
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("")
    function handlechange(event) {
        const name = event.target.name;
        // console.log(name)
        const val = event.target.value
        // console.log(val)
        if (name === 'username') {
            setusername( val)
        }
        else if (name === 'password') {
            setpassword(val)
        }
    }
    // console.log(username)
    
    async function handlesubmit(event) {

        event.preventDefault()

        const res = await fetch( `${ApiUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: "include",
            body: JSON.stringify({ username: username, password: password })
        })
        
        // console.log(res)
        if (res.status === 200) {
            // console.log(await res.json())

            // const data = await res.json()
            alert("login sucessful")
            console.log(res.cookie)
            window.location.reload(true)
        }
        else{
            alert("plz enter the valid info")
        }
        


    }




    return(
        <div><div className="modalContainer"></div>
        <div className="loginBox">
        <div className="bigSignup ">
        
        <div><img src="/play/logside2.gif" alt="" /></div>
        <div onClick={(e)=>{props.loginFunc(e)}}> <i className="fa-solid fa-x crossIcon" style={{cursor:'pointer'}}></i></div>
        <form method="POST" onSubmit={handlesubmit} autocomplete="off">
        
        <div >
           <div><p className="signUpText">Log In</p></div>
            <div className="Signucontainer">
                 <div className="emailSet">
                 
                 <input onChange={handlechange} type="text" name='username' autocomplete="off"  placeholder="Username" id="email" value={username} />
                 </div>
                 <hr />
                 <div className="passwordSet">
                 
                 <input onChange={handlechange} type="password" name='password' autocomplete="off"  placeholder="Password" id="password" value={password} />
                 </div>
                 <hr />
                 <div className="submitSet">
                    <button  type="submit">Log In </button>
                 </div>
                <div className="OptionLogin"><span>Don't have an account yet ?</span> <a onClick={()=>{props.opensignupFunc("signup")}} style={{color:"rgb(0 151 255)",fontWeight:'400' , cursor:'pointer'}}> Create New</a></div>
            </div>
        </div></form></div></div></div>
    )
}
export default loginUp


function SignUp(props){
    const navigate = useNavigate()
    const [ details  , setdetails]= useState({name:"" ,username:"" , email:"" , password:""  })
    function handlechange(event) {
       
        const valname  = event.target.name;
        const val = event.target.value
       setdetails((prev)=>{
        return {... prev , [valname]:val }
       })
    
    }
   
    async function handlesubmit(event) {

        event.preventDefault()
        if(details?.name==""||details?.email==""){
            alert("plz fill the all required details");
            return;
        }

        if(details?.username.length<4){
            alert("username is too short , plz enter minimum 4 character")
            return;
          }
        if(details?.password.length<8){
           alert(" password must be  8 charchaters plz sign up again ");
         return;
        }

        const res = await fetch(`${ApiUrl}/api/auth/register`, {
           
            method: "POST",
            headers: {
             
                'Content-Type': 'application/json',

            },
            credentials: "include",
            body: JSON.stringify(details)
        })
        
        // console.log(res)
        if (res.status === 200) {

            console.log(await res.json())

            // const data = await res.json()
            alert("successfully signup")
            window.location.reload(true)
        }
        else{
            alert("plz enter the valid info")
        }
        


    }




    return(
        <div><div className="modalContainer"></div>
        <div className="loginBox">
        <div className="bigSignup">
        
        <div><img className="signimg" src="/play/logside2.gif" alt="" /></div>
       
       <div ><i   className="fa-solid fa-x crossIcon" onClick={(e)=>{props.loginFunc(e)}} style={{cursor:'pointer'}} ></i></div>
        <div></div>
        <form method="POST" onSubmit={handlesubmit} autocomplete="off">
        <div >
           <div><p className="signUpText">Signup</p></div>

            <div className="Signucontainer2">
            <div className="nameSet">
                 
                 <input onChange={handlechange} type="text" name='name' autocomplete="off"  placeholder="Full Name" id="name2" value={details.name} />
                 </div>
                 <hr />
                 <div className="passwordSet">
                 
                 <input onChange={handlechange} type="text" name='username' autocomplete="off"  placeholder="Username" id="username2" value={details.username} />
                 </div>
                 <hr />
                 <div className="emailSet">
                 
                 <input onChange={handlechange} type="email" name='email' autocomplete="off"  placeholder="Email" id="email2" value={details.email} />
                 </div>
                 <hr />
                 <div className="emailSet">
                 
                 <input onChange={handlechange} type="password" name='password' autocomplete="off"  placeholder="Password" id="password" value={details.password} />
                 </div>
                 <hr />
                 <div className="submitSet">
                    <button  type="submit">Signup </button>
                 </div>
                
            </div>
        </div></form></div></div></div>
    )
}
export{SignUp}
