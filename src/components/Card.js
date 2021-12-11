import React, { useEffect, useRef} from 'react'


function Card({setData,picture,title,description,tools,buttons}){

    return (
        <div className="card-container">
            <div className="card-container__picture" style={{background:({picture})}}> </div>
            <h2 className="card-container__title">{title}</h2>
            <p className="card-container__description">{description}</p>
            <ul className="card-container__tools">{tools.map((tool)=><li>{tool}</li>)}</ul>
            {buttons.map((button)=><a target="_blank" href={button.url}><button>{button.type}</button></a>)}
            
        </div>
    )
}

export default Card