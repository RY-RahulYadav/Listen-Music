import react from 'react'
import Card from './card'

export default function (props){
    const artist= props.artistPass;
    const album= props.albumPass;
    const track= props.trackPass;
    const playlist= props.playlistPass;
    // console.log(track.tracks?.items)
   return(
    <> 
  {(track.tracks?.items) != "" && <div> <div className='title'>Hindi Songs <hr /></div>
      <div className="flex scroll">

        {track.tracks?.items.map((item) => {
          return (item.album.images &&  <Card itemData={item}  name ={item.name.substring(0 , 35)} imgUrl={item?.album?.images[0]?.url}/>)

        })}
      </div>
    </div>}
   {(album.albums?.items)!="" && <div>
      <div className='title'> Treading Album<hr /></div>
      <div className="flex scroll">

        {album.albums?.items.map((item) => {
          return ( item.images && <Card itemData={item}  name ={item.name.substring(0 , 35)} imgUrl={item?.images[0]?.url}/>)

        })}
      </div>
    </div>}
    { playlist.playlists?.items != '' &&<div>
      <div className='title'>Top Playlists<hr /></div>
      <div className="flex scroll">

        {playlist.playlists?.items.map((item) => {
          return (item.images && <Card itemData={item}  name ={item.name.substring(0 , 35)} imgUrl={item?.images[0]?.url}/>)

        })}
      </div>
    </div>}
    {artist.artists?.items!="" &&<div>
      <div className='title'> top Artists <hr /></div>
      <div className="flex scroll">

        {artist.artists?.items.map((item) => {
          return (item.images[0] && <Card itemData={item}  name ={item.name.substring(0 , 35)} imgUrl={item?.images[0]?.url}/>)

        })}
      </div>
    </div>}
    </>
   )
}