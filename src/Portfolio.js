import React, { useState, useEffect, useLayoutEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin";
import ProjectsGH from './data/ProjectsGH';
import Card from './components/Card';
import Mirror from './components/Mirror';


function Portfolio() {
   
    const [opacityHover,setOpacityHover]=useState(0)
    const [mirrorStyle,setMirrorStyle]=useState({width:"50px",height:"50px"})
    const [styleBlack,setStyleBlack]=useState({borderColor:"black",color:"black",backgroundColor:"white"})

    
    useEffect(()=>{
   
          gsap.registerPlugin(ScrollTrigger)
          gsap.registerPlugin(TextPlugin);
        
          //animation faisant fuir "developpeur" et "front end" en scrollant
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

          //animation en arrivant sur la page présentation
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
        
        //permet le pin le snap des sections
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
                snap:1/3,
                //end:".description"
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
                //end:".vertical-container"
              }
            })
          
            //faire apparaitre l'image QRcode en quittant la page
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

          //anime les ... de about me
          const pointTl=gsap.timeline({scrollTrigger:{
            trigger:".description",
          }});
          pointTl.fromTo(".first-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,delay:0.1,duration:0.6,
          })
          .fromTo(".second-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
          })
          .fromTo(".third-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
          })
 
          //fait apparaitre le texte au fur et à mesure
          const textTl=gsap.timeline({scrollTrigger:{
            trigger:".description__div",
            start:"bottom bottom",
            end:"bottom 95%",
            toggleActions:"restart none reverse reverse",
          }});
          textTl .from(".description__div__second",{opacity:0,ease:"none",
          })
            .from(".description__div__third",{opacity:0, ease:"none",   
          });
         
          //Anime le cadre autour de .description
          gsap.fromTo(".sright",{xPercent:-100},{xPercent:100,ease:"power1.inOut",repeat:-1,duration:8})
          gsap.fromTo(".sdown",{yPercent:-100},{yPercent:100,ease:"power1.inOut",repeat:-1,duration:8,delay:4})
          gsap.fromTo(".sleft",{xPercent:100},{xPercent:-100,ease:"power1.inOut",repeat:-1,duration:8,delay:8})
          gsap.fromTo(".sup",{yPercent:100},{yPercent:-100,ease:"power1.inOut",repeat:-1,duration:8,delay:12});

   

        //inverse les couleurs quand .parcours est visible
          ScrollTrigger.create({
            trigger:".parcours",
            start:"top 95%",
            onEnter:()=>setStyleBlack({borderColor:"white",color:"white",backgroundColor:"black"}),
            onLeave:()=>setStyleBlack({borderColor:"black",color:"black",backgroundColor:"white"}),
            onEnterBack:()=>setStyleBlack({borderColor:"white",color:"white",backgroundColor:"black"}),
            onLeaveBack:()=>setStyleBlack({borderColor:"black",color:"black",backgroundColor:"white"})

          })
      
    },[])

   
  return (

    
    <main>
       <div  className="homepage" >
        <Mirror opacityHover={opacityHover} mirrorStyle={mirrorStyle} />
     
        <div className="marquee"><div className="marquee__inner"><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span></div></div>

        <section  className="presentation snapDiv">
          <div className="presentation__container opacityQuick">
            <span className={"presentation__container__underline name "}  onMouseOut={()=>{setOpacityHover(0);setMirrorStyle({width:"50px",height:'50px'})}} onMouseEnter={()=>{setOpacityHover(1);setMirrorStyle({width:"500px",height:'500px'})}}>
              Christopher<br/>
              Koch</span>
            <span  className={"presentation__container__text  developpeur"}> développeur <br/></span>
            <span className="presentation__container__text__span front-end ">front-end<span>.</span></span> 
          </div>
        </section>
      </div>

      <section className='vertical-container snapDiv'>
        <article className="description " >
        <div className="description__div__line top"><div className="description__div__line__ball sright"></div></div>
        <div className="description__div__line bottom"><div className="description__div__line__ball sleft"></div></div>
        <div className="description__div__line left"><div className="description__div__line__ball sup"></div></div>
        <div className="description__div__line right"><div className="description__div__line__ball sdown"></div></div>

            <h1 className="description__title font-bebas">About me <span className="first-point-exclamation">.</span><span className="second-point-exclamation">.</span><span className="third-point-exclamation">.</span></h1>
            <div className="description__picture" ></div>
            <div className="description__div "> 
              <p>J'ai 33 ans et j'habite Marseille ! </p>
              <p className='description__div__second'>Directeur dans la grande distribution, je me suis lancé dans le développement front-end par passion.</p>
              <p className='description__div__third'>J'ai récemment suivi et fini ma formation de développeur d'application Javascript React auprès de Openclassrooms.</p> 
            </div>
        </article>
        
        <article className="projet" style={styleBlack} >
            <h1 className="projet__title">Mes projets</h1>
            <div className="projet__container">
              {ProjectsGH.map(projet=><Card  key={projet.id} styleBlack={styleBlack} picture={projet.picture} title={projet.title} description={projet.description} buttons={projet.buttons} tools={projet.tools}/>).reverse()}
            </div>
  
        </article>
      </section>

      <section className="parcours" style={styleBlack}>
        <div className="parcours__text">
          <p className='parcours__text__first' >Cette formation m'a permis de pratiquer à travers différents projets. </p>
          <p className='parcours__text__second'>Je continue à monter en compétences avec des projets persos.</p>
          <p className='parcours__text__third'>En ce moment, j'apprends React Native, Next.js, et typescript. </p>
        </div>
      </section>
      <section className="contact">
        tt
      </section>
      
    </main>
  )
}

export default Portfolio
