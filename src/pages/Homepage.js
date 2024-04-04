import React from 'react'
import Header from '../components/Header';
import Notice from '../components/Notice';

import img from '../imgs/homepage-background.jpg';
import Settings from '../components/Settings';

const Homepage = () => {
  return (
    <>
      <Header />
      <Notice duplicate={9}/>
      <div className="section">
          <div className="section__home">
              <img src={img} alt="homepage background img" draggable="false"></img>
          </div>
      </div>
    </>
  )
}

export default Homepage
