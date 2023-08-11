import react  , {useState,createContext, useEffect} from "react"
import Header from './child_components/header'
import Left from './child_components/leftside'
import Slide from './child_components/slide'
import HomeDisplay from './child_components/home_display'
import Foot from './child_components/footer'
import Player from './child_components/player'
import { Outlet } from "react-router-dom"



function Home() {
  
    return (
          
            <div className="home hello" >
                <Header />
                
                <div className="secondContainer">
                    <Left />
                    <Slide />

                </div>
                
                <HomeDisplay/>
            
               
                <Foot/>
          
               
                
                </div>
                );

}

export default Home ;
