import React, { useState, useEffect  } from 'react'
import Portfolio from "./Portfolio"
import  "./css/style.css"

function App(){
const [loading,setLoading]=useState(false)

    function detectDevice(){
        const userAgent = navigator.userAgent.toLowerCase();
        var isMobile = /iPhone|Android/i.test(navigator.userAgent);
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
        if(!isMobile&& !isTablet){
            setLoading(true,setTimeout(()=>{setLoading(false)},4000))
        }

    }
    useEffect(() => {
        setTimeout(()=>{setLoading(false)},4000);

        }, [])

    useEffect(() => {
        window.addEventListener("resize",()=>{detectDevice()})
        
       
      },[])

    return (
        loading ? (<div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>)
        :( <Portfolio/>)
    )
}

export default App