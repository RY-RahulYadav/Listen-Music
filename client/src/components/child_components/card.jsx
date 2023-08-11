

import React, { useEffect, useState } from "react";
import { token, brow } from './all'
import { useNavigate } from "react-router-dom";
const token_id = await token();

function card(props) {


  const navigate = useNavigate();

  async function handleclick(event) {
   


    if (props.itemData.type === 'track') {
      const path = '/track/' + props.itemData.id;
      navigate(path, { state: { item: props.itemData } });

    }
    else if (props.itemData.type === 'album') {

      const data = await brow("https://api.spotify.com/v1/albums/" + props.itemData.id + '/tracks');
      // console.log(data)
      const path = '/album'+ '/' + props.itemData.id;
      navigate(path, { state: { trackitem: data , albumData:props.itemData } });
    }
    else if (props.itemData.type === 'artist') {

      const data = await brow("https://api.spotify.com/v1/artists/" + props.itemData.id + '/top-tracks?market=IN');
      // console.log(data)
      const path = '/artists/'+ props.itemData.id;
      navigate(path, { state: { ArtistsTrackdata: data , ArtistsData:props.itemData } });
    }
  }



  return (

    <div className="cardcontainer" style={{cursor:"pointer"}}>
      <div onClick={handleclick} className=" artistImg" value={props.itemData.id} >
        <img src={props.imgUrl} className="card-img-top " alt="..." />
        <div className="card-body" >
          <p className="card-text cardText" >{props.name} </p>
        </div>
      </div>
    </div>)
}
export default card;




