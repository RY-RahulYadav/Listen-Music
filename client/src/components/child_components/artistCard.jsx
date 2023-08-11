import { useNavigate } from "react-router-dom"
import { brow } from "./all"

export default function ArtistCard(props){

    const navigate = useNavigate();
    async function goartist(){
   
     const  Trackdata = await brow("https://api.spotify.com/v1/artists/" + props.artistData.id + '/top-tracks?market=IN');
     const path = "/artists/"+ props.artistData.id;
     navigate(path, {state:{ArtistsTrackdata: Trackdata, ArtistsData:props.artistData}});

    }
   return (
    <div onClick={goartist} className="relatedArtist" style={{cursor:'pointer'}}>
                    
                     <img src={props.img} alt="" />
                     <p>{props.name}</p>
                </div>
   )


}