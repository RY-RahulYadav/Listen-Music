import { useContext, useEffect, useState } from "react";
import {Link, Navigate, useNavigate,} from "react-router-dom"
import { UserData } from "../../App";
import { Playlistfunction } from "./all_player_function";
import { fetchUserdata } from "./all";
import Modal from "./modal"
const ApiUrl= import.meta.env.VITE_URL
function Left() {
  const navigate = useNavigate();
  const [user, setuser] = useContext(UserData)
  const [playlistF , setplaylistF] = useContext(Playlistfunction)
  const [firstModal, setFirstModal] = useState(false)
  const [secondModal, setsecondModal] = useState(false)
  const [playlistName, setplaylistName] = useState("")
  const [userstatus, setuserstatus] = useState(true)
  const [openplaylist, setopenplaylist]=useState(false)
  useEffect(() => {
 

    if (user?.playlist?.length != 0) {
      setuserstatus(false)
    }
    else {
      setuserstatus(true)
    }

    setplaylistF([openModal])
  }, [user , firstModal])

function handleOpenplaylist(){

setopenplaylist((prev)=>{
 return !prev;

})
setFirstModal(false)
      setsecondModal(false)
}

  //  input change function 
  function handlechange(event) {
    const val = event.target.value;
    setplaylistName((prev) => {
      return val
    })
  }




  // open modal function
  function openModal(type) {
    console.log("playlist")
    if(user.status!=401){
    if (type === "first") {
      console.log("playlist")
      setFirstModal(true)
    }
    else {
      setsecondModal(true)
    }}
    else{
      alert("plz login first")
    }
  }

  //  close modal function 
  function closeModal(type) {
    if (type === "first") {
      setFirstModal(false)
    }
    else {
      setFirstModal(false)
      setsecondModal(false)
    }
  }


  //submit fuction 
  async function submit() {
if(playlistName!=""){
    const res = await fetch(`${ApiUrl}/api/auth/createplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      , credentials: "include",
      body: JSON.stringify({
        username: user?.username,
        playlistName: playlistName
      })
    }).then(res => res).then(data => {return(data)})

    closeModal("second")
    alert("successfully playlist created , plz add atleast one song ")

    const data = await fetchUserdata()
    setuser(data)}
    else{
      alert("plz enter the playlist name ");
    }
  }

  return (
    <div>
      <div className="heading">
      <span >Feel The Music </span>
      <p> Discover, Listen, and Experience Music like Never Before! </p>
        <div className="customBtn">
          <button onClick={()=>{navigate("/music")}} type="button" className="playModalBtn"  style={{backgroundColor:""}}>Top Muisc</button>
          <button type="button" onClick={(e) => { openModal("first") }} className="playModalBtn" >Add Playlist </button>
        </div>
          </div>
      {firstModal && ( <div> <div className="modalContainer"></div> <div className="playlist">
            {userstatus ?
              
                <div>
                  <div>Don't Have Any Playlist </div>
                  <div>Please create new playlist Now!</div>
                </div>
              : <div>
                <div>You Have Only {user?.playlist?.length} Playlist</div>
                <div>Add New Playlist </div>
              </div>}
             <div className="closemark"><i onClick={(e) => { closeModal("first") }} className="fa-solid fa-xmark fa-xl" style={{color: "#ffffff"}}> </i></div>
            <div className=" playbtnBox" >
              <div><button type ="button" className=" playModalBtn" onClick={()=>{handleOpenplaylist()}}>Go to playlist</button></div>
              <div><button type="button" onClick={(e) => { openModal("second") }} className=" playModalBtn  ">Create Playlist</button></div></div>
          </div></div>)}

          
          {secondModal && <div> <div className="modalContainer"></div> <div className="playlist">
            <div>

              Playlist Name :<input onChange={handlechange} className="playlistlabel" id="" type="text" placeholder="Enter the name of playlist" />
            </div>
          
            <div className=" playbtnBox "  >
              
            <div><button type ="button" className=" playModalBtn" onClick={(e) => { closeModal("second") }}>Back to home</button></div>
              <div><button onClick={submit} type="button" className=" playModalBtn ">Submit</button></div>
            </div>
          </div></div>}

      {openplaylist &&<div><Modal type ="openplaylist" Handleclose={handleOpenplaylist}/></div>}
    </div>


  )
}

export default Left;