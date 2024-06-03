import React from "react";

//components
import Notice from "../components/Notice";
import Header from "../components/Header";
import AccessPortal from "../components/AccessPortal";


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
