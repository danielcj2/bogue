import React from 'react'
import Header from '../components/Header';
import Notice from '../components/Notice';

import img from '../imgs/homepage-background.jpg';

const Homepage = () => {
  return (
    <>
        <Notice duplicate={9}/>
        <Header />
        <div className="section">
            <div className="section__home">
                <img src={img} alt="homepage background img"></img>
            </div>
        </div>
    </>
  )
}

export default Homepage
