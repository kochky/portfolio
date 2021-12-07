import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import  "./css/style.css"

function App() {
    const [mousePositionX,setMousePositionX]=useState(0)
    const [mousePositionY,setMousePositionY]=useState(0)
    const [opacityHover,setOpacityHover]=useState(0)
    const [cursor,setCursor]=useState(true)
   
    const ref=useRef(null)

    useEffect(() => {
      // gsap.set(".mirror", {xPercent: -50, yPercent: -50});
      // gsap.set(".cont", {xPercent: -50, yPercent: -50});
      var cont = document.querySelector(".cont");
      var mirror = document.querySelector(".mirror");
      var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      var mouse = { x: pos.x, y: pos.y };
      var speed = 0.1;

      var fpms = 60 / 1000;

      var xPres= gsap.quickSetter(cont, "x", "px");
      var yPres= gsap.quickSetter(cont, "y", "px");
      var xSet = gsap.quickSetter(mirror, "x", "px");
      var ySet = gsap.quickSetter(mirror, "y", "px");

      window.addEventListener("mousemove", e => {    
        mouse.x = e.x;
        mouse.y = e.y;  
        setMousePositionX(e.clientX)
        setMousePositionY(e.clientY)

      });
      window.addEventListener("wheel", e => {    
        mouse.x = e.x;
        mouse.y = e.y;  
        console.log(e.clientX)
      });


      gsap.ticker.add((time, deltaTime) => {
        
        var delta = deltaTime * fpms;
        var dt = 1.0 - Math.pow(1.0 - speed, delta); 
        
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x-25+(opacityHover*100));
        ySet(pos.y-25+(opacityHover*100));
        xPres(-pos.x+25-(opacityHover*100))
        yPres(-pos.y- window.scrollY+25-(opacityHover*100))
      });

        setTimeout(()=>{setCursor(true)},4000);
    }, [])

    useLayoutEffect(()=>{
   
      if(cursor){

          gsap.registerPlugin(ScrollTrigger)
        
          gsap.to(".developpeur",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:-1440,
          });
          
          gsap.to(".front-end",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:1440,
          });
          
          gsap.to(".developpeur2",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:-1440,
          })
          
          gsap.to(".front-end2",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:1440,
          })

          gsap.fromTo(".name",
          {y:'-20vh'},
          {y:0},)

    
          gsap.fromTo(".developpeur",
            {x:'20vw'},
            {x:0},
          )
          
          gsap.fromTo(".front-end",
          {x:'-20vw'},
          {x:0},
        )
      }
    },[cursor])


  return (

    !cursor? <div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>:(
    
    <main  >
      <div  className="homepage" >
       <div className="mirror" ref={ref}> 
          <div className="mirror__presentation cont" >
            <div className="mirror__presentation__container" >
              <span className="mirror__presentation__container__underline" >
                Christopher<br/>
                 Koch
              </span>
              <span className="mirror__presentation__container__text developpeur2" > développeur <br/></span><span className="mirror__presentation__container__text__span front-end2 font-monoton">front-end.</span>
            </div>
          </div>
        </div>

        <section className="presentation">
          <div className="presentation__container opacityQuick">
            <span className={"presentation__container__underline name "} onMouseOut={()=>setOpacityHover(0)} onMouseMove={()=>setOpacityHover(1)}>
              Christopher<br/>
              Koch</span>
            <div  style={{opacity:opacityHover,transform:"translate("+(mousePositionX-125)+"px,"+(mousePositionY+150)+"px)"}} className="presentation__container__profil-picture"></div>                     
            <span  className={"presentation__container__text  developpeur"}> développeur <br/></span>
            <span className="presentation__container__text__span font-monoton front-end ">front-end.</span> 
          </div>
        </section>
      </div>
      <section  className="description" >
          <h1>Who am I ?</h1>
      </section>
      
      <section className="projet">
          <h1 >Mes projets</h1>
      </section>

      <section className="parcours">
          <div className="parcours__blocHorizontal">
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__one"><h1>mon parcours</h1></div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__two">tes</div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__three">test</div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__four">test</div>
          </div>
      </section>
    </main>
  ))
}

export default App;
