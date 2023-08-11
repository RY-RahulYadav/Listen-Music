
import { brow } from './all'
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import { useContext } from 'react';



export default function AblumCard(props){
   const [user , setuser] = useContext(UserData)
      const navigate = useNavigate();
      async function goalbum(){
     // console.log(props.data);
      const albumdata= props.data;
      const Trackdata = await brow("https://api.spotify.com/v1/albums/"+props.data.id + "/tracks");
   
      const path="/album/"+props.data.id;
      navigate(path,{state:{trackitem:Trackdata , albumData:props.data}});

  }
  function  goPlaylist(){

  const   index = props.index -1;
  if(user?.playlist[index]?.SongId.length!==0){
     const path = '/playlist/'+ props.name;
    navigate(path ,{state:{indexNo:index}});}
    else{
      alert("plz add atleast one song ")
    }
 }

  return(   <div onClick={props.type!="playlistpage"?goalbum:goPlaylist} className="flex RelatedAlbum" style={{cursor:"pointer"}}>
                                 {props.page!="music"&&   <p style={{marginLeft:'1rem'}}>{props.index }.</p>}
                                    <img src={props.img} alt=".." />
                                    <p style={{width:'15rem'}}>{props.name?.substring(0, 20)}</p>
                                </div>)
}