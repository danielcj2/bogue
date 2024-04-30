import React from "react";

const CategoryList = () => {
  return (
    <>
      <ul className="trending">
        <li className="trending__title cap">Trending</li>
        <li className="trending__option">Trending1</li>
        <li className="trending__option">Trending2</li>
        <li className="trending__option">Trending3</li>
      </ul>
      <ul className="ready-to-wear">
        <li className="ready-to-wear__title cap">Ready To Wear</li>
        <li className="ready-to-wear__option">T-shirts & Tops</li>
        <li className="ready-to-wear__option">Sweaters & Cardigans</li>
        <li className="ready-to-wear__option">Coats, Jackets & Outerwear</li>
        <li className="ready-to-wear__option">Jeans & Trousers</li>
        <li className="ready-to-wear__option">Hoodies & Sweatshirts</li>
      </ul>
      <ul className="style-guide">
        <li className="style-guide__title cap">Style Guide</li>
        <li className="style-guide__option">Casual Looks</li>
        <li className="style-guide__option">Sports Looks</li>
        <li className="style-guide__option">Street Looks</li>
      </ul>
      <ul className="offers-and-deals">
        <li className="offers-and-deals__title cap">Offers & Deals</li>
        <li className="offers-and-deals__option">Offers & Deals</li>
      </ul>
    </>
  );
};

export default CategoryList;
