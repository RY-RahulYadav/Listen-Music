import '../styles/track.css'
import '../styles/main.css'
import Card from './child_components/card';
import { useLocation, useParams } from "react-router-dom";
import Header from "./child_components/header";
import { useEffect, useState } from "react";
import { token, brow } from "./child_components/all";
import TrackBody from "./child_components/TrackInfo";
import TrackPlayBox from "./child_components/TrackPlayBox";
import Footer from "./child_components/footer";
import arr from '../../public/color_array.js'
import Player from './child_components/player'
import ArtistCard from "./child_components/artistCard";
import Pass from './child_components/all_player_function';

export default function Track(props) {
  const [relatedArtist , setRelatedArtist]=useState();
  const [colorNo, setNo] = useState()
  const items = useLocation();
  const data = items.state.item
  
  useEffect(() => {
    window.scrollTo({top:0,behavior:"auto"})
    const fetchdata =async (url)=>{
      const data = await brow(url);
      console.log(data)
      setRelatedArtist(data)
    }
    fetchdata("https://api.spotify.com/v1/artists/"+data.artists[0].id +"/related-artists");
    
    const color_no = Math.floor(Math.random() * 6);
    setNo(color_no)
  }, [])
  
  
  
  
  // console.log(arr)
  // console.log(colorNo)
  // console.log(data)
  // console.log(relatedArtist)
  // console.log(props.play)

  return (<div className="trackBig" style={arr[colorNo]}>
    <Header />
    
    <TrackBody playFunc={props.play} item={data} img={data.album.images[0].url} type={data.album.album_type} TrackName={data.name} dataArr={data.artists} />
    <hr className="trHr" />
 
    <div className="trackflex">
    <div className={ relatedArtist?.artists.length==0||relatedArtist?.artists[0].images.length==0?" displayNone ":"" +" bigRelatedArtistBox responsiveNav "} >
            <h2 style={{margin:'2rem 3rem'}}>Top Related Artists</h2>
            <div style={{padding:' 0rem 2rem'}}>
            {relatedArtist?.artists.map((item , index)=>{
             if(index<4){
             return(
              <ArtistCard  artistData ={item} img ={item.images[0]?.url} name={item.name} index={index+1}/>
               
                )}
            })}</div>
        </div>
       
       <div style={{marginTop:'1rem'}}>
       
       <TrackPlayBox playFunc={props.play} data ={data} type="track" item ={data} img={data.album.images[0].url}  index={0} TrackName={data.name} dataArr={data.artists} /></div>
    </div>
    
   
   
    <Footer/>
  </div>


  )
}
//data contain track data , item also contain track data