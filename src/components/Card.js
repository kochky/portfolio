import React from 'react'


function Card({picture,title,description,tools,buttons}){


    return (
        <div className="card-container">
            <div className="card-container__picture" style={{background:({picture})}}> </div>
            <h2 className="card-container__title">{title}</h2>
            <p className="card-container__description">{description}</p>
            {/* <p className="card-container__tools">{tools.map(tool=><li>{tool}</li>)}</p> */}
            {buttons.map((button)=><a href={button.url}><button>{button.type}</button></a>)}
            
        </div>
    )
}

export default Card