import React from "react";

//components
import Notice from "../components/Notice";

//layout
import AccessPortal from "../layout/AccessPortal";
import Header from "../layout/Header";

const ForgotPassword = () => {
  return (
    <>
      <Notice duplicate={0} shipping={false} />
      <Header />
      <div className="section">
        <div className="section__change-password">
            <AccessPortal defaultPortal="reset-password"/>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
