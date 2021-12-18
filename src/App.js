import React, { useState,  } from 'react'
import Portfolio from "./Portfolio"
import  "./css/style.css"

function App(){
const [loading,setLoading]=useState(false)

    // useEffect(() => {
    //     setTimeout(()=>{setLoading(false)},4000);

    //     }, [])

    // useEffect(() => {
    //     window.addEventListener("resize",()=>setLoading(true,setTimeout(()=>{setLoading(false)},4000)))
       
    //   },[])

    return (
        loading ? (<div className="front-container"><span className="front-container__hello">Hello<span className="front-container__hello__effect"><span className="front-container__hello__effect__opacity">|</span></span></span><br/></div>)
        :( <Portfolio/>)
    )
}

export default App