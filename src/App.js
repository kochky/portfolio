import React, { useState, useEffect, useLayoutEffect } from 'react'
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
      setTimeout(()=>{setCursor(true)},4000);
      return ()=>{
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
              scrub:1,
            },
            x:"-150vw",
          });
          
          gsap.to(".front-end",{
            scrollTrigger:{
              trigger:".developpeur",
              start:"top 50%",
              end:"top 30%",
              toggleActions:"restart none reverse reverse",
              scrub:0.5,
            },
            x:"150vw",
          });
          
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
        
        let sections=gsap.utils.toArray("snapDiv");
        let articles=gsap.utils.toArray("article");

        const bigTl=gsap.timeline();
            bigTl
            .from(".presentation", {
              scrollTrigger:{
                trigger:'.presentation',
                start:"top top",
                end:"80%",
                scrub:true,
                pin:true,
                anticipatePin:1, 
              }
            })
            .to(sections,{
              ease:"none",
              scrollTrigger:{
                trigger:"presentation",
                scrub:1,
                snap:1,
                end:()=>"+="+document.querySelector(".description").offsetHeight
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
              end:"top 50%",
              toggleActions:"restart none reverse reverse",
              scrub:2,
              duration:1
            }})

            .to(articles,{
              xPercent:-100,
              ease:"none",
              scrollTrigger:{
                trigger:".vertical-container",
                pin:true,
                scrub:1,
                snap:1/12,
                end:()=>"+="+document.querySelector(".vertical-container").offsetWidth,
              }
            })
          
           gsap.from(".description__picture",{yPercent:100,
          scrollTrigger:{
            trigger:".description__title",
            scrub:1,
            end:"top 40%",
           }})
          gsap.to(".description__picture",{x:"0vw",
            scrollTrigger:{
              trigger:".projet",
              start:"1% top" ,
              end:"1% top",
              scrub:2,
            }})


          const pointTl=gsap.timeline({scrollTrigger:{
            trigger:".description",
          }});
          pointTl.fromTo(".first-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,delay:0.1,duration:0.6,
          })
          .fromTo(".second-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
          })
          .fromTo(".third-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
          })
 
          const textTl=gsap.timeline({scrollTrigger:{
            trigger:".description__div",
            start:"bottom bottom",
            end:"bottom 90%",
            toggleActions:"restart none reverse reverse",
            //scrub:true,
          }});
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

        gsap.to(".projet__title",{x:"400vw",ease:"none",
        scrollTrigger:{
          trigger:".projet__title",
          start:"top+=40% top",
          toggleActions:"restart none reverse reverse",
          endTrigger:".projet",
          end:"bottom+=1700 bottom",
          scrub:1,
       
        }})
      }
    },[cursor])

   
  return (

    !cursor? <div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>:(
    
    <main>
       <div  className="homepage" >
        <div className="mirror" style={mirrorStyle}  >
          <div  style={{opacity:opacityHover}} className="presentation__container__profil-picture"></div>                     
        </div>

        <section  className="presentation snapDiv">
          <div className="presentation__container opacityQuick">
            <span className={"presentation__container__underline name "}  onMouseOut={()=>{setOpacityHover(0);setMirrorStyle({width:"50px",height:'50px'})}} onMouseEnter={()=>{setOpacityHover(1);setMirrorStyle({width:"500px",height:'500px'})}}>
              Christopher<br/>
              Koch</span>
            <span  className={"presentation__container__text  developpeur"}> développeur <br/></span>
            <span className="presentation__container__text__span front-end ">front-end<span>.</span></span> 
            <div className="presentation__container__marquee"><div className="presentation__container__marquee__inner"><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span></div></div>
          </div>
        </section>
      </div>

      <section className='vertical-container snapDiv'>
        <article className="description " >
            <h1 className="description__title font-bebas">About me <span className="first-point-exclamation">.</span><span className="second-point-exclamation">.</span><span className="third-point-exclamation">.</span></h1>
            <div className="description__picture" ></div>
            <div className="description__div "> 
            <div className="description__div__line"></div>
              <p>J'ai 33 ans et j'habite Marseille ! </p>
              <p className='description__div__second'>Directeur dans la grande distribution, je me suis lancé dans le développement front-end par passion.</p>
              <p className='description__div__third'>J'ai récemment suivi et fini ma formation de développeur d'application Javascript React auprès de Openclassrooms.</p> 
              {/* <p className='description__div__fourth' >Cette formation m'a permis de pratiquer à travers différents projets que tu peux consulter dans mon portfolio. </p>
              <p className='description__div__fifth'>Je continue à monter en compétences avec des projets persos.</p>
              <p className='description__div__sixth'>En ce moment, j'apprends React Native, Next.js, et typescript. </p> */}
            </div>
        </article>
        
        <article className="projet" >
            <h1 className="projet__title">Mes projets</h1>
            <div className="projet__container">
            {ProjectsGH.map(projet=><Card  key={projet.id} picture={projet.picture} title={projet.title} description={projet.description} buttons={projet.buttons} tools={projet.tools}/>).reverse()}
            </div>
        </article>
      </section>

      <div className="parcours">
        tt
      </div>
      <div className="contact">
        tt
      </div>
      
    </main>
  ))
}

export default App;
