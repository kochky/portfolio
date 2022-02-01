import React, { useState, useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ProjectsGH from './data/ProjectsGH';
import Card from './components/Card';
import Mirror from './components/Mirror';


function Portfolio() {
   
  const [opacityHover,setOpacityHover]=useState(0)
  const [mirrorStyle,setMirrorStyle]=useState({width:"50px",height:"50px"})
  const [styleBlack,setStyleBlack]=useState({borderColor:"black",color:"black",backgroundColor:"white"})
  const [scroll,setScroll]=useState(true)

  const ref=useRef(null)

  useEffect(()=>{
    let mounted= true
    if (mounted){
      gsap.registerPlugin(ScrollTrigger,TextPlugin,ScrollToPlugin)


      function goToSection(i, anim) {
        gsap.set("body", {overflowY: "hidden"});
        gsap.to(window, {
          scrollTo: {y: i*window.innerHeight, autoKill: false},
          duration: 4,
          overwrite: true,
          onComplete: () => gsap.set("body", {overflowY: "auto"})
        });     
      }
      

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
      {y:0},);


      gsap.fromTo(".developpeur",
        {x:'20vw'},
        {x:0},
      );
      
      gsap.fromTo(".front-end",
      {x:'-20vw'},
      {x:0},
      );
        
      //permet le pin le snap des sections
      let sections=gsap.utils.toArray(".snapDiv");
      let articles=gsap.utils.toArray("article");

      //Scroll du premier panel au deuxieme et bloque les scrolls de l'user pendant l'animation
    
      gsap.to(".description", {
        scrollTrigger:{
          trigger: ".description",
          onEnter: () => goToSection(1),
        }
      })
      gsap.to(".presentation", {
        scrollTrigger:{
          trigger: ".presentation",
          onEnterBack: () => goToSection(0),
        }
      })
      gsap.to(".description", {
        scrollTrigger:{
          trigger: ".presentation",
          onEnterBack: () => goToSection(1),
        }
      })

      const bigTl=gsap.timeline();
      bigTl
      .to(".presentation", {x:0,
        scrollTrigger:{
          trigger:'.presentation',
          start:"top top",
          end:"80%",
          scrub:1,
          pin:true,
          //anticipatePin:1, 
        }
      })
      .fromTo(".description__title",{rotate:'-50',x:"-100vw"},{rotate:0,x:0, scrollTrigger:{
        trigger:".description",
        start:"top bottom",
        endTrigger:".description",
        end:"top top",
        toggleActions:"restart none reverse reverse",
        scrub:3,
      }})
      
      .fromTo(".description__div",{x:"100vw"},{x:"0vw", scrollTrigger:{
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
          snap:{
            snapTo:1/12,
            duration:0.2,
            delay:1,
          },
        }
      })
    
      
      // //faire apparaitre l'image QRcode en quittant la page
      gsap.fromTo(".description__picture",{yPercent:100},{yPercent:0,
        scrollTrigger:{
          trigger:".description__title",
          scrub:1,
          end:"top 40%",
          }});
      gsap.to(".description__picture",{x:"0vw",
        scrollTrigger:{
          trigger:".projet",
          start:"1% top" ,
          end:"1% top",
          scrub:2,
        }});

      // //anime les ... de about me
      const pointTl=gsap.timeline({scrollTrigger:{
        trigger:".description",
      }});
      pointTl.fromTo(".first-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,delay:0.1,duration:0.6,
      })
      .fromTo(".second-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
      })
      .fromTo(".third-point-exclamation",{color:"white"},{color:"#E1A624",repeat:-1,duration:0.6,delay:0.1
      });

      // //fait apparaitre le texte au fur et à mesure
      const textTl=gsap.timeline({scrollTrigger:{
        trigger:".description__div",
        start:"bottom bottom",
        end:"bottom 95%",
        toggleActions:"restart none reverse reverse",
      }});
      textTl.fromTo(".description__div__second",{opacity:0},{opacity:1,ease:"none",
      })
        .fromTo(".description__div__third",{opacity:0},{opacity:1,ease:"none",   
      });
      
      // //Anime le cadre autour de .description
      gsap.fromTo(".sright",{xPercent:-100},{xPercent:100,ease:"power1.inOut",repeat:-1,duration:8})
      gsap.fromTo(".sdown",{yPercent:-100},{yPercent:100,ease:"power1.inOut",repeat:-1,duration:8,delay:4})
      gsap.fromTo(".sleft",{xPercent:100},{xPercent:-100,ease:"power1.inOut",repeat:-1,duration:8,delay:8})
      gsap.fromTo(".sup",{yPercent:100},{yPercent:-100,ease:"power1.inOut",repeat:-1,duration:8,delay:12});

      //inverse les couleurs quand .parcours est visible
      ScrollTrigger.create({
        trigger:".parcours",
        start:"top 99%",
        onEnter:()=>setStyleBlack({borderColor:"white",color:"white",backgroundColor:"black"}),
        onLeave:()=>setStyleBlack({borderColor:"black",color:"black",backgroundColor:"white"}),
        onEnterBack:()=>setStyleBlack({borderColor:"white",color:"white",backgroundColor:"black"}),
        onLeaveBack:()=>setStyleBlack({borderColor:"black",color:"black",backgroundColor:"white"})

      });


      //remplace le texte sur "ce que j'apprends en ce moment"
      const remplaceTl= gsap.timeline({repeat:-1,duration:0,delay:0,ease:"none",type:"diff",
      })
      remplaceTl.to(".remplace-text",{
        delay:0,
        duration:2,
        text:{
          value:"TypeScript",
          speed:0.5,
        }})
      .to(".remplace-text",{
        delay:0,
        duration:2,
        text:{
          value:"Next.js",
          speed:0.5,
        }
      })
      .to(".remplace-text",{
        delay:0,
        duration:2,
        text:{
          value:"React Native",
          speed:0.5,
        }
      });

      const parcoursTL=gsap.timeline({
        scrollTrigger:{
          trigger:".parcours__container",
          start:"top top",
          scrub:2,
        }
      })
      parcoursTL.add("start")
      //séparation des 3 images
      .to(".picture-second",{xPercent:150},"start")
      .to(".picture-first",{xPercent:-150},"start")
      //images accompagnent le scroll
      .add("middle")
      .to(".parcours__container__picture",{y:'30vh',ease:"none"},"middle")
      //Dévoile les contacts
      .to(".parcours__container",{y:"-32vh"},"middle")
      .from(".scale",{scale:0,ease:"none"})
      .from(".parcours__container__hidden-text",{opacity:0})
      .to(".parcours__text",{opacity:0})

      //Parcours reste figé
      gsap.to(".parcours",{ease:"none",
        scrollTrigger:{
          trigger:".parcours",
          pin:true,
          scrub:1,
          anticipatePin:1,
          pinSpacing:false,

        }})

      //snap le .parcours
      ScrollTrigger.create({
        trigger:".parcours",
        start:"top bottom",
        end:"top top",
        snap:1,
        scrub:1,
      })
    }
    return function cleanup(){
      mounted=false
     }
        
  },[])
  

  return (
    <main ref={ref} onWheel={()=>setScroll(false)}>
      { scroll && <div className="scroll"><p>Scroll</p><i className="fas fa-angle-double-down"></i></div>}
       <div  className="homepage" >
        <Mirror opacityHover={opacityHover} mirrorStyle={mirrorStyle} />
        <div className="marquee"><div className="marquee__inner"><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span><span>Portfolio</span></div></div>
        <section  className="presentation snapDiv">
          <div className="presentation__container opacityQuick">
            <span className={"presentation__container__underline name "} onMouseOut={()=>{setOpacityHover(0);setMirrorStyle({width:"50px",height:'50px'})}} onMouseEnter={()=>{setOpacityHover(1);setMirrorStyle({width:"500px",height:'500px'})}}>
              Christopher<br/>
              Koch</span>
            <span  className={"presentation__container__text  developpeur"}> développeur <br/></span>
            <span className="presentation__container__text__span front-end ">front-end<span>.</span></span> 
          </div>
        </section>
      </div>
      <section className='vertical-container'>
        <article className="description snapDiv " >
        <div className="description__div__line top"><div className="description__div__line__ball sright"></div></div>
        <div className="description__div__line bottom"><div className="description__div__line__ball sleft"></div></div>
        <div className="description__div__line left"><div className="description__div__line__ball sup"></div></div>
        <div className="description__div__line right"><div className="description__div__line__ball sdown"></div></div>

            <h1 className="description__title ">About me <span className="first-point-exclamation">.</span><span className="second-point-exclamation">.</span><span className="third-point-exclamation">.</span></h1>
            <div className="description__picture" ></div>
            <div className="description__div font-bebas"> 
              <p>J'ai 33 ans et j'habite Marseille ! </p>
              <p className='description__div__second'>Directeur dans la grande distribution, je me suis lancé dans le développement front-end par passion.</p>
              <p className='description__div__third'>J'ai récemment suivi et fini ma formation de développeur d'application Javascript React auprès de Openclassrooms.</p> 
            </div>
        </article>
        <article className="projet" style={styleBlack} >
          <h1 className="projet__title">Mes projets</h1>
          <div className="projet__container">
            {ProjectsGH.map(projet=><Card   styleBlack={styleBlack} key={projet.id}  picture={projet.picture} title={projet.title} description={projet.description} buttons={projet.buttons} tools={projet.tools}/>).reverse()}
          </div>
       
        </article>
      </section>
      <section className="parcours" >
        <div className="parcours__container font-bebas " style={styleBlack}>
          <p className='parcours__container__first parcours__text' >Cette formation m'a permis de pratiquer à travers différents projets. </p>
          <p className='parcours__container__second parcours__text'>Je continue à monter en compétences avec de nouveaux projets persos.</p>
          <p className='parcours__container__third parcours__text'>Actuellement, j'apprends <span className="remplace-text">React Native</span> </p>
           <div className="parcours__container__picture picture-first"></div>
           <div className="parcours__container__picture picture-second"></div>
           <div className="parcours__container__picture"></div> 
           <div className="parcours__container__hidden-text">That's all folks</div>
        </div>
        <div className="parcours__contact">
            <div className="parcours__contact__container">
              <h2 className='parcours__contact__container__title font-bebas'>More  <span className="marquee__point"><span className="marquee__point__inner"><span>.</span><span>.</span><span>.</span><span>.</span></span></span></h2>
              <div className='parcours__contact__container__icon-div'>
                <div className="scale"><a className="parcours__contact__container__icon-div__link "  rel="mail" target="blank" href="mailto:koch.christopher@hotmail.fr"><i className="far fa-envelope fa-4x "></i> </a></div>
                <div className="scale"><a className="parcours__contact__container__icon-div__link fab fa-linkedin fa-4x"  rel="linkedin" target="blank" href="https://www.linkedin.com/in/christopher-koch-frontend/"> </a></div>
                <div className="scale"><a className="parcours__contact__container__icon-div__link fab fa-github-square fa-4x" rel="github" target="blank" href="https://github.com/kochky"> </a></div>
                <div className="scale"><a className="parcours__contact__container__icon-div__link far fa-file fa-4x"  rel="cv" href="./CV_Koch_Christopher.pdf" download > </a></div>
              </div>
            </div> 
          </div> 
      </section>
      <div className="go-back" onClick={()=>ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Back to Home</div>
      <section className="empty">
      </section>
    </main>
  )
}

export default Portfolio
