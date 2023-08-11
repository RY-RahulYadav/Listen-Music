import { useState , createContext , useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home"
import Search from "./components/search_page";
import Track from './components/track';
import './styles/main.css'
import Album from './components/album';
import Artists from './components/artists';
import Player from './components/child_components/player';
import Playlist from './components/playlist';


import PlayF  , {Playlistfunction} from './components/child_components/all_player_function';
import Music from './components/music_page';



const ApiUrl= import.meta.env.VITE_URL




export const UserData= createContext("");


const App=()=> {
  
  const [user , setuser]= useState({})

 
  const [playitem , setplayitem]=useState()
  const [playindex , setplayindex] =useState(0);

  const [type , setType ] =useState()
 

   useEffect(()=>{


    const fetchUserdata = async ()=>{
      const data = await fetch(`${ApiUrl}/api/auth/getUser` ,{
     
         method: "GET",
         headers: {
        
             'Content-Type': 'application/json',
    
         },
         credentials: 'include',
     }).then((res)=>res.json()).then((data)=>{setuser(data)})
   
  
    
    }
    
     fetchUserdata()
   
   } ,[playitem])





 const  playHandle= (item , type , index)=> {
    setplayitem(item);
    setType(type)
    setplayindex(index)
    
    


  }



  return (
    <>


<PlayF>

<UserData.Provider value={[user , setuser]}>
    
      <Router>

        <Routes>
        <Route path="/" element={<Player   item ={playitem} playType ={type} playIndex ={playindex} />}>
        
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="/album/:Id" element={<Album  play={playHandle} />} />
            <Route path="/artists/:Id" element={<Artists play={playHandle} />} />
            <Route path="track/:Id" element={<Track play={playHandle} details={"Id"} />} />

          <Route path='/playlist/:Id'  element={<Playlist play={playHandle} />}/>
          <Route path='/music'  element={<Music/>}/>
          </Route>
        <Route path ='*'  element={<div style={{height:'100vh'}}><h1 style={{textAlign:'center', position:'relative', top:'40vh' }}>404 Page Not Found </h1></div>}> </Route>
           
        </Routes>
      </Router>
      
    
    </UserData.Provider> 
     </PlayF>
    
   
   
 </> 




  )
}

export default App 

