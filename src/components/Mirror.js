import { gsap } from "gsap";
import React, { useEffect  } from 'react'



function Mirror({mirrorStyle,opacityHover}){

    useEffect(() => {
        gsap.set(".mirror", {xPercent: -50, yPercent: -50});
        var mirror = document.querySelector(".mirror");
        var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var mouse = { x: pos.x, y: pos.y };
        var speed = 0.1;
        var fpms = 60 / 1000;
  
        var xSet = gsap.quickSetter(mirror, "x", "px");
        var ySet = gsap.quickSetter(mirror, "y", "px");
        function position(e){
          mouse.x = e.x;
          mouse.y = e.y;  
        }
        window.addEventListener("mousemove",(e)=>position(e));
        gsap.ticker.add((time, deltaTime) => {
          var delta = deltaTime * fpms;
          var dt = 1.0 - Math.pow(1.0 - speed, delta); 
          pos.x += (mouse.x - pos.x) * dt;
          pos.y += (mouse.y - pos.y) * dt;
          xSet(pos.x);
          ySet(pos.y);
        });
        return ()=>{
          window.removeEventListener("mousemove",position)
      } 
      }, [])
  
    return(   
        <div className="mirror" style={mirrorStyle}  >
            <div  style={{opacity:opacityHover}} className="presentation__container__profil-picture"></div>                     
        </div>
    )
}

export default Mirror