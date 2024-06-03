import React from "react";

const Notice = ({ duplicate, shipping = "true" }) => {
  const duplicatedContent = () => {
    let content = [];

    for (let i = 0; i < duplicate; i++) {
      content.push(
        <h1 key={i} className="notice__heading upp" aria-hidden="true">
          Free Shipping on Orders over $100 CAD
        </h1>
      );
    }

    return content;
  };

  return (
    <div className="notice scroller">
      {shipping ? (
        <div className="scroller__inner">
          <h1 className="notice__heading upp">
            Free Shipping on Orders over $100 CAD
          </h1>
          {duplicatedContent()}
        </div>
      ) : (
        <div className="notice__no-content"></div>
      )}
    </div>
  );
};

export default Notice;
