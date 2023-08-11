import Header from "./child_components/header";
import react, { useState, createContext, useEffect } from "react"
import Card from "./child_components/card"
import { token, search, brow } from './child_components/all'
import AblumCard from "./child_components/albumCard";
import ArtistCard from "./child_components/artistCard";
import Foot from './child_components/footer'

export default function Music() {
    const [artists, setArtists] = useState({});
    const [album, setalbum] = useState({});
    const [track, settrack] = useState({});
    const [track2, settrack2] = useState({});
    const [track3, settrack3] = useState({});
    const [newRelease, setnewRelease] = useState({});

    useEffect(() => {
        const fetchDataBySerch = async (query, type, checker) => {

            const data = await search(query, type);
            if (checker === '1') {
                setArtists(data);
            }
            else if (checker === '2') {
                setalbum(data)
            }
            else if (checker === '3') {
                settrack(data);
            }
            else if (checker === '4') {
                settrack2(data);
            }
            else if (checker === '5') {
                settrack3(data);
            }
            



        }
        const fetchDataBynew = async (url, checker) => {
            const data = await brow(url);
            // console.log(data)
            if (checker === '6') {
                setnewRelease(data)
            }


        }


        fetchDataBySerch('arjit,jubil,sonu', 'artist', '1');
        fetchDataBySerch('jubil arjit ', 'album', '2')
        fetchDataBySerch('Top hindi song ', 'track', '3')
        fetchDataBySerch('Guru Randhawa Diljit Dosanjh ', 'track', '4')
        fetchDataBySerch('arjit song  ', 'track', '5')
        fetchDataBynew("https://api.spotify.com/v1/browse/new-releases?country=IN&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20", '6')


    }, []);
   


    return (<>

        <Header></Header>
        <div className="flex1">
            <div className="MusicContainer1 responsiveNav">
                <div className="artistsMap">
                    <div className="flex">
                        <div>
                            <h3 className="" style={{ marginLeft: '3rem' }}>Treading Album</h3>
                            <div className="sideContainerArtist albumItem">
                                {album.albums?.items.map((item, index) => {
                                    return (
                                        <AblumCard data={item} img={item.images[0]?.url} name={item.name} key={item.id} page={"music"} />


                                    )
                                })}
                            </div>
                        </div></div></div></div>

            <div className="MusicContainer2">

                <div>
                    <div className='title'>Hindi Songs </div>
                    <div className="flex scroll">

                        {track.tracks?.items.map((item) => {
                            return (<Card key ={item?.id}itemData={item} name={item.name.substring(0, 35)} imgUrl={item.album.images[0].url} />)

                        })}
                    </div>
                </div>
                <div>
                    <div className='title'> New Release</div>
                    <div className="flex scroll">

                        {newRelease.albums?.items.map((item) => {
                            return (<Card key={item?.id} itemData={item} name={item.name} imgUrl={item.images[0].url} />)

                        })}
                    </div>
                </div>

            </div>








        </div>
        <div className="MusicContainer3">
            <div className='title'> Top Artists  </div>
            <div className="flex scroll">

                {artists.artists?.items.map((item) => {
                    return (<Card key={item?.id} itemData={item} name={item.name} imgUrl={item.images[0]?.url} />)

                })}
            </div>
        </div>

        <div>
                 <div className='title'>Top Punjabi Songs </div>
                    <div className="flex scroll">

                        {track2.tracks?.items.map((item) => {
                            return (<Card  key={item?.id}itemData={item} name={item.name.substring(0, 35)} imgUrl={item.album.images[0].url} />)

                        })}
                    </div>
                </div>
                <div>
                 <div className='title'>Top Arjit Songs </div>
                    <div className="flex scroll">

                        {track3.tracks?.items.map((item) => {
                            return (<Card key={item?.id} itemData={item} name={item.name.substring(0, 35)} imgUrl={item.album.images[0].url} />)

                        })}
                    </div>
                </div>

        <Foot />
    </>
    );
}