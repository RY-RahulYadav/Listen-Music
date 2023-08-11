import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token, brow } from "./all";
import { UserData} from "../../App";

import Modal from "./modal"

import player from "./player";
import { PlayerFuction, isPlayingState} from "./all_player_function";



const ApiUrl= import.meta.env.VITE_URL
export default function TrackPLayBox(props) {
  const navigate = useNavigate();
  const [user, setuser] = useContext(UserData)
  const [audio, setaudio] = useState(null)
  const [playerDom, setplayerDom] = useState();
  const [state, setstate] = useState(false)
  const [modal, setmodal] = useState(false);
  const [index, setindex] = useState(0)
  const [count , setcount] = useState(0);
  const [Pf , setPf]= useContext(PlayerFuction)
  const [isPlaying , setisPlaying] =useContext(isPlayingState)


  let [playingclick , Allpage_play ,playsingStateSameAs]=Pf;





  useEffect(() => {
    let audioTag = document.getElementsByClassName('audionew')
    let playerelement = document.getElementsByClassName('specialIcon')

    setaudio(audioTag[0]);
    setplayerDom(playerelement[0])
    
    setindex(prev => props.index)
    setcount(props.index)
    if(props.index==0){
    setPf((prev=>{return [... prev , playstatus ]}))}

    
  }, [playerDom,  audio , state , user])



  //  go to track url function
  async function GOtrack() {
   
    const data = await brow(props.data.href);
  
    const path = '/track/' + props.data.id;
    navigate(path, { state: { item: data } })
  }


 



  // Function to update the audio data
  function updateAudioData(newSource) {

    audio.src = `${newSource}`;
    
    audio.addEventListener("canplaythrough", function () {

      // audio.loop='true';
      audio.play();
      
    });
 
  }




 async function playstatus(event) {
    
    const playerEle = document.getElementById('bigplayerbox');
    playerEle.classList.remove('hideplayer');
    await playsingStateSameAs();
    
    if ( state) {
      
      setisPlaying(false)
      setstate(false)
      audio?.pause()
      
      
    } 
    else {
      
      setisPlaying(true)
      setstate(true)
      
      updateAudioData(props?.data.preview_url)
      props.playFunc(props?.item, props?.type, index );
    }


    
  }



  function nextSong(situation){
    const playerEle = document.getElementById('bigplayerbox');
    playerEle.classList.remove('hideplayer');
   
   let Refindex ;
   if(situation =='next'){
    Refindex= (count+1) % props?.length;
   }
   else{
    Refindex= (count-1) % props?.length;
    if(Refindex<0){
       Refindex= props?.length-1;
    }
   }

   const element = document.getElementById(props?.item[Refindex].id)

  
   
       props.playFunc(props?.item, props?.type, Refindex);
       updateAudioData(props?.item[Refindex].preview_url)
       
       Allpage_play(props?.item[Refindex].id)
      

  }




  // opening and closing modal 
  function handleclick() {
    if(user?.status!=401){
      if(user?.playlist.length!=0){
        setmodal(true);
      }
      else{
        alert("don't have any playlist");
      }
    }
    else{
      
      alert("plz login first");
    }
  }
  function handleclose() {
    
    setmodal(false)
  }

async function SingleRemovesong(e){

  const res = await   fetch(`${ApiUrl}/api/auth/deleteSongInPlaylist`, {
    method:"DELETE",
    headers:{
       "Content-Type":"application/json"
    }
    ,credentials:"include",
    body: JSON.stringify({
      
      username:user?.username,
      playlistIndex: props?.playlistIndex,
      songId: props?.data.id
      
      
    })
  }).then(res=>res.json()).then(data =>{return (data)})

  console.log(res)
setuser(res)
    
 }



  return (

    <div  >
      <div className=" playShow"   >
        <p className ="trackboxnm " style={{ margin: '0.9rem 0rem' }} > {props.index + 1}.</p>
        <div > <img className="mainImg" src={props.img} alt=".." /> </div>
        <div className="Trbox" >
          <div> <h6 onClick={() => { GOtrack(); props.playFunc(props.item, props.type, 0) }} style={{cursor:"pointer"}} >{props.TrackName?.substring(0,30)}.</h6>
            <div className="flex" style={{cursor:"pointer"}}>{props.dataArr && props.dataArr.map((item, index) => { if (index <2) { return (<p className="artNm" >{item.name} . &nbsp;&nbsp;</p>) } })} </div></div>
          <div style={{ marginTop: "2rem" }}>
            <i onClick={() => { nextSong('previous') }} class="fa-solid fa-backward-step fa-xl" style={{ color: "#ffffff", margin: " 1.9rem" , cursor:"pointer" }}></i>
            <i onClick={(e)=>{(playstatus(e))} } id={props.data?.id}  className={ state ? "fa-pause fa-solid  fa-xl trd " : "fa-play fa-solid  fa-xl trd"} style={{ color: "#ffffff", margin: " 0rem 0.9rem" , cursor:'pointer' }} value="false"></i>

            <i onClick={() => { nextSong('next')  }}  class="fa-sharp fa-solid fa-forward-step fa-xl" style={{ color: "#ffffff", margin: "1.9rem", cursor:'pointer' }}></i>
            
              <i  className="fa-solid fa-ellipsis fa-rotate-90 fa-xl  " data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#f6f7f8", margin: "1.9rem",cursor:'pointer' }}></i>
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li><a onClick={handleclick} className="dropdown-item" style={{cursor:"pointer"}}>Add to playlist</a></li>
                {props?.type=='playlist'&&<li onClick={SingleRemovesong}><a  className="dropdown-item" style={{cursor:"pointer"}}> Remove song </a></li>}
             
              </ul>
            </div>
          </div>


        </div></div>

      <div>

        {modal && <Modal trackId={props.data.id} Handleclose={handleclose} />}


      </div>




    </div>

  );
}




// data contain single track but item contain single and multiple track



// { functionState&& <div   className="functionBox" >
//         <button onClick={handleclick} type="button">Add to playlist</button>
//          <hr />
//         <button  type="button" style={{ "border-radius":"0rem 0rem 1rem 1rem " }}>Remove song from playlist</button>
//       </div>}