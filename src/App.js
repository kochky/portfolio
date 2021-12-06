import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import  "./css/style.css"

function App() {
    const [mousePositionX,setMousePositionX]=useState(0)
    const [mousePositionY,setMousePositionY]=useState(0)
    const [opacityHover,setOpacityHover]=useState(0)
    const [cursor,setCursor]=useState(false)
    
   

    const onHover= (e)=> {
      setTimeout(()=>{
        setMousePositionY(e.clientY + window.pageYOffset)
        setMousePositionX( e.clientX + window.pageXOffset)
      },0)
    }
  
    useEffect(() => {
        setTimeout(()=>{setCursor(true)},4000);
    }, [])

    gsap.registerPlugin(ScrollTrigger)
    
    useLayoutEffect(() => {
      if(cursor){

          gsap.to(".homepage",{
            scrollTrigger:{
              trigger:".homepage",
              pin:true,
              start:"top top",
              endTrigger:".description",
              end:"top 75%",
              markers:true,
              scrubs:true

            },
           
          })

          gsap.to(".developpeur",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:-1440,
          })
          

          gsap.to(".front-end",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"play none reverse reverse",
              scrub:true,
            },
            x:1440,
          });
          
          
        
          gsap.to(".developpeur2",{
            scrollTrigger:{
              trigger:".developpeur2",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:true,
            },
            x:-1440,
          })
          

          gsap.to(".front-end2",{
            scrollTrigger:{
              trigger:".developpeur2",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"play none reverse reverse",
              scrub:true,
            },
            x:1440,
          })
        }
    },[cursor])


  return (

    !cursor? <div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>:(
    
    <main  >
      <div  className="homepage" onWheel={(e)=>onHover(e)} onMouseMove={(e)=>onHover(e)}>
       
        <div className="mirror" style={{transform:"translate("+(mousePositionX+20)+"px,"+(mousePositionY+20)+"px)"}} > 
          <div className="mirror__presentation" style={{transform:"translate("+-(mousePositionX+20)+"px,"+-(mousePositionY+20)+"px)"}}>
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
            <span className={"presentation__container__underline "} onMouseOut={()=>setOpacityHover(0)} onMouseMove={()=>setOpacityHover(1)}>
              Christopher<br/>
              Koch</span>
            <div   style={{opacity:opacityHover,transform:"translate("+(mousePositionX-125)+"px,"+(mousePositionY+150)+"px)"}} className="presentation__container__profil-picture"></div>                     
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
