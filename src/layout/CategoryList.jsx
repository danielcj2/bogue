import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();

  //todo
  return (
    <>
      <ul className="trending">
        <li className="trending__title cap">Trending</li>
        <li className="trending__option" onClick={() => navigate("/catalog/")}>Trending1</li>
        <li className="trending__option" onClick={() => navigate("/catalog/")}>Trending2</li>
        <li className="trending__option" onClick={() => navigate("/catalog/")}>Trending3</li>
      </ul>
      <ul className="ready-to-wear">
        <li className="ready-to-wear__title cap">Ready To Wear</li>
        <li className="ready-to-wear__option" onClick={() => navigate("/catalog/t-shirts-and-tops")}>T-shirts & Tops</li>
        <li className="ready-to-wear__option" onClick={() => navigate("/catalog/sweaters-and-cardigans")}>Sweaters & Cardigans</li>
        <li className="ready-to-wear__option" onClick={() => navigate("/catalog/coats-jackets-and-outerwear")}>Coats, Jackets & Outerwear</li>
        <li className="ready-to-wear__option" onClick={() => navigate("/catalog/jeans-and-trousers")}>Jeans & Trousers</li>
        <li className="ready-to-wear__option" onClick={() => navigate("/catalog/hoodies-and-sweatshirts")}>Hoodies & Sweatshirts</li>
      </ul>
      <ul className="style-guide">
        <li className="style-guide__title cap">Style Guide</li>
        <li className="style-guide__option" onClick={() => navigate("/catalog/")}>Casual Looks</li>
        <li className="style-guide__option" onClick={() => navigate("/catalog/")}>Sports Looks</li>
        <li className="style-guide__option" onClick={() => navigate("/catalog/")}>Street Looks</li>
      </ul>
      <ul className="offers-and-deals">
        <li className="offers-and-deals__title cap" onClick={() => navigate("/catalog/")}>Offers & Deals</li>
      </ul>
    </>
  );
};

export default CategoryList;
