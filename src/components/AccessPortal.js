import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import accountInputStates from "../json/accountInputStates.json";

import { GrFormCheckmark } from "react-icons/gr";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

// import {
//   validateConfirmPassword,
//   validateDate,
//   validateEmail,
//   validateName,
//   validateNewPassword,
//   validatePassword,
//   validatePhone,
// } from "../functions/validateFunctions";
import { handleChange } from "../functions/handleChange";
import {
  handleAuthenticate,
  handleForgotPasswordAuthentication,
  handleResetPasswordAuthentication,
  handleSignInAuthentication,
  handleSignOut,
} from "../functions/authenticationFunctions";

const AccessPortal = ({ defaultPortal = "login" }) => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    user?.identities ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  const [inputStates, setInputStates] = useState(accountInputStates);
  const [portal, setPortal] = useState(defaultPortal);

  useEffect(() => {
    setInputStates(accountInputStates);
  }, [portal]);

  const handleFocus = (inputID) => {
    setInputStates({
      ...inputStates,
      [inputID]: {
        ...inputStates[inputID],
        isFocused: true,
      },
    });
  };

  const handleBlur = (inputID) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [inputID]: {
        ...prevInputStates[inputID],
        isFocused:
          prevInputStates[inputID].type === "phone" ||
          prevInputStates[inputID].type === "date"
            ? true
            : false,
        hasError:
          prevInputStates[inputID].type === "create-password" &&
          prevInputStates[inputID].value.length === 0
            ? ["length", "lowercase", "uppercase", "digit"]
            : prevInputStates[inputID].value.length === 0
            ? "! Input field required."
            : prevInputStates[inputID].hasError,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    let empty = "";
    let errors = [];
    for (const objState of Object.values(inputStates)) {
      if (objState.form === "login") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
        if (!objState.value.length) {
          empty = objState.id;
          const id = objState.id;
          setInputStates((prevInputStates) => ({
            ...prevInputStates,
            [id]: {
              ...objState,
              hasError: "! Input field required.",
            },
          }));
        }
      }
    }
    if (empty) {
      return;
    }
    if (!errors.length) {
      handleSignInAuthentication(
        {
          email: inputStates.email.value,
          password: inputStates.password.value,
        },
        setInputStates,
        dispatch
      );
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (inputStates.retrieveEmail.value === "") {
      setInputStates((prevInputStates) => ({
        ...prevInputStates,
        retrieveEmail: {
          ...prevInputStates.retrieveEmail,
          hasError: "! Input field required.",
        },
      }));
    } else {
      if (!inputStates.retrieveEmail.hasError) {
        handleForgotPasswordAuthentication(
          inputStates.retrieveEmail.value,
          setPortal,
          dispatch
        );
        //    setInputStates((prevInputStates) => ({
        //       ...prevInputStates,
        //       retrieveEmail: {
        //         ...prevInputStates.retrieveEmail,
        //         hasError: "! Email does not exist.",
        //       },
        //     }));
      }
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    let empty = "";
    let errors = [];
    for (const objState of Object.values(inputStates)) {
      if (objState.form === "reset") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
        if (!objState.value.length) {
          empty = objState.id;
          const id = objState.id;
          setInputStates((prevInputStates) => ({
            ...prevInputStates,
            [id]: {
              ...objState,
              hasError:
                objState.type === "create-password"
                  ? ["length", "lowercase", "uppercase", "digit"]
                  : "! Input field required.",
            },
          }));
        }
      }
    }
    if (empty) {
      return;
    }
    if (!errors.length) {
      handleResetPasswordAuthentication(
        inputStates.newPassword.value,
        setInputStates,
        setPortal,
        dispatch
      );
    }
  };

  const pRef = useRef(null);
  const emailRef = useRef(null);
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!inputStates.tosCheckbox.isChecked) {
      pRef.current.style.color = "#F95738";
      pRef.current.style.opacity = "1";
      return;
    }

    let empty = "";
    let errors = [];
    for (const objState of Object.values(inputStates)) {
      if (objState.form === "create") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
        if (!objState.value.length) {
          empty = objState.id;
          const id = objState.id;
          setInputStates((prevInputStates) => ({
            ...prevInputStates,
            [id]: {
              ...objState,
              isFocused:
                objState.type === "phone" || objState.type === "date"
                  ? true
                  : false,
              hasError:
                objState.type === "create-password"
                  ? ["length", "lowercase", "uppercase", "digit"]
                  : "! Input field required.",
            },
          }));
          // } else {
          //   if (!objState.hasError) {
          //     alert("input is valid");
          //   }
        }
      }
    }
    if (empty) {
      return;
    }
    if (!errors.length) {
      handleAuthenticate(
        {
          email: inputStates.createEmail.value,
          password: inputStates.createPassword.value,
          first_name: inputStates.firstName.value,
          last_name: inputStates.lastName.value,
          phone: inputStates.phoneNumber.value.replace(/[^\d]/g, ""),
          dob: inputStates.dateOfBirth.value,
        },
        setPortal,
        setInputStates,
        dispatch
      );
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="access-portal user-portal">
          <div className="access-portal__header user-portal__header">
            <h5>
              Welcome back,{" "}
              <span className="access-portal__user-name cap">
                {user?.user_metadata.first_name +
                  " " +
                  user?.user_metadata.last_name}
              </span>
            </h5>
            <p>We're thrilled to have you here again!</p>
            {/* <p className="user-portal__logout">
              <span onClick={() => handleSignOut(dispatch)}>Log out</span>
            </p> */}
          </div>
          <div className="access-portal__header user-portal__header">
            <h5 className="cap">quick select menu</h5>
            <p>Effortlessly manage your account with our quick select menu.</p>
          </div>
          <div className="access-portal__quick-select">
            <ul className="quick-select__profile cap">
              <li className="quick-select__profile__title upp">
                <h5>profile</h5>
              </li>
              <li className="quick-select__profile__item">
                <Link to="/account/profile">my profile</Link>
              </li>
              <li className="quick-select__profile__item">
                <Link to="/account/addresses">address book</Link>
              </li>
              <li className="quick-select__profile__item">
                <Link to="/account/payment-methods">payment methods</Link>
              </li>
            </ul>
            <ul className="quick-select__order-preferences cap">
              <li className="quick-select__order-preferences__title upp">
                <h5>orders & preferences</h5>
              </li>
              <li className="quick-select__order-preferences__item">
                <Link to="/account/orders">orders & returns</Link>
              </li>
              <li className="quick-select__order-preferences__item">
                <Link to="/account/wishlist">wishlist</Link>
              </li>
            </ul>
            <ul className="quick-select__account cap">
              <li className="quick-select__account__title upp">
                <h5>account hub</h5>
              </li>
              <li className="quick-select__account__item">
                <Link to="/account/settings">settings</Link>
              </li>
              <li className="quick-select__account__item">
                <div className="user-portal__logout">
                  <span onClick={() => handleSignOut(dispatch)}>
                    Log out
                    <IoIosLogOut />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : portal === "reset-password" ? (
        <div className="access-portal">
          <div className="access-portal__header">
            <h5 className="upp">reset your password</h5>
            <p>
              Your new password must be at least 6 characters long. It should
              include a combination of uppercase and lowercase letters and
              numbers. Avoid using common words or phrases, and make it unique
              to enhance security.
            </p>
          </div>
          <div className="access-portal__reset-password">
            <form
              onSubmit={handleResetPassword}
              className="reset-password-form"
              noValidate
            >
              <div className="reset-password-form__new-password">
                <div className="input-wrapper">
                  <label
                    htmlFor="newPassword"
                    className={`cap${
                      inputStates["newPassword"].isFocused ||
                      inputStates["newPassword"].value !== ""
                        ? " isFocused"
                        : ""
                    }`}
                  >
                    \Create a new password
                  </label>
                  <div className="__container">
                    <input
                      type={`${
                        inputStates.newPassword.isVisible ? "text" : "password"
                      }`}
                      id="newPassword"
                      value={inputStates.newPassword.value}
                      placeholder="SillyPancake42@"
                      autoComplete="off"
                      maxLength="30"
                      onFocus={() => handleFocus("newPassword")}
                      onBlur={() => handleBlur("newPassword")}
                      onChange={(event) =>
                        handleChange(
                          event,
                          "newPassword",
                          inputStates.newPassword.type,
                          setInputStates,
                          inputStates.newPassword.value
                        )
                      }
                    />
                    <span
                      onClick={() => {
                        setInputStates({
                          ...inputStates,
                          newPassword: {
                            ...inputStates.newPassword,
                            isVisible: !inputStates.newPassword.isVisible,
                          },
                        });
                      }}
                    >
                      {inputStates["newPassword"].isVisible ? (
                        <PiEye />
                      ) : (
                        <PiEyeClosed />
                      )}
                    </span>
                  </div>
                  <p className="create-pw-field">
                    <span
                      className={
                        inputStates.newPassword.hasError.includes("length")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      At least 6 characters
                    </span>
                    <span
                      className={
                        inputStates.newPassword.hasError.includes("lowercase")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      1 lowercase letter
                    </span>
                    <span
                      className={
                        inputStates.newPassword.hasError.includes("uppercase")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      1 uppercase letter
                    </span>
                    <span
                      className={
                        inputStates.newPassword.hasError.includes("digit")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      1 digit
                    </span>
                  </p>
                </div>
              </div>
              <div className="reset-password-form__confirmPassword">
                <div className="input-wrapper">
                  <label
                    htmlFor="confirmPassword"
                    className={`cap${
                      inputStates["confirmPassword"].isFocused ||
                      inputStates["confirmPassword"].value !== ""
                        ? " isFocused"
                        : ""
                    }`}
                  >
                    \Confirm your new Password
                  </label>
                  <div className="__container">
                    <input
                      type={`${
                        inputStates.confirmPassword.isVisible
                          ? "text"
                          : "password"
                      }`}
                      id="confirmPassword"
                      value={inputStates.confirmPassword.value}
                      autoComplete="off"
                      onFocus={() => handleFocus("confirmPassword")}
                      onBlur={() => handleBlur("confirmPassword")}
                      onChange={(event) =>
                        handleChange(
                          event,
                          "confirmPassword",
                          inputStates.confirmPassword.type,
                          setInputStates
                        )
                      }
                    />
                    <span
                      onClick={() => {
                        setInputStates({
                          ...inputStates,
                          confirmPassword: {
                            ...inputStates.confirmPassword,
                            isVisible: !inputStates.confirmPassword.isVisible,
                          },
                        });
                      }}
                    >
                      {inputStates["confirmPassword"].isVisible ? (
                        <PiEye />
                      ) : (
                        <PiEyeClosed />
                      )}
                    </span>
                  </div>
                  <p
                    className={
                      inputStates.confirmPassword.hasError
                        ? "hasError"
                        : "valid"
                    }
                  >
                    {inputStates.confirmPassword.hasError}
                  </p>
                </div>
              </div>
              <div className="button__wrapper">
                <button
                  className="reset-password-form__button-dark"
                  tabIndex="-1"
                >
                  reset
                </button>
              </div>
              <Link to="/access-portal" className="reset-password-form__return">
                <p className="cap return-link">back to login form</p>
              </Link>
            </form>
          </div>
        </div>
      ) : (
        <div className="access-portal">
          <div className="access-portal__header">
            <h5 className="upp">
              welcome {portal !== "create-account" && "back"} !
            </h5>
            <p>
              {portal === "create-account"
                ? "Create an account"
                : "Access your account"}{" "}
              and enjoy personalized services.
            </p>
          </div>
          {portal !== "create-account" && (
            <div className="access-portal__login">
              {portal === "login" ? (
                <form onSubmit={handleSignIn} className="login-form" noValidate>
                  <div className="login-form__email">
                    <div className="input-wrapper">
                      <label
                        htmlFor="email"
                        className={`cap${
                          inputStates["email"].isFocused ||
                          inputStates["email"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \email
                      </label>
                      <div>
                        <input
                          ref={emailRef}
                          type="email"
                          id="email"
                          value={inputStates.email.value}
                          placeholder="bogue@email.com"
                          autoComplete="off"
                          maxLength="30"
                          onFocus={() => handleFocus("email")}
                          onBlur={() => handleBlur("email")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "email",
                              inputStates.email.type,
                              setInputStates
                            )
                          }
                        />
                      </div>
                      <p
                        className={
                          inputStates.email.hasError ? "hasError" : "valid"
                        }
                      >
                        {inputStates.email.hasError}
                      </p>
                    </div>
                  </div>
                  <div className="login-form__password">
                    <div className="input-wrapper">
                      <label
                        htmlFor="password"
                        className={`cap${
                          inputStates["password"].isFocused ||
                          inputStates["password"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \password
                      </label>
                      <div className="__container">
                        <input
                          type={`${
                            inputStates.password.isVisible ? "text" : "password"
                          }`}
                          id="password"
                          value={inputStates.password.value}
                          placeholder="SillyPancake42@"
                          autoComplete="off"
                          onFocus={() => handleFocus("password")}
                          onBlur={() => handleBlur("password")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "password",
                              inputStates.password.type,
                              setInputStates
                            )
                          }
                        />
                        <span
                          onClick={() => {
                            setInputStates({
                              ...inputStates,
                              password: {
                                ...inputStates.password,
                                isVisible: !inputStates.password.isVisible,
                              },
                            });
                          }}
                        >
                          {inputStates["password"].isVisible ? (
                            <PiEye />
                          ) : (
                            <PiEyeClosed />
                          )}
                        </span>
                      </div>
                      <p
                        className={
                          inputStates.password.hasError ? "hasError" : "valid"
                        }
                      >
                        {inputStates.password.hasError}
                      </p>
                    </div>
                  </div>
                  <div
                    className="login-form__forgot-password"
                    onClick={() => setPortal("forgot-password")}
                  >
                    <p>Forgot your password?</p>
                  </div>
                  <div className="button__wrapper">
                    <button className="login-form__button-dark" tabIndex="-1">
                      continue
                    </button>
                    <div></div>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleForgotPassword}
                  className="forgot-password"
                  noValidate
                >
                  {portal === "password-reset-email-sent" ? (
                    <div className="login-form__forgot-password__header">
                      <h5 className="upp">forgot your password ?</h5>
                      <p>
                        Thank you! We've sent an email to the address you
                        provided. Please check your inbox for further
                        instructions on resetting your password.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="login-form__forgot-password__header">
                        <h5 className="upp">forgot your password ?</h5>
                        <p>
                          Please provide the email address associated with your
                          account. We'll send you a link to reset your password
                          securely. Your security is our priority, and we want
                          to make sure you can regain access to your account
                          safely and easily.
                        </p>
                      </div>
                      <div className="login-form__retrieve-email">
                        <div className="input-wrapper">
                          <label
                            htmlFor="retrieve-email"
                            className={`cap${
                              inputStates["retrieveEmail"].isFocused ||
                              inputStates["retrieveEmail"].value !== ""
                                ? " isFocused"
                                : ""
                            }`}
                          >
                            \email address
                          </label>
                          <div>
                            <input
                              type="email"
                              id="retrieve-email"
                              value={inputStates.retrieveEmail.value}
                              placeholder="SillyPancake42@"
                              autoComplete="off"
                              maxLength="30"
                              onFocus={() => handleFocus("retrieveEmail")}
                              onBlur={() => handleBlur("retrieveEmail")}
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  "retrieveEmail",
                                  inputStates.retrieveEmail.type,
                                  setInputStates
                                )
                              }
                            />
                          </div>
                          <p
                            className={
                              inputStates.retrieveEmail.hasError
                                ? "hasError"
                                : "valid"
                            }
                          >
                            {inputStates.retrieveEmail.hasError}
                          </p>
                        </div>
                      </div>
                      <div className="button__wrapper">
                        <button
                          className="retrieve-email__button-dark"
                          tabIndex="-1"
                        >
                          send
                        </button>
                        <div></div>
                      </div>
                    </>
                  )}
                  <div
                    className="login-form__return"
                    onClick={() => setPortal("login")}
                  >
                    <p>Back to Login Form</p>
                  </div>
                </form>
              )}
            </div>
          )}
          <div className="access-portal__create-account">
            {portal !== "create-account" ? (
              <div className="access-portal__create-account__wrapper">
                <div className="access-portal__create-account__header">
                  <h5 className="upp">new around here ?</h5>
                  <p>
                    Enjoy personalized recommendations, faster checkout
                    processes, exclusive offers, and seamless access to your
                    order history.
                  </p>
                </div>
                <div className="button__wrapper">
                  <button
                    className="login-form__button-light"
                    onClick={() => setPortal("create-account")}
                  >
                    create an account
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSignUp}
                className="create-account-form"
                noValidate
              >
                <div
                  className="create-account-form__return"
                  onClick={() => setPortal("login")}
                >
                  <p className="cap return-link">back to login form</p>
                </div>
                <div className="zig-zag-line"></div>
                <div className="login-info">
                  <div className="login-info__header">
                    <h5 className="upp">login information</h5>
                  </div>
                  <div className="create-account-form__email">
                    <div className="input-wrapper">
                      <label
                        htmlFor="createEmail"
                        className={`cap${
                          inputStates["createEmail"].isFocused ||
                          inputStates["createEmail"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \email
                      </label>
                      <div>
                        <input
                          type="email"
                          id="createEmail"
                          value={inputStates.createEmail.value}
                          placeholder="bogue@email.com"
                          autoComplete="off"
                          onFocus={() => handleFocus("createEmail")}
                          onBlur={() => handleBlur("createEmail")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "createEmail",
                              inputStates.createEmail.type,
                              setInputStates
                            )
                          }
                        />
                      </div>
                      <p
                        className={
                          inputStates.createEmail.hasError
                            ? "hasError"
                            : "valid"
                        }
                      >
                        {inputStates.createEmail.hasError}
                      </p>
                    </div>
                  </div>
                  <div className="create-account-form__password">
                    <div className="input-wrapper">
                      <label
                        htmlFor="createPassword"
                        className={`cap${
                          inputStates["createPassword"].isFocused ||
                          inputStates["createPassword"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \create a password
                      </label>
                      <div className="__container">
                        <input
                          type={`${
                            inputStates.createPassword.isVisible
                              ? "text"
                              : "password"
                          }`}
                          id="createPassword"
                          value={inputStates.createPassword.value}
                          placeholder="SillyPancake42@"
                          autoComplete="off"
                          onFocus={() => handleFocus("createPassword")}
                          onBlur={() => handleBlur("createPassword")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "createPassword",
                              inputStates.createPassword.type,
                              setInputStates
                            )
                          }
                          maxLength="25"
                        />
                        <span
                          onClick={() => {
                            setInputStates({
                              ...inputStates,
                              createPassword: {
                                ...inputStates.createPassword,
                                isVisible:
                                  !inputStates.createPassword.isVisible,
                              },
                            });
                          }}
                        >
                          {inputStates["createPassword"].isVisible ? (
                            <PiEye />
                          ) : (
                            <PiEyeClosed />
                          )}
                        </span>
                      </div>
                      <p className="create-pw-field">
                        <span
                          className={
                            inputStates.createPassword.hasError.includes(
                              "length"
                            )
                              ? "hasError"
                              : "valid"
                          }
                        >
                          At least 6 characters
                        </span>
                        <span
                          className={
                            inputStates.createPassword.hasError.includes(
                              "lowercase"
                            )
                              ? "hasError"
                              : "valid"
                          }
                        >
                          1 lowercase letter
                        </span>
                        <span
                          className={
                            inputStates.createPassword.hasError.includes(
                              "uppercase"
                            )
                              ? "hasError"
                              : "valid"
                          }
                        >
                          1 uppercase letter
                        </span>
                        <span
                          className={
                            inputStates.createPassword.hasError.includes(
                              "digit"
                            )
                              ? "hasError"
                              : "valid"
                          }
                        >
                          1 digit
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="personal-info">
                  <div className="personal-info__header">
                    <h5 className="upp">personal information</h5>
                  </div>
                  <div className="create-account-form__first-name">
                    <div className="input-wrapper">
                      <label
                        htmlFor="firstName"
                        className={`cap${
                          inputStates["firstName"].isFocused ||
                          inputStates["firstName"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \first name
                      </label>
                      <div>
                        <input
                          type="text"
                          id="firstName"
                          value={inputStates.firstName.value}
                          autoComplete="off"
                          onFocus={() => handleFocus("firstName")}
                          onBlur={() => handleBlur("firstName")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "firstName",
                              inputStates.firstName.type,
                              setInputStates
                            )
                          }
                        />
                      </div>
                      <p
                        className={
                          inputStates.firstName.hasError ? "hasError" : "valid"
                        }
                      >
                        {inputStates.firstName.hasError}
                      </p>
                    </div>
                  </div>
                  <div className="create-account-form__last-name">
                    <div className="input-wrapper">
                      <label
                        htmlFor="lastName"
                        className={`cap${
                          inputStates["lastName"].isFocused ||
                          inputStates["lastName"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \last name
                      </label>
                      <div>
                        <input
                          type="text"
                          id="lastName"
                          value={inputStates.lastName.value}
                          autoComplete="off"
                          onFocus={() => handleFocus("lastName")}
                          onBlur={() => handleBlur("lastName")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "lastName",
                              inputStates.lastName.type,
                              setInputStates
                            )
                          }
                        />
                      </div>
                      <p
                        className={
                          inputStates.lastName.hasError ? "hasError" : "valid"
                        }
                      >
                        {inputStates.lastName.hasError}
                      </p>
                    </div>
                  </div>
                  <div className="create-account-form__phone">
                    <div className="input-wrapper">
                      <label
                        htmlFor="phoneNumber"
                        className={`cap${
                          inputStates["phoneNumber"].isFocused ||
                          inputStates["phoneNumber"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \phone number
                      </label>
                      <div className="__container">
                        <span>+1</span>
                        <input
                          type="tel"
                          id="phoneNumber"
                          value={inputStates.phoneNumber.value}
                          autoComplete="off"
                          onBlur={() => handleBlur("phoneNumber")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "phoneNumber",
                              inputStates.phoneNumber.type,
                              setInputStates,
                            )
                          }
                        />
                      </div>
                      <p
                        className={
                          inputStates.phoneNumber.hasError
                            ? "hasError"
                            : "valid"
                        }
                      >
                        {inputStates.phoneNumber.hasError}
                      </p>
                    </div>
                  </div>
                  <div className="create-account-form__date-of-birth">
                    <div className="input-wrapper">
                      <label
                        htmlFor="dateOfBirth"
                        className={`cap${
                          inputStates["dateOfBirth"].isFocused ||
                          inputStates["dateOfBirth"].value !== ""
                            ? " isFocused"
                            : ""
                        }`}
                      >
                        \date of birth
                      </label>
                      <div>
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={inputStates.dateOfBirth.value}
                          autoComplete="off"
                          onBlur={() => handleBlur("dateOfBirth")}
                          onChange={(event) =>
                            handleChange(
                              event,
                              "dateOfBirth",
                              inputStates.dateOfBirth.type,
                              setInputStates
                            )
                          }
                          max="9999-12-31"
                        />
                      </div>
                      <p
                        className={
                          inputStates.dateOfBirth.hasError
                            ? "hasError"
                            : "valid"
                        }
                      >
                        {inputStates.dateOfBirth.hasError}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="create-account-form__tos">
                  <div className="checkbox">
                    <label
                      className={`checkbox-label${
                        inputStates.tosCheckbox.isChecked ? " isChecked" : ""
                      }`}
                    >
                      <span className="box">
                        <input
                          type="checkbox"
                          id="tosCheckbox"
                          value={inputStates.tosCheckbox.isChecked}
                          checked={inputStates.tosCheckbox.isChecked}
                          onChange={() => {
                            setInputStates((prevState) => ({
                              ...prevState,
                              tosCheckbox: {
                                isChecked: !prevState.tosCheckbox.isChecked,
                              },
                            }));
                          }}
                        />
                        <span className="icon">
                          {inputStates.tosCheckbox.isChecked ? (
                            <GrFormCheckmark />
                          ) : (
                            ""
                          )}
                        </span>
                      </span>
                      <p ref={pRef}>
                        I've read the privacy policy and agree to the use of my
                        personal data to create my account.
                      </p>
                    </label>
                  </div>
                </div>
                <div className="button__wrapper create-account-form__btn__wrapper">
                  <button
                    className="create-account-form__button-dark"
                    tabIndex="-1"
                  >
                    create account
                  </button>
                </div>
                <p className="disclaimer">
                  Disclaimer: By clicking 'Create Account,' you confirm reading
                  our <span className="privacy-policy">Privacy Statement</span>{" "}
                  and consent to Bogue processing your personal data for account
                  management and client relations. Your data may be shared
                  globally with Bogue entities. You have the right to access,
                  correct, and delete your data, and opt-out of personalized
                  communications, as detailed in our{" "}
                  <span className="privacy-policy">Privacy Statement</span>.
                </p>
                {/* <div
                  className="create-account-form__return"
                  onClick={() => setPortal("login")}
                >
                  <p className="cap return-link">back to login form</p>
                </div> */}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AccessPortal;
