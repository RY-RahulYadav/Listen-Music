import React , {useContext, useEffect, useState} from "react";
import {Link, Navigate, Outlet, useNavigate} from "react-router-dom"


import Loged, { NotLogIcon } from "./logedIcon";
import LogUp  ,{SignUp}from "./singuppage";
import { UserData } from "../../App";
import { Playlistfunction } from "./all_player_function";
const ApiUrl= import.meta.env.VITE_URL
function Header(props) {
  const [playlistF , setplaylistF] = useContext(Playlistfunction);
  const [user , setuser]  = useContext(UserData);
  const [opennav , setnav] = useState(false);
    const [loginDetails , setloginDetails]=useState();
    const [LoginStatus , setLoginStatus] = useState(false);
    const [openLogin , setOpenLogin] = useState({state: false , type:"" });
  
function RopenNav(){
  setnav(prev=>!prev);
}
function Notavailable(e){
  e.preventDefault();
  alert("This page is not available");
  
}
// console.log(user)
   function handleSetLoginTrue(type){
    const Name =  type;
     console.log("val")
     setOpenLogin((prev)=>{
           return {
             state:true,
             type:Name
           }
     })
   }
   function handleSetLoginFalse(type){
    
     
     setOpenLogin((prev)=>{
           return {... prev , state:false}
     })
   }
   

   useEffect(()=>{
    async  function  fetchLogin(){
        const res = await fetch(`${ApiUrl}/api/auth/getUser`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: "include",
        })
   
        if(res.status === 200){
           // console.log(await res.json());
           setloginDetails(res);
           setLoginStatus(true);
        }
        else{
            setLoginStatus(false);
           // console.log(res)
        }
      }
       fetchLogin();
   },[] )
   const navigate = useNavigate();
   function handleclick(){
    navigate('/search');
   }


   async function  handlelogout(){
    if(user.status!=401){
    const res = await fetch(`${ApiUrl}/api/auth/logout`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: "include",
        })
        if(res.status===200){
           
            window.location.reload(true);
            
        }}
        else{
          navigate('/')
        }
  }
  async function playlistclick(e){
    console.log(window.location.pathname)
    setnav(false); 
    if(window.location.pathname=='/'){
      playlistF[0]("first");
    }
    else{
      if(user?.playlist.length!=0){
      navigate(`/playlist/${user?.playlist[0].playlistname}` , {state:{indexNo: '0'}}) }
      else{
        alert("Don't have playlist , firstly create playlist")
      }

    }
    e.preventDefault()
  
    //  setTimeout(, 5000);
     
  }


 
   
  //  console.log(LoginStatus)
    return (<>
    
       <div className=" responsiveNav customContainer  ">
        <div className="imgtag"><img src="/logo.webp" alt="error" /></div>
        <div className="customBox">
            <div className="licontainer">
                <li><Link to ="/">Home</Link> </li>
                <li><Link to ="/music">Music</Link> </li>
                <li className="searchBar"><Link to ='/search'>Search</Link> </li>
                <li  onClick={(e)=>{ e.preventDefault();  alert("this page is not available") }}><a href="#">Go Pro</a></li>
            </div>
            <div>
                <input onClick={handleclick} onChange={(e)=>{props.changeFunction(e)}} className="mysearch " type="search"  placeholder="Search Your Favorite songs"  />

            </div>
          
            {LoginStatus?   <Loged logoutF={handlelogout}/>:<NotLogIcon loginFunc={handleSetLoginTrue}/> }
            
        </div>

       </div>
       
       
<div className=" customContainer largescreenHide">
<div className = "customContainerInside" >
         <div className="customContainerflex">
          <div className="imgtag"><img src="/logo.webp" alt="error" /></div>
          <h6 onClick={()=>{navigate('/')}} style={{color:'white' , margin:'1rem' , cursor:'pointer'}}>ListenMusic</h6> 
          <i onClick={()=>{navigate('/search')}} className ="fa-solid fa-magnifying-glass" style={{color: '#ffffff' , position:'absolute',left:'78rem' , top:'8rem' , fontSize:'4rem'}}></i></div>
          
         
          <div onClick={RopenNav}><i className="fa-solid fa-bars fa-xl" style={{color: "#ffffff" , fontSize:'4.5rem'}}></i>
          </div>
</div>


</div>

 {opennav&&<div className="CustomizeNav largescreenHide">
 <div className="loginCn">
  <div className="imgtag"><img src="/logo.webp" alt="error" /></div>
  <hr />
 <div className="loginCn2">
 {LoginStatus? <div style={{fontSize:"4rem"}}>{user?.username?.substring(0,10)}</div>:<div>
 <a onClick={()=>{RopenNav(); handleSetLoginTrue('login')}} >Login </a> / <a onClick={()=>{RopenNav();handleSetLoginTrue('singup')}}>Signup</a>
 </div>}
 <div onClick={RopenNav}> <i className="fa-solid fa-x " style={{cursor:'pointer'}}></i></div>

 </div>
 </div>
 
 <div className="NavLicontainer">
 
  <li ><i className="fa-solid fa-house commonabcIcon2 " style={{color: '#ffffff'}}></i>   <Link to='/'>Home</Link></li>
  <li ><i className="fa-solid fa-music commonabcIcon2" style={{color: "#ffffff"}}></i>  <Link to ='/music'> Music</Link></li>
  <li><i className=" fa-solid fa-magnifying-glass " style={{color: '#ffffff'  , position:'relative', top:"0rem" , left:'-5rem', fontSize:'4rem' ,marginRight:'2rem'}}></i>  <Link to='/search'> Search </Link></li>
  <li  ><i className ="fa-solid fa-table-list commonabcIcon2" style={{color: "#ffffff"}}></i> <a href="#" onClick={async (e)=>{await playlistclick(e) ; 
    }}> Playlist</a></li>
  <li onClick={()=>{ handlelogout()}}> <i className="fa-solid fa-bolt  commonabcIcon2" style={{color: "#ffffff"}}></i><Link>Logout</Link></li>

 </div>
 
                
 <div className="navImg">
               
                 <a onClick={Notavailable} href=""><img src="/social/fb.webp" alt="" /></a>   
                 <a onClick={Notavailable} href=""><img src="/social/insta.webp" alt="" /></a>   
                 <a onClick={Notavailable} href=""><img src="/social/twiiter.webp" alt="" /></a>   
                 <a onClick={Notavailable} href=""><img src="/social/message.png" alt="" /></a>   
                </div>
 
 
 </div>}
 


       <div >
            {openLogin.state&&(openLogin.type==='login'?<LogUp opensignupFunc={handleSetLoginTrue} loginFunc={handleSetLoginFalse} />:<SignUp loginFunc={handleSetLoginFalse}/>)}
         </div>



        </>

    )
}
export default Header;

// function handleSetLogin(event){
  //   const Name =  event.target.name
  
  //    setOpenLogin((prev)=>{
  //          return {
  //            state:true,
  //            type:Name
  //          }
  //    })
  //  }