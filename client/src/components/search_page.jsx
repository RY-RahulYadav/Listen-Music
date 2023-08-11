import react ,{useState} from "react"
import Header from "./child_components/header"
import Footer from "./child_components/footer"

import SearchPageMap from "./child_components/searchPageMap"
import { useNavigate} from "react-router-dom"
import HomeDisplay from './child_components/home_display'
import { token, search , brow} from './child_components/all'
function Search_page(){
    const [state , setstate ]= useState(false)
    const [artists, setArtists] = useState("");
    const [album, setalbum] = useState({});
    const [track, settrack] = useState({});
    const [playlist, setplaylist] = useState({});
    const navigate = useNavigate()
 async   function handlechange(event){
       
        const inputValue = event.target.value;
        if(inputValue!==""){
            setstate(true)
        }
        else{
            setstate(false)
        }
     
        const fetchData= async (query, type , checker) => {
            
            const data = await search(query, type);
            if (checker ==='1') {
                setArtists(data);
            }
            else if (checker === '2') {
                setalbum(data)
            }
            else if (checker ==='3') {
                settrack(data);
            }
            else if (checker === '4') {
                setplaylist(data);
            }
        }
        
     await   fetchData(inputValue, 'track' ,'3')
     await   fetchData( inputValue, 'artist' ,'1');
      await  fetchData(inputValue, 'album' ,'2')
      await  fetchData(inputValue, 'playlist','4')
     
    }

      
    return(
        <div className="search_page">

           <div className="responsiveNav"> <Header changeFunction={handlechange} /></div> 
           <div className="flex searchdislay" >
           <i onClick={()=>{navigate('/')}} className="fa-solid fa-angle-left fa-2xl iconInvisible" style={{color: "#ffffff", marginTop:"7rem" ,fontSize:"4rem"}}></i>
                <input  onChange={(e)=>{handlechange(e)}} className="mysearch mainPageResponsive" type="search"  placeholder="Search Your Favorite songs"  />

            </div>
            
             {state?<SearchPageMap artistPass={artists} albumPass={album} trackPass ={track} playlistPass ={playlist}/>:<HomeDisplay/>
             
             }
             <Footer/>
        </div>
    )
}
export default Search_page