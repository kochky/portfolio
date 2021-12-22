import React from 'react'

function Card({styleBlack,picture,title,description,tools,buttons}){
    return (
        <div className="card-container" style={styleBlack}>
            <h2 className="card-container__title font-bungee">{title}</h2>
            <p className="card-container__description">{description}</p>
            <ul className="card-container__tools">{tools.map((tool,index)=><li key={index}>{tool}</li>)}</ul>
            <div className="card-container__div" >
                <div className="card-container__div__picture" style={{backgroundImage:"url('"+picture+"')"}}> </div>
            </div> 
            <div className="card-container__buttons">
                {buttons.map((button,index)=><div key={index}><i className="fas fa-long-arrow-alt-right fa-lg"></i><a style={styleBlack} className="font-bebas" rel="noopener noreferrer" target="_blank" href={button.url}>{button.type}</a></div>)}
            </div>
        </div>
    )
}

export default Card