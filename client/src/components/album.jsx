import { useLocation, useParams } from "react-router-dom";
import Header from "./child_components/header";
import Footer  from "./child_components/footer";
import { useEffect, useState } from "react";
import { token, brow } from "./child_components/all";
import TrackBody from "./child_components/TrackInfo";
import TrackPlayBox from "./child_components/TrackPlayBox";
import '../styles/track.css'
import arr from '../../public/color_array.js'
import ArtistCard from "./child_components/artistCard";
// console.log(arr)
import Pass from "./child_components/all_player_function";
import Card from "./child_components/card";

export default function Album(props) {
  const [relatedArtist , setRelatedArtist]=useState();
  // const [Trackdata , settrackdata] = useState({});
  // const [AlbumData , setalbumdata] = useState({})
  let state =false
  const [arr2, setarr2]=useState();
  const [colorNo, setNo] = useState()
  const items = useLocation();
  const Trackdata = items.state.trackitem
  const AlbumData = items.state.albumData

  window.scrollTo({top:0,behavior:"auto"})
   

  useEffect(() => {
    window.scrollTo({top:0,behavior:"auto"})
    // settrackdata(items?.state.trackitem)
    // setalbumdata(items?.state.albumData)
    const element =    document.getElementsByClassName('trd')
    // console.log(element)
    setarr2(element)
   
    const fetchdata =async (url)=>{
      const data = await brow(url);
      // console.log(data)
      setRelatedArtist(data)
    }
    fetchdata("https://api.spotify.com/v1/artists/"+AlbumData.artists[0].id +"/related-artists");

    const color_no = Math.floor(Math.random() * 6);
    setNo(color_no)

  }, [setarr2])
  
  
  //console.log(colorNo)
 // console.log(Trackdata)
 // console.log(AlbumData)
 

  return (
    <div className="trackBig" style={arr[colorNo]}>
      <Header />
      <TrackBody playFunc={props.play} item={Trackdata?.items} img={AlbumData.images[0]?.url} type="album" TrackName={AlbumData?.name} dataArr={AlbumData?.artists} />
      <hr className="trHr" />
      <div className="Ablumflex" >
        <div className="bigRelatedArtistBox responsiveNav">
            <h2 style={{margin:'2rem 3rem'}}>Top Related Artists</h2>
            <div style={{padding:' 0rem 2rem'}}>
            {relatedArtist?.artists.map((item , index)=>{
             if(index<4){
             return(
              <ArtistCard  artistData ={item} img ={item.images[0].url} name={item.name} index={index+1}/>
                )}
            })}</div>
        </div>
        
        <div className="MusicContainer3 largescreenHide">
            <div className='title'> Top Artists  </div>
            <div className="flex scroll">

                {relatedArtist?.artists.map((item) => {
                    return (<Card itemData={item} name={item.name} imgUrl={item.images[0]?.url} />)

                })}
            </div>
        </div>

        <div >
            {Trackdata?.items.map((item, index) => {
              
              return <TrackPlayBox key={item.id} playFunc={props.play} type="album"   item={Trackdata?.items} data={item} index={index} img={AlbumData?.images[0].url} TrackName={item.name} dataArr={item.artists} length={Trackdata?.items.length} />
            })}</div>
      </div>

      <Footer/>
    </div>


  )
}