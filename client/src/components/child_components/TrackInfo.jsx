import { useEffect, useState, useContext } from "react";
import { PlayerFuction, isPlayingState } from "./all_player_function";

function TrackBody(props) {
  const [Pf, setPf] = useContext(PlayerFuction)


  let [playingclick, Allpage_play, playsingStateSameAs, playstatus] = Pf;
  const [state, setstate] = useContext(isPlayingState)
  const [audio, setaudio] = useState(null)
  const [playerDom, setplayerDom] = useState();
  useEffect(() => {
    let audioTag = document.getElementsByClassName('audionew')
    let playerelement = document.getElementsByClassName('specialIcon')


    setaudio(audioTag[0]);
    setplayerDom(playerelement[0])

  }, [playerDom, audio,])

  function playhandle(event) {
    const playerEle = document.getElementById('bigplayerbox');
    playerEle.classList.remove('hideplayer');

    playsingStateSameAs()
    let index;
    if(localStorage.getItem("index")==null){
      index= 0;
    }
    else{
      index=localStorage.getItem("index")
    }
    const element = document.getElementById(props?.item[index].id)



    if (state) {
      element.classList.add('fa-play');
      element.classList.remove('fa-pause');

      audio?.pause()
      setstate(false)

    }
    else {
      element.classList.add('fa-pause');
      element.classList.remove('fa-play');
    

    
      props?.playFunc(props?.item, props?.type, index)
      audio.addEventListener("canplaythrough", function () {
        audio.play();
  
      });
      setstate(true)
    }


    // playingclick();

  }

  return (<div className="trackContainer"  >

    <div className="leftTr trbox"  >
      <img src={props.img} alt=".." />
    </div>

    <div className="rightTr " >
      <p className="trText">{props.type}</p>
      <h1 className="trText"   >{props.TrackName.substring(0, 20)}</h1>
      {props.type != 'artist' ? <div className="trartist">{props.dataArr.map((item, index) => { if (index < 4) { return (props.type != 'Playlist'&&<p>{item.name.substring(0,15)} . &nbsp;&nbsp;</p>) } })}</div> : <p > {props?.Follow} followers</p>}
      <div className="bigTrackBtn">
        <div className="flex">
          <div onClick={() => { playhandle(); }} className="trackbtn"> <button type="button" className="btn btn-outline-secondary"> {state ? "Pause Now " : "Play Now"}</button></div>
          <div className="trackbtn">

            <button onClick={() => { alert("download available for  premium user only  ") }} type="button" className="btn btn-outline-secondary" style={{ borderRadius: '3rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" class="h-6 w-6 inline-flex"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download
            </button>
          </div>
        
        </div>



      </div>

    </div>
  </div>)
}

export default TrackBody;