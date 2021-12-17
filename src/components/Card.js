import React, { useEffect, useRef} from 'react'

function Card({styleBlack,picture,title,description,tools,buttons}){
    return (
        <div className="card-container" style={styleBlack}>
            <h2 className="card-container__title font-bungee">{title}</h2>
            <p className="card-container__description">{description}</p>
            <ul className="card-container__tools">{tools.map((tool,index)=><li key={index}>{tool}</li>)}</ul>
            <div className="card-container__picture" style={{backgroundImage:"url('"+picture+"')"}}> </div>

            <div className="card-container__buttons">
                {buttons.map((button,index)=><a style={styleBlack} className="font-bebas" key={index} target="_blank" href={button.url}>{button.type}</a>)}
            </div>
        </div>
    )
}

export default Card