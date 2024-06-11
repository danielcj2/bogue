import React, { useState } from "react";
import tshirtImg from "../imgs/crewneck_shirt_red.png";
import { ReactComponent as Heart } from "../svgs/heart.svg";
import { ReactComponent as HeartRed } from "../svgs/heart-red.svg";
import { Link } from "react-router-dom";

//todo
const CardCatalog = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <li className="catalog__card">
      <Link to={`/products/${item.hash.toUpperCase()}`}>
        <div className="catalog__card__image">
          <img src={tshirtImg} alt="tshirt stock"></img>
        </div>
        <div className="catalog__card__info">
          <div className="card__item">
            <div className="card__item__title bold">{item.apparel_name}</div>
            <div className="card__item__cost">${item.cost}</div>
          </div>
          <div className="card__item__arrival">
            {item.is_new_arrival && "New Arrival"}
          </div>
        </div>
        <button
          className="favorite"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? <HeartRed /> : <Heart />}
        </button>
      </Link>
    </li>
  );
};

export default CardCatalog;
