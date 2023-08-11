


import React, {  useEffect } from 'react';

const slide = () => {
 useEffect(()=>{
  const element= document.getElementById('nextImgbtn');
  element.click();
 },[])

  

  return (
    <div className='secondContainer flex'>
    <div className="mycontainer3">
      <div className="mycontainer3">
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/slideImg/slide1.webp" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide2.webp" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide3.webp" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide4.webp" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide5.webp" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide6.jpg" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide7.jpg" className="d-block myimgtag2" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/slideImg/slide8.webp" className="d-block myimgtag2" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span id ='nextImgbtn' className="visually-hidden ">Next</span>
  </button>
</div> </div>
</div></div>
  
  );
};





export default slide;
