import React, { useEffect, useState } from "react";

//components
import Notice from "../components/Notice";
import Header from "../layout/Header";

//layout
import AdressBook from "../layout/AdressBook";
import PaymentMethods from "../layout/PaymentMethods";
import Profile from "../layout/Profile";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SectionHeader from "../components/SectionHeader";

const Account = ({ defaultToggle = "profile" }) => {
  const toggleParams = useParams();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(defaultToggle);
  useEffect(() => {
    if (toggleParams) setToggle(toggleParams.section);
  }, [toggleParams]);

  const handleNavigate = (newSection) => {
    navigate(`/account/${newSection}`);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) navigate("/access-portal");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Notice duplicate={0} shipping={false} />
      <Header />
      <div className="section">
        <div className="section__account">
          <div className="section__account__toggles">
            <div
              className={`${
                toggle === "profile" ? "selected" : "not-selected"
              } profile__toggle`}
              onClick={() => {
                handleNavigate("profile");
              }}
            >
              <div className="profile__text upp">Profile</div>
            </div>
            <div
              className={`${
                toggle === "address-book" ? "selected" : "not-selected"
              } address-book__toggle`}
              onClick={() => {
                handleNavigate("address-book");
              }}
            >
              <div className="address-book__text upp">Adress Book</div>
            </div>
            <div
              className={`${
                toggle === "payment-methods" ? "selected" : "not-selected"
              } payment-methods__toggle`}
              onClick={() => {
                handleNavigate("payment-methods");
              }}
            >
              <div className="payment-methods__text upp">Payment Methods</div>
            </div>
            <div
              className={`${
                toggle === "orders" ? "selected" : "not-selected"
              } orders__toggle`}
              onClick={() => {
                handleNavigate("orders");
              }}
            >
              <div className="orders__text upp">Orders</div>
            </div>
            <div
              className={`${
                toggle === "wishlist" ? "selected" : "not-selected"
              } wishlist__toggle`}
              onClick={() => {
                handleNavigate("wishlist");
              }}
            >
              <div className="wishlist__text upp">Wishlist</div>
            </div>
            <div
              className={`${
                toggle === "account-settings" ? "selected" : "not-selected"
              } account-settings__toggle`}
              onClick={() => {
                handleNavigate("account-settings");
              }}
            >
              <div className="account-settings__text upp">settings</div>
            </div>
          </div>
          <div className="section__account__content">
            {toggle === "profile" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="manage your profile information"
                  paragraph="This section allows you to manage your personal information.
                    Keeping this information up to date ensures that your
                    account remains accurate and personalized."
                />
                <Profile />
              </div>
            )}
            {toggle === "address-book" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="shipping and billing addresses"
                  paragraph="In the address book, you can store multiple shipping and
                    billing addresses. This feature is particularly handy for
                    users who frequently ship items to different locations, such
                    as home, work, or friends' addresses. You can add, edit, or
                    delete addresses as needed, making the checkout process
                    smoother and more convenient."
                />
                <AdressBook />
              </div>
            )}
            {toggle === "payment-methods" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="credit and debit cards"
                  paragraph="Here, you can control the various payment methods associated
                    with your account. This includes adding new credit or debit
                    cards, editing existing ones, and removing outdated or
                    unused payment options. Keeping your payment methods updated
                    ensures that you can easily make purchases without any
                    hassles."
                />
                <PaymentMethods />
              </div>
            )}
            {toggle === "orders" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="view your order history"
                  paragraph="The orders section provides a comprehensive overview of your
                    purchase history. You can track the status of current
                    orders, view details of past purchases, and manage any
                    returns or cancellations. This feature gives you full
                    visibility into your shopping activity and allows you to
                    easily reference previous transactions."
                />
              </div>
            )}
            {toggle === "wishlist" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="save items for later"
                  paragraph="The wishlist feature allows you to save items that you're
                    interested in purchasing in the future. You can add products
                    to your wishlist while browsing the site, making it easy to
                    keep track of items you want to buy later."
                />
              </div>
            )}
            {toggle === "account-settings" && (
              <div className={`content__${toggle}`}>
                <SectionHeader
                  name={`content__${toggle}`}
                  heading="customize your account"
                  paragraph="In the settings section, you can customize various aspects
                    of your account to suit your preferences. Personalizing your
                    account settings ensures that your experience on the
                    platform aligns with your individual needs and preferences."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
