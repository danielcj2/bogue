import React from 'react'

const Notice = ({duplicate}) => {

  const duplicatedContent = () => {
    let content= [];

    for (let i=0; i<duplicate; i++){
        content.push(<h1 key={i} className="notice__heading upp" aria-hidden="true">Free Shipping on Orders over $100 CAD</h1>);
    }

    return content;
  }

  return (
    <div className="notice scroller">
      <div className="scroller__inner">
        <h1 className="notice__heading upp">Free Shipping on Orders over $100 CAD</h1>
        {duplicatedContent()}
      </div>
    </div>
  )
}

export default Notice
