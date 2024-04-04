import React from 'react'
import Header from '../components/Header'
import Settings from '../components/Settings'
import Notice from '../components/Notice'
import tshirtImg from '../imgs/tshirt-stock.jpg'
import racksImg from '../imgs/warehouse-racks.jpg'
import { IoChevronDownSharp } from "react-icons/io5";
import { PiSquaresFour, PiSquare, PiSquareSplitHorizontal } from "react-icons/pi";

const Catalog = () => {
  return (
    <>
        <Notice duplicate={9}/>
        <Header />
        <div className="section">
          <div className="section__catalog">
            <img src={racksImg} className="background-img" alt="warehouse clothing racks" draggable="false"></img>
            <div className="catalog__list">
                <div className="catalog__list__header__container">
                    <div className="catalog__list__filters__button__container"><div className="filters__text">Filters </div><IoChevronDownSharp /></div>
                    <div className="catalog__list__path">Shop All / Ready-To-Wear / Shirts</div>
                    <div className="catalog__list__toggle__container">
                        <div className="toggle__large"><PiSquare className="__button" /></div>
                        <div className="toggle__medium"><PiSquareSplitHorizontal className="__button"/></div>
                        <div className="toggle__small"><PiSquaresFour className="__button"/></div>
                    </div>
                </div>
                <div className="catalog__list__cards__container">
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                    <div className="catalog__card">
                        <div className="catalog__card__image"><img src={tshirtImg} alt="tshirt stock"></img></div>
                        <div className="catalog__card__info__container">
                            <div className="card__item__title bold">PLAIN T-SHIRT</div>
                            <div className="card__item__cost">$70.00</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Catalog
