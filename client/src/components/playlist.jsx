import "../styles/main.css";
import "../styles/artist.css";
import Header from "./child_components/header";
import TrackBody from "./child_components/TrackInfo";
import AblumCard from "./child_components/albumCard";
import { UserData } from "../App";
import TrackPlayBox from "./child_components/TrackPlayBox";
// import { UserData } from "./home";
import Footer from "./child_components/footer";
import { useContext, useEffect, useState } from "react";
import { token, brow } from "./child_components/all";
import { useLocation, useNavigate } from "react-router-dom";


function Playlist(props) {
  const navigate = useNavigate()
  const {state}=useLocation();
  // console.log(state)
 
  const [user, setuser] = useContext(UserData);
  const [item , setitem] =useState()
  const {playlist}=user ;
  const playlistname = user?.playlist ? (user.playlist[state.indexNo].playlistname) : ""
  const songID= playlist?(playlist[state.indexNo]&&playlist[state.indexNo]?.SongId):""
  // console.log(songID)
  useEffect(() => {
    window.scrollTo({top:0,behavior:"auto"})
    
//console.log(item)

    const fetchTracks = async () => {
      if (songID) {
        const trackData = await Promise.all(
          songID.map((item) => fetchTrackBySongId(item))
        );
        // console.log(trackData);
        setitem(trackData)
      }
    };

    fetchTracks();
   
  }, [songID , user , state.indexNo ] );




  async function fetchTrackBySongId(songid) {
      const fetchdata = await brow("https://api.spotify.com/v1/tracks/" + songid);
      // setPlaylisttrack(fetchdata);
      // console.log(fetchdata);
      return fetchdata;
  
  }
  
  


//console.log(item)

  return (
    <div className="trackBig"  >
      <Header />

      <div className="flex  " >
        <div className="add">
          <TrackBody item={item} playFunc={props.play} Follow={"0"} img={songID&&(item&&item[0]?.album?.images[1].url)} type={"Playlist"} TrackName={playlistname} dataArr={[""]} /></div>



      </div>
      <hr className="trHr" />
      <div className="artistsMap ">
        <div className="flex ">
          <div className="hideplaylist">
            <h3 className="" style={{ marginLeft: '3rem' }}>Your Playlist</h3>
            <div className="sideContainerArtist albumItem">
              {user?.playlist && user?.playlist.map((item, index) => {
                return (
                  <AblumCard type ="playlistpage" data={item} img={"https://img.freepik.com/free-vector/music-vinyl-record-label-with-sound-notes-background_1017-36729.jpg"} name={item.playlistname} key={item.id} index={index + 1} />


                )
              })}
            </div>
          </div>
        </div>
        <div className="marginBottomcontainer" >
          <h3 className="" style={{ marginLeft: '3rem' }}>Top  Tracks</h3>
          {item&& item.map( (singleitem, index) => {
            
                console.log(item?.album?.images[1])
            return (
              <>
            
              <TrackPlayBox playFunc={props.play} item={item} data={singleitem} img={singleitem?.album?.images[1].url} type ="playlist" index={index} playlistIndex={state.indexNo} TrackName={singleitem?.name} dataArr={singleitem.artists} length={item.length} />
            </>  )
          })}
        </div>
      </div>
      {/* <h1  >TOP TRACKS</h1> */}





      <Footer />
    </div>


  )
}
export default Playlist

