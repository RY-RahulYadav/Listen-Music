import react, { useContext, useEffect, useState } from "react"
import Card from "./card"



import { token, search , brow} from './all'

const token_id = await token()
function HomeDisplay() {
  const [artists, setArtists] = useState({});
  const [album, setalbum] = useState({});
  const [track, settrack] = useState({});
  const [newRelease, setnewRelease] = useState({});
  const [track2, settrack2] = useState({});
    const [track3, settrack3] = useState({});
  useEffect(() => {
    const fetchDataBySerch = async (query, type , checker) => {

      const data = await search(query, type);
      if (checker === '1') {
        setArtists(data);
      }
      else if (checker === '2') {
        setalbum(data)
      }
      else if (checker ==='3') {
        settrack(data);
      }
      else if (checker === '4') {
        settrack2(data);
    }
    else if (checker === '5') {
        settrack3(data);
    }
      
      

    }
    const fetchDataBynew= async (url , checker)=>{
      const data = await brow(url);
      // console.log(data)
      if(checker==='6'){
      setnewRelease(data)}
     
      
    }
   
  
    fetchDataBySerch('arjit,jubil,sonu,atif,Darshan Raval,Badshah,Udit Narayan,A. R. Rahman,Rahat Fateh Ali Khan,Amit mishra', 'artist' ,'1');
    fetchDataBySerch('atif,Darshan Raval,sonu,Badshah,arjit,jubil,', 'album' ,'2')
    fetchDataBySerch('S, Bolna, atif, arjit ', 'track' ,'3')
    fetchDataBySerch('. Amrit Maan · Diljit Dosanjh ', 'track', '4')
    fetchDataBySerch('arjit song  ', 'track', '5')
    fetchDataBynew("https://api.spotify.com/v1/browse/new-releases?country=IN&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20",  '6') 
    

  }, []);
  // console.log(newRelease);
  // console.log(artists)
  // console.log(album)
  // console.log(track)
  

  return (<>
  
 
    <div>
      <div className='title'> Treading Album<hr className="hr1 responsiveNav " /></div>
      <div className="flex scroll">

        {album.albums?.items.map((item,index) => {
          return (<Card key={index} itemData={item}  name ={item.name} imgUrl={item.images[0].url}/>)

        })}
      </div>
    </div>
    
    <div>
      <div className='title'> New Release<hr className="hr1 responsiveNav" /></div>
      <div className="flex scroll">

        {newRelease.albums?.items.map((item , index) => {
          return (<Card key={index} itemData={item}  name ={item.name} imgUrl={item.images[0].url}/>)

        })}
      </div>
    <div>
      <div className='arCardRot title'> Top Artists <hr className="hr1 responsiveNav" /></div>
      <div className="flex scroll">

        {artists.artists?.items.map((item,index) => {
          return ( <Card key={index} itemData={item}  name ={item.name} imgUrl={item.images[0]?.url}/>)

        })}
      </div>
    </div>
    </div>
    
    
    <div>
      <div className='title'>Hindi Songs <hr className="hr1 responsiveNav"/></div>
      <div className="flex scroll">

        {track.tracks?.items.map((item , index ) => {
          return ( <Card key={index} itemData={item}  name ={item.name.substring(0 , 35)} imgUrl={item.album.images[0].url}/>)

        })}
      </div>
    </div>

    <div>
                 <div className='title'>Top Punjabi Songs </div>
                    <div className="flex scroll">

                        {track2.tracks?.items.map((item, index) => {
                            return (<Card key={index} itemData={item} name={item.name.substring(0, 35)} imgUrl={item.album.images[0].url} />)

                        })}
                    </div>
                </div>
                <div>
                 <div className='title'>Top Arjit Songs </div>
                    <div className="flex scroll">

                        {track3.tracks?.items.map((item ,index) => {
                            return (<Card key={index} itemData={item} name={item.name.substring(0, 35)} imgUrl={item.album.images[0].url} />)

                        })}
                    </div>
                </div>
    
    
   

    
    </>
  );
}

export default HomeDisplay;
