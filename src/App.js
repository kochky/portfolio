import React, { useState, useEffect, useRef } from 'react'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

import  "./css/style.css"

function App() {
    const [mousePositionX,setMousePositionX]=useState(0)
    const [mousePositionY,setMousePositionY]=useState(0)
    const [opacityHover,setOpacityHover]=useState(0)
    const [cursor,setCursor]=useState(false)

    function onHover(e) {
      const xMousePos = e.clientX + window.pageXOffset;
      const yMousePos = e.clientY + window.pageYOffset;
      setMousePositionY(yMousePos)
      setMousePositionX(xMousePos)
    }
    
    useEffect(() => {
        setTimeout(()=>{setCursor(true)},4500);

    }, [])
   
   

   

  return (

    !cursor? <div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>:(
    
      <main>

      <div  className="homepage"  onMouseMove={(e)=>onHover(e)}>
       
          <div className="mirror" style={{transform:"translate("+(mousePositionX+10)+"px,"+(mousePositionY)+"px)"}} > 
            <div className="mirror__presentation" style={{transform:"translate("+-(mousePositionX+10)+"px,"+-(mousePositionY)+"px)"}}>
              <div className="mirror__presentation__container" >
                <span className="mirror__presentation__container__underline" >Christopher<br/> Koch</span>
                <span className="mirror__presentation__container__text"> développeur <br/></span><span className="mirror__presentation__container__text__span font-monoton">front-end.</span>
              </div>
            </div>
          </div>
        
        
        <section className="presentation">
          <div className="presentation__container opacityQuick">
         
            <span className={"presentation__container__underline translateY"} onMouseOut={()=>setOpacityHover(0)} onMouseMove={()=>setOpacityHover(1)}>Christopher<br/> Koch</span>
         
            {cursor &&<div style={{transform:"translate(200px, 20px)"}}  style={{opacity:opacityHover,transform:"translate("+mousePositionX+"px,"+(mousePositionY+50)+"px)"}} className="presentation__container__profil-picture"></div>}
            
            
            <span style={{animationDelay:"300ms"}} className={"presentation__container__text translateY"}> développeur <br/></span>
            <span className="presentation__container__text__span scaleX font-monoton">front-end.</span> 
          </div>
        </section>
       
        </div>



      <section   className="description" >
          <h1>Who am I ?</h1>
      </section>


      <section className="projet">
          <h1>Mes projets</h1>
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
