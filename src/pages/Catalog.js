import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import { useParams } from 'react-router-dom';

//components
import Header from '../components/Header'
import Settings from '../components/Settings'
import Notice from '../components/Notice'
import CatalogCard from '../components/CatalogCard'

//icons / imgs
import racksImg from '../imgs/warehouse-racks.jpg'
import { IoChevronDownSharp } from "react-icons/io5";
import { PiSquaresFour, PiSquare, PiSquareSplitHorizontal } from "react-icons/pi";

const Catalog = () => {
    const [error, setError] = useState(null);
    const [apparel, setApparel] = useState([]);

    const { params } = useParams();
    // Parse parameters
    const categories = params.split('/');

    useEffect(() => {
        const fetchApparel = async () => {
            const {data, error} = await supabase.from('apparel').select('*');

            if(error){
                setError('404');
                setApparel([]);
                console.log(error);
            }
            if(data){
                setApparel(data);
                setError(null);
            }
        }

        fetchApparel();

    }, []);


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
                <div className="catalog__list__cards">
                    {error && (<p>404</p>)}
                    {apparel && 
                        apparel.map(item => (
                            <CatalogCard key={item.apparel_id} item={item}/>
                        ))
                    }
                </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Catalog
