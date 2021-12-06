import React, { useState, useEffect, useRef } from 'react'
import reactDom from 'react-dom';




function Presentation() {
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
   setTimeout(()=>{setCursor(true)},4500)
   console.log(name.current.offsetTop)
 }, [])

const name= useRef()

    return (
      <div className="homepage"  onMouseMove={(e)=>onHover(e)}>
        { cursor && <div className="mirror" style={{transform:"translate("+(mousePositionX+10)+"px,"+(mousePositionY)+"px)"}} > 
          <div className="mirror__presentation" style={{transform:"translate("+-(mousePositionX+10)+"px,"+-(mousePositionY)+"px)"}}>
            <div className="mirror__presentation__container" >
              <span className="mirror__presentation__container__underline" >Christopher<br/> Koch</span>
              <span className="mirror__presentation__container__text"> développeur <br/></span><span className="mirror__presentation__container__text__span font-monoton">front-end.</span>
            </div>
          </div>
        </div>} 
        <section className="presentation">
          {!cursor&& <React.Fragment><span className="presentation__hello">Hello<span className="presentation__hello__effect"><span className="presentation__hello__effect__opacity">|</span></span></span><br/></React.Fragment>}
          <div className="presentation__container">
            <span ref={name} className="presentation__container__underline" onMouseOut={()=>setOpacityHover(0)} onMouseMove={()=>setOpacityHover(1)}>Christopher<br/> Koch</span>
            {cursor &&<div style={{transform:"translate(200px, 20px)"}}  style={{opacity:opacityHover,transform:"translate("+mousePositionX+"px,"+(mousePositionY+50)+"px)"}} className="presentation__container__profil-picture"></div>}
            <span className="presentation__container__text"> développeur <br/></span><span className="presentation__container__text__span font-monoton">front-end.</span> 
          </div>
        </section>
        </div>)
}

export default Presentation