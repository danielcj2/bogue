import CardCatalog from "../components/CardCatalog";
import { Link } from "react-router-dom";

export const displayInfo = (pData, expanded) => {
  var info;

  if (pData && Array.isArray(pData)) {
    info = pData[0];
  } else {
    info = pData;
  }

  return (
    <>
      <h2 className="catalog__description__title upp">
        Men's {info && info.category_name}
      </h2>
      {expanded && (
        <p className="catalog__description__text">
          {info && info.category_description}
        </p>
      )}
    </>
  );
};

export const displayLinks = (pData) => {
  if (Array.isArray(pData)) {
    let linkEntries = [];
    let pathLinks = "";
    for (var i = pData.length - 1; i >= 0; i--) {
      linkEntries.push(
        <div key={pData[i].category_id}>
          <Link to={"/catalog/" + pathLinks + pData[i].slug}>
            {pData[i].category_name}
          </Link>
        </div>
      );
      pathLinks = pathLinks + pData[i].slug + "/";
    }

    return linkEntries;
  } else {
    return (
      <div key={pData.category_id}>
        <Link to={"/catalog/" + pData.slug}>{pData.category_name}</Link>
      </div>
    );
  }
};

export const displayCards = (data) => {
  let cardEntries = [];
  for (var i = 0; i < data.length; i++) {
    cardEntries.push(
      <CardCatalog
        key={`${data[i].apparel_name}_${data[i].category_id}`}
        item={data[i]}
      />
    );
  }

  return cardEntries;
};
