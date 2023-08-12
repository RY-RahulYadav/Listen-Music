import { useLocation, useParams } from "react-router-dom";
import Header from "./child_components/header";
import { useEffect, useState } from "react";
import { token, brow } from "./child_components/all";
import TrackBody from "./child_components/TrackInfo";
import TrackPlayBox from "./child_components/TrackPlayBox";
import AblumCard from "./child_components/albumCard";
import '../styles/track.css'
import '../styles/main.css'
import '../styles/artist.css'
import Footer from "./child_components/footer";
import arr from '../../public/color_array.js'
// console.log(arr)
import Card from "./child_components/card";

export default function Artists(props) {

    const [relatedArtist, setrelatedArtist] = useState();
    const [relatedAlbum, setrelatedAlbum] = useState();
    const [colorNo, setNo] = useState();
    const { Id } = useParams();
    const items = useLocation();
    const { ArtistsTrackdata, ArtistsData } = items.state;




    useEffect(() => {
        window.scrollTo({top:0,behavior:"auto"})

        const fetchData = async () => {
            const data = await brow('  https://api.spotify.com/v1/artists/' + Id + '/albums')
            setrelatedAlbum(data)
        }
        fetchData()
        const color_no = Math.floor(Math.random() * 6);
        setNo(color_no)
    }, [])


    // console.log(Id);
    // console.log(relatedArtist)
    // console.log(relatedAlbum);
    // console.log(items.state)
    // console.log(ArtistsData)
    // console.log(ArtistsTrackdata)




    return (
        <div className="trackBig" style={arr[colorNo]} >
            <Header />

            <div className="flex  " >
                <div className="add">
                    <TrackBody item={ArtistsTrackdata.tracks} playFunc={props?.play} data={ArtistsTrackdata.tracks[0]} Follow={ArtistsData?.followers.total} img={ArtistsData.images[0].url} type="artist" TrackName={ArtistsData.name} dataArr={ArtistsData.genres} /></div>



            </div>
            <hr className="trHr" />
            <div className="artistsMap">
                <div className="flex">
                    <div className="addArtistMap responsiveNav ">
                        <h3 className="" style={{ marginLeft: '3rem' }}>Top Related Album</h3>
                        <div className="sideContainerArtist albumItem">
                            {relatedAlbum?.items.map((item, index) => {
                                return (
                                    <AblumCard data={item} img={item.images[0].url} name={item.name} key={item.id} index={index + 1} />


                                )
                            })}
                        </div>
                    </div>
                    <div className="largescreenHide">
                        <div className='title '>Top Related Album<hr className="hr1 responsiveNav " /></div>
                        <div className="flex scroll">

                            {relatedAlbum?.items.map((item, index) => {
                                return (<Card key={index} itemData={item} name={item.name} imgUrl={item.images[0].url} />)

                            })}
                        </div>
                    </div>
                </div>
                <div >
                    <h3 className=" responsiveNav" style={{ marginLeft: '3rem' }}>Top Artist Tracks</h3>
                    {ArtistsTrackdata.tracks.map((item, index) => {if(index<10){ return (<TrackPlayBox key={item.id} item={ArtistsTrackdata.tracks} data={item} playFunc={props?.play} type="artist" img={item.album?.images[0].url} index={index} TrackName={item.name} dataArr={item.artists} length={ArtistsTrackdata.tracks.length} />)} })}
                </div> </div>
            {/* <h1  >TOP TRACKS</h1> */}





            <Footer />
        </div>



    )
}