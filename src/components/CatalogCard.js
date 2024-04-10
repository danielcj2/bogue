import React, { useState } from 'react'
import tshirtImg from '../imgs/crewneck_shirt_red.png'
import { PiHeartFill } from "react-icons/pi";
import { PiHeartThin } from "react-icons/pi";
import { PiHeartDuotone } from "react-icons/pi";

const CatalogCard = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <li className="catalog__card">
        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
        <div className="catalog__card__info">
          <div className="title__container">
              <div className="card__item__title bold">{item.apparel_name}</div>
              <div className="card__item__cost">${item.cost}</div>
          </div>  
            <div className="card__item__arrival">{item.is_new_arrival && "New Arrival"}</div>
        </div>
        <button className="favorite" onMouseEnter={()=> setHover(true)}
           onMouseLeave={()=> setHover(false)}>{hover ? <PiHeartFill fill="#CC0000"/> : <PiHeartFill fill="#faf9f8"/>}</button>
    </li>
  )
}

export default CatalogCard