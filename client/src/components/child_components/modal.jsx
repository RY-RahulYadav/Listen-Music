import "../../styles/main.css"
import { UserData } from "../../App";
import { useContext , useEffect, useState } from "react";
import { fetchUserdata } from "./all";
import { useNavigate } from "react-router-dom";
const ApiUrl= import.meta.env.VITE_URL
function Modal (props){
    const [user, setuser] = useContext(UserData)
    const navigate = useNavigate()
   
    function  goPlaylist(index){
      if(user?.playlist[index]?.SongId.length!==0){
      const name = user.playlist[index].playlistname
       const  path= '/playlist/' + name
         navigate( path ,{state:{indexNo:index}})
      }
      else {
        alert("plz add one song ")}
      }

 async  function deletePlaylist(name , index  ){
  const res = await   fetch(`${ApiUrl}/api/auth/deletePlaylist`, {
    method:"DELETE",
    headers:{
       "Content-Type":"application/json"
    }
    ,credentials:"include",
    body: JSON.stringify({
      username:user?.username,
      playlistName:name
    })
  }).then(res=>res.json()).then(data =>{return(data)})
  
    //  const data = await fetchUserdata()
     setuser(res)
   }




  async function handlesubmit(index){

    // console.log(props.trackId)
    
    const res = await   fetch(`${ApiUrl}/api/auth/addSongInPlaylist`, {
        method:"PATCH",
        headers:{
           "Content-Type":"application/json"
        }
        ,credentials:"include",
        body: JSON.stringify({
          username:user?.username,
          playlistIndex: index ,
           songId:props.trackId
        })
      }).then(res=>res.json()).then(data =>console.log(data))

     
     alert("successfully  added ")
     props.Handleclose()
     const data = await fetchUserdata()
     setuser(data)
  }
 
    return (
        <div> <div className="modalContainer"></div> <div className="playlistmodal">
          <div className="playlistBox">
           <p className="playlistcontainertitle">Your Playlist</p>
           <i onClick={()=>{props.Handleclose()}} className="fa-solid fa-xmark fa-xl" style={{color: "#ffffff;" , cursor:'pointer'}}></i>
           </div>
           <div className="playlistcontain">
           {user?.playlist.map((item , index )=>{
            return <div   className="playnamebox "> <p onClick={()=>{goPlaylist(index)}}  >{index+1}. &nbsp; <span>{item.playlistname?item.playlistname.substring(0,15):""}</span> </p> 
            {props.type!="openplaylist" ?<div>
               <i onClick={()=>{handlesubmit(index)}} class="fa-solid fa-plus fa-xl" style={{color: "#ffffff"}}> </i>
                </div>: <div onClick={()=>{deletePlaylist(item.playlistname?item.playlistname:"")}}><i className="fa-solid fa-trash fa-lg" style={{color: "#000000"}}></i></div>}</div>
         
           })}</div>
          
          
         </div></div>
    )
}
export default Modal ;
