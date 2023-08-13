import { createContext, useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { brow } from "./all";
import { PlayerFuction, isPlayingState} from "./all_player_function";



export default function player(props) {
  const navigate = useNavigate();
  const Refindex = props.playIndex
  const playItem = props.item
  const playType = props.playType

  // useState 
  const [isPlaying, setisPlaying] = useContext(isPlayingState)
  const [track, setTrack] = useState("")
  const [audio, setaudio] = useState(null)
  const [progress, setprogress] = useState(null)
  const [currentTime, setcurrent] = useState(null)
  const [index, setindex] = useState(Refindex);
  const [songid, setsongid] = useState();

  const [Pf, setPf] = useContext(PlayerFuction)




  useEffect(() => {

    let audioTag = document.getElementById('newaudio')

    let progressBar = document.getElementById('progress')
    let curTime = document.getElementById('time1')
  
   
    // console.log(index);
    // console.log(audioTag2)
    setaudio(audioTag)
    setprogress(progressBar)
    setcurrent(curTime)

    if (playType == 'track') {
      setTrack(playItem)
      setsongid(playItem?.id)

    }
    else {
      const fetchdata = async () => {
      if(playItem){
        const data = await brow(playItem[Refindex]?.href)
        console.log(data)
        setsongid(data?.id);
        
        setTrack(data)}
        else{
          return;
        }
      }


      fetchdata();

    }



    setindex(Refindex)
    
    localStorage.setItem("index", Refindex);
    
    console.log(track)
    

    setPf([handleclick, Allpage_play, playsingStateSameAs])
  }, [playItem, Refindex, audio ])

  // total duration of music 
  const totalmin = Math.floor(track?.duration_ms / (1000 * 60))
  const totalsec = Math.floor((track?.duration_ms / 1000) % 60)
  const totalduration = `${totalmin < 10 ? '0' : ''}${totalmin}:${totalsec < 10 ? '0' : ''}${totalsec}`
  // declare some variable 


  //loop song 
  function loop() {
    audio.loop = 'true';
  }
  function playsingStateSameAs() {
    const elements = Array.from(document.getElementsByClassName('trd'));

    elements.forEach((element) => {
      element.classList.remove('fa-pause');
      element.classList.add('fa-play');
    });
  }


  // timeUpdate function 
  function TimeUpdated() {

    let totalduration = audio.duration
    let current = audio.currentTime
    console.log(totalduration)
    console.log(current)
    let progressbar = (current / totalduration) * 100;
    progress.value = progressbar;
    const currMin = Math.floor(audio.currentTime / 60)
    const currsec = Math.floor(audio.currentTime % 60)
    currentTime.innerText = `${currMin}:${currsec < 10 ? '0' : ''}${currsec}`



  }



  function updateAudioData(newSource) {
    audio.src = newSource;
    audio.addEventListener("canplaythrough", function () {
      audio.play();

    });
  }

  // volume change function 
  function volumeChange(event) {
    const volumeValue = (event.target.value) / 100
    audio.volume = volumeValue
    console.log((audio.volume) * 100)

  }


  function Allpage_play(id ) {

    playsingStateSameAs()
    const element = document.getElementById(id);

    if (isPlaying) {
    
      element.classList.remove('fa-play')
      element.classList.add('fa-pause')
      
      

    }
    else {
      
      element.classList.remove("fa-pause")
      element.classList.add("fa-play")
    
    }

  }


  // handleclick function 
  function handleclick(event) {


    isPlaying === false ? audio?.play() : audio?.pause();
    setisPlaying((prev) => {
      return (!prev)
    })
    const element = document.getElementById(songid);
    console.log(songid)
    if (isPlaying) {
    
      element.classList.remove("fa-pause")
      element.classList.add("fa-play")
      
      

    }
    else {
      
      
      element.classList.remove('fa-play')
      element.classList.add('fa-pause')
    }
    
 

  }

function handlego_track(){
  if(track){
  const path = '/track/' + track?.id;
  navigate(path, { state: { item: track } });
  const element = document.getElementById(songid);
  
  if (isPlaying) {
  
    element.classList.remove("fa-pause")
    element.classList.add("fa-play")
    
    

  }
  else {
    
    
    element.classList.remove('fa-play')
    element.classList.add('fa-pause')
  }
  




}
  else{
    return;
  }

}


  async function next_song(situation) {
    
    let i;
    if (situation == 'next') {
      i = (index + 1) % playItem?.length
    }
    else {
      i = (index - 1) % playItem?.length
      if (i < 0) {
        i = playItem?.items.length - 1
      }
    }
    if (playType == 'track') {
      setTrack(playItem)
setisPlaying(true)

      updateAudioData(playItem?.preview_url)
    }
    else {
      if(isPlaying){
      const data = await brow(playItem[i].href)
      setTrack(data)
      updateAudioData(playItem[i].preview_url)
      setindex((prev) => { return i })
      setsongid(playItem[i].id)
      localStorage.setItem("index", index);
      // setisPlaying(true)
      Allpage_play(playItem[i].id)}
      else{
        setisPlaying(true)
      }
    }



  }



  return (<div>
      <Outlet />
      <div className="hideplayer" id="bigplayerbox" style={{ width: '100vw', position: 'fixed', bottom: '0rem', margin: 'auto' }}>
        <div className="playerScroll">
          <audio onEnded={() => { next_song('next') }} id="newaudio" className="audionew" onTimeUpdate={TimeUpdated} src={track?.preview_url} > </audio>
          <input id='progress' type="range" min="0" max="100" />
        </div>
        <div  className="playerbox">
          <div className="playerImg"><img src={track?.album?.images[0].url} alt=".." /></div>
          <div className="playerEqual">
            <div className="playTiteName ">
              <div onClick={handlego_track} className="playerSong">{track?.name?.substring(0,19)} </div>
              <div className="playerArtist flex">{track?.album?.artists.map((item, index) => { if (index <= 1) { return <p>{item.name?.substring(0,10)}&nbsp;   </p> } })}</div>
            </div>
            <div className="playerImgBox flex">
              <div className=" playerBackward" onClick={() => { next_song('previous') }}><i  className="fa-solid fa-backward-step fa-xl" ></i></div>
              <div >{<i id="playerstate" onClick={handleclick} className={"fa-solid " + (isPlaying ? "fa-pause " : "fa-play ") + "  fa-xl  specialIcon"} value={isPlaying}></i>}</div>

              <div className="playerForward" onClick={() => { next_song('next') }}><i className="fa-sharp fa-solid fa-forward-step fa-xl" ></i></div>
            </div>
            <div className="flex timeval ">
              <div id='time1' value="">0:00 &nbsp; </div> /
              <div id='time2'>{totalduration != 'NaN:NaN' ? totalduration : "0:00"}</div>
            </div>
            <div>
              <div className="flex playerVoice">
                <img src="..\..\..\public\play\icons8-voice-50.png" alt="" />
                <input id="volume" type="range" onChange={volumeChange} min={"0"} max={'100'} /></div>
            </div></div>


        </div>
      </div>

    </div>
  )


}
