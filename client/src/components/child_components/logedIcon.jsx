import React, { useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { UserData } from "../../App";

function Loged(props) {
   const [logbtnSatus , setlogbtnSatus]= useState(false)
   const [user , setuser ] = useContext(UserData);
   const navigate = useNavigate();


    
    return (<div  className="loginContainer">
        <div className="loginUserIcon">
            <img src="/play/user.png" alt="" srcset="" />
        </div>
        <div  className="user">
            <div  onClick={()=>{setlogbtnSatus((prev)=>{return !prev})}} style={{cursor:"pointer"}}>{user?.username?.substring(0,10)}</div>
            {logbtnSatus&&<div onClick={()=>{props.logoutF()}}   className="LogoutBTn " style={{cursor:"pointer"}} > logout</div>}
            
        </div>
    </div> 
    )
}

function NotLogIcon(props) {
    const navigate = useNavigate();
    return (
        <div className="customBtn">

            <button type="button" name ="login" onClick={(e)=>{props.loginFunc("login")}}  className="btn btn-outline-secondary">Log In</button>
            <button  type="button"  name="signup" onClick={(e) => {props.loginFunc("signup")}} className="btn btn-outline-secondary ">Sign Up</button>


        </div>)
}
export default Loged;
export { NotLogIcon };