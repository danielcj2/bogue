import React from "react";

//components
import Notice from "../components/Notice";
import Header from "../components/Header";
import AccessPortal from "../components/AccessPortal";

const AcessPortalPage = () => {
  return (
    <>
      <Notice duplicate={0} shipping={false} />
      <Header />
      <div className="section">
        <div className="section__access-portal">
          <AccessPortal />
        </div>
      </div>
    </>
  );
};

export default AcessPortalPage;
