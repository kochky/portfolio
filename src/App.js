import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin";
import ProjectsGH from './data/ProjectsGH';
import Card from './components/Card';
import  "./css/style.css"


function App() {
   
    const [opacityHover,setOpacityHover]=useState(0)
    const [cursor,setCursor]=useState(true)
    const [mirrorStyle,setMirrorStyle]=useState({width:"50px",height:"50px"})
    const [data,setData]=useState()
   
    const ref=useRef(null)

    useEffect(() => {
      var cont = document.querySelector(".cont");
      var mirror = document.querySelector(".mirror");
      var picture = document.querySelector(".presentation__container__profil-picture");
      var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      var mouse = { x: pos.x, y: pos.y };
      var speed = 0.5;
      var fpms = 60 / 1000;

      var xPres= gsap.quickSetter(cont, "x", "px");
      var yPres= gsap.quickSetter(cont, "y", "px");
      var xSet = gsap.quickSetter(mirror, "x", "px");
      var ySet = gsap.quickSetter(mirror, "y", "px");
      var picturexSet = gsap.quickSetter(picture, "x", "px");
      var pictureySet = gsap.quickSetter(picture, "y", "px");
      function position(e){
        mouse.x = e.x;
        mouse.y = e.y;  
      }
      window.addEventListener("mousemove",(e)=>position(e));
      window.addEventListener("wheel",(e)=>position(e));

      gsap.ticker.add((time, deltaTime) => {
        
        var delta = deltaTime * fpms;
        var dt = 1.0 - Math.pow(1.0 - speed, delta); 
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x+20);
        ySet(pos.y+20);
        xPres(-pos.x-20)
        yPres(-pos.y-20+ref.current.getBoundingClientRect().top)
        picturexSet(pos.x+20)
        pictureySet(pos.y+20-ref.current.getBoundingClientRect().top)
      });
      setTimeout(()=>{setCursor(true)},4000);
      return ()=>{
        window.removeEventListener("wheel",position)
        window.removeEventListener("mousemove",position)

    }
    
    }, [])

    useLayoutEffect(()=>{
   
      if(cursor){

          gsap.registerPlugin(ScrollTrigger)
          gsap.registerPlugin(TextPlugin);
        
          gsap.to(".developpeur",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:2,
            },
            x:"-100vw",
          });
          
          gsap.to(".front-end",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:0.5,
            },
            x:"100vw",
          });
          
          gsap.to(".developpeur2",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:2,
            },
            x:"-100vw",
          })
          
          gsap.to(".front-end2",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:0.5,
            },
            x:"100vw",
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
        
        const desTl=gsap.timeline();
        desTl.from(".description", {yPercent:0});
        ScrollTrigger.create({
          animation:desTl,
          trigger:'.presentation',
          start:"top top",
          end:"80%",
          scrub:true,
          pin:true,
          anticipatePin:1,       
        })


        const bigTl=gsap.timeline()

        const textTl=gsap.timeline({scrollTrigger:{
          trigger:".description__div",
          start:"bottom bottom",
          end:"bottom bottom",
          toggleActions:"restart none reverse reverse",
          scrub:2,

        }});
            let sections=gsap.utils.toArray("section");
            let test=gsap.utils.toArray("article");
       
            bigTl
            .to(sections,{
              ease:"none",
              scrollTrigger:{
                trigger:"main",
                scrub:1,
                snap:1,
                end:()=>"+="+document.querySelector("main").offsetHeight
              }
            })
            .from(".description__title",{rotate:'-50',x:"-100vw", scrollTrigger:{
              trigger:".description",
              start:"top bottom",
              endTrigger:".description",
              end:"top top",
              toggleActions:"restart none reverse reverse",
              scrub:3,
              }})
            
            .from(".description__div",{x:"100vw", scrollTrigger:{
              trigger:".description__title",
              start:"top 50%",
              //endTrigger:".description",
              end:"top 50%",
              toggleActions:"restart none reverse reverse",
              scrub:2,
              duration:1

            }})

            .to(test,{
              xPercent:-100*(test.length-1),
              ease:"none",

              scrollTrigger:{
                trigger:".vertical-container",
                pin:true,
                scrub:1,
               snap:1,
                end:()=>"+="+document.querySelector(".vertical-container").offsetWidth
              }
            })
           
          textTl .from(".description__div__second",{opacity:0,ease:"none",
      
          })
            .from(".description__div__third",{opacity:0, ease:"none",
    
          })
            .from(".description__div__fourth",{opacity:0,  ease:"none"
       
          })
            .from(".description__div__fifth",{opacity:0,  ease:"none"
      
          })
            .from(".description__div__sixth",{opacity:0, ease:"none"
         
          })
          
           

    

            // .to(".description__div__second", {duration: 2,
            //    text:"Anciennement directeur dans la grande distribution, je me suis lancé dans le développement front-end par passion.", ease: "none"})
            // .to(".description__div__third", {duration: 3, 
            //   text: "J'ai récemment fini ma formation de développeur d'application Javascript React auprès de Openclassrooms. Cette formation m'a permis de pratiquer à travers différents projets que tu peux consulter dans mon portfolio.", ease: "none"})
            // .to(".description__div__fourth", {duration: 1,
            //    text: "Je continue à monter en compétences avec des projets persos.", ease: "none"})
            // .to(".description__div__fifth", {duration: 1, 
            //   text: "En ce moment, j'apprends React Native, Next.js, et typescript.", ease: "none"})

          


            
       
      
      }

    },[cursor])

  return (

    !cursor? <div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>:(
    
    <main>
       <div  className="homepage" >
       <div className="mirror"style={mirrorStyle}> 
          <div className="mirror__presentation cont" >
            <div className="mirror__presentation__container" >
              <span className="mirror__presentation__container__underline ">
                Christopher<br/>
                 Koch
              </span>
              <span className="mirror__presentation__container__underline invert" onMouseOut={()=>{setOpacityHover(0);setMirrorStyle({width:"50px",height:'50px'})}} onMouseMove={()=>{setOpacityHover(1);setMirrorStyle({width:"500px",height:'500px'})}}>
                Christopher<br/>
                 Koch
              </span>
              <div  style={{opacity:opacityHover}} className="presentation__container__profil-picture"></div>                     
              <span className="mirror__presentation__container__text developpeur2" > développeur <br/></span><span className="mirror__presentation__container__text__span front-end2 ">front-end.</span>
            </div>
          </div>
        </div>

        <section ref={ref} className="presentation">
          <div className="presentation__container opacityQuick">
            <span className={"presentation__container__underline name "}  onMouseOut={()=>{setOpacityHover(0);setMirrorStyle({width:"50px",height:'50px'})}} onMouseMove={()=>{setOpacityHover(1);setMirrorStyle({width:"500px",height:'500px'})}}>
              Christopher<br/>
              Koch</span>
            <span  className={"presentation__container__text  developpeur"}> développeur <br/></span>
            <span className="presentation__container__text__span front-end ">front-end.</span> 
          </div>
        </section>
      </div>

      <section className='vertical-container'>
        <article className="description " >
            <h1 className="description__title">Who am I ???</h1>
            <div className="description__div"> 
              <p>J'ai 33 ans, j'habite Marseille ! </p>
              <p className='description__div__second'>Anciennement directeur dans la grande distribution, je me suis lancé dans le développement front-end par passion.</p>
              <p className='description__div__third'>J'ai récemment fini ma formation de développeur d'application Javascript React auprès de Openclassrooms.</p> 
              <p className='description__div__fourth' >Cette formation m'a permis de pratiquer à travers différents projets que tu peux consulter dans mon portfolio. </p>
              <p className='description__div__fifth'>Je continue à monter en compétences avec des projets persos.</p>
              <p className='description__div__sixth'>En ce moment, j'apprends React Native, Next.js, et typescript. </p>
            </div>
        </article>
        
        <article className="projet" >
            <h1 className="projet__title">Mes projets</h1>
            <div className="projet__container">
            {ProjectsGH.map(projet=><Card setData={setData} key={projet.id} title={projet.title} description={projet.description} buttons={projet.buttons} tools={projet.tools}/>)}
            </div>
        </article>
      </section>
 
       {/* <section className="parcours">
          <div className="parcours__blocHorizontal">
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__one"><h1>mon parcours</h1></div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__two">tes</div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__three">test</div>
              <div className="parcours__blocHorizontal__slide parcours__blocHorizontal__slide__four">test</div>
          </div>
      </section>  */}
    </main>
  ))
}

export default App;
