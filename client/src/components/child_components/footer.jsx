import { Link } from "react-router-dom"

export default function   Foot(){
    function Notavl(e){
e.preventDefault();
        alert("this page is not available ");
    }
    return (
        <div className="footerContainer">
             <div  style={{width:"70rem"}}>
         
                <p ><a onClick={Notavl} style={{cursor:'pointer'}} > ABOUT US</a>  <span className="responsiveNav"> &nbsp; | &nbsp;</span>  &nbsp; <a onClick={Notavl} className="responsiveNav" style={{cursor:'pointer'}} >PRIVACY POLICY</a> <span className="responsiveNav"> &nbsp; |  &nbsp;</span>  <a onClick={Notavl} className="responsiveNav" href="">TERMS OF USE </a>&nbsp; |  &nbsp; <a onClick={Notavl} href="">CONTACT US</a>  </p> </div>
                <div>
                <div className="largescreenHide">
                 <span  style={{color: "#ffffff" ,fontSize:'2rem' , marginRight:'2rem'}}> copyright </span><i className ="fa-regular fa-copyright " style={{color: "#ffffff" ,fontSize:'3rem' , marginRight:'4rem'}}></i>
                 </div><a onClick={Notavl} className="responsiveNav" href=""><img src="/social/fb.webp" alt="" /></a>   
                 <a onClick={Notavl} className="responsiveNav" href=""><img src="/social/insta.webp" alt="" /></a>   
                 <a onClick={Notavl} className="responsiveNav" href=""><img src="/social/twiiter.webp" alt="" /></a>   
                 <a onClick={Notavl} className="responsiveNav" href=""><img src="/social/message.png" alt="" /></a>   
                </div>
            
        </div>
    )


}