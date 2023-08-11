import { createContext, useState ,memo, useContext, useEffect } from "react"

 

const PlayerFuction = createContext([]);
const Playlistfunction = createContext([]);
export const isPlayingState = createContext("");



const PlayF= (props)=>{
 
  
   const [Pf , setPf ]= useState([]);
   const [all , setall] =useState(false);
   const [playlistF , setplaylistF] = useState([]);

  return(
  
     <isPlayingState.Provider value = {[all , setall]}>
    <Playlistfunction.Provider value ={[playlistF ,setplaylistF]}>
     <PlayerFuction.Provider value= {[Pf , setPf ]}>
      {props.children}
     </PlayerFuction.Provider></Playlistfunction.Provider>
     </isPlayingState.Provider> 
  )
}

export default PlayF;
export {PlayerFuction , Playlistfunction };


