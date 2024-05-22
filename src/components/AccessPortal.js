import React, { useState } from "react";
import { GrFormCheckmark } from "react-icons/gr";

function AccessPortal({ defaultPortal = "login" }) {
  const [inputStates, setInputStates] = useState({
    password: { isFocused: false, text: "" },
    email: { isFocused: false, text: "" },
    retrieveEmail: { isFocused: false, text: "" },
    createPassword: { isFocused: false, text: "" },
    createEmail: { isFocused: false, text: "" },
    firstName: { isFocused: false, text: "" },
    lastName: { isFocused: false, text: "" },
    phoneNumber: { isFocused: true, text: "" },
    dateOfBirth: { isFocused: true, text: "" },
    tosCheckbox: { isChecked: false },
  });

  const [portal, setPortal] = useState(defaultPortal);

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
    setInputStates({
      ...inputStates,
      [inputID]: {
        ...inputStates[inputID],
        isFocused: false,
      },
    });
  };

  const handleChange = (event, inputID) => {
    setInputStates({
      ...inputStates,
      [inputID]: {
        ...inputStates[inputID],
        text: event.target.value,
      },
    });
  };

  return (
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
          <form className="login-form">
            {portal !== "forgot-password" ? (
              <>
                <div className="login-form__email">
                  <div className="input-wrapper">
                    <label
                      htmlFor="email"
                      className={`cap${
                        inputStates["email"].isFocused ||
                        inputStates["email"].text !== ""
                          ? " isFocused"
                          : ""
                      }`}
                    >
                      \email
                    </label>
                    <div>
                      <input
                        type="email"
                        id="email"
                        placeholder="bogue@email.com"
                        autoComplete="off"
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        onChange={(event) => handleChange(event, "email")}
                      />
                    </div>
                    <p></p>
                  </div>
                </div>
                <div className="login-form__password">
                  <div className="input-wrapper">
                    <label
                      htmlFor="password"
                      className={`cap${
                        inputStates["password"].isFocused ||
                        inputStates["password"].text !== ""
                          ? " isFocused"
                          : ""
                      }`}
                    >
                      \password
                    </label>
                    <div>
                      <input
                        type="password"
                        id="password"
                        placeholder="SillyPancake42@"
                        autoComplete="off"
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password")}
                        onChange={(event) => handleChange(event, "password")}
                      />
                    </div>
                    <p></p>
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
              </>
            ) : (
              <>
                <div className="login-form__forgot-password__header">
                  <h5 className="upp">forgot your password ?</h5>
                  <p>
                    Please provide the email address associated with your
                    account. We'll send you a link to reset your password
                    securely. Your security is our priority, and we want to make
                    sure you can regain access to your account safely and
                    easily.
                  </p>
                </div>
                <div className="login-form__retrieve-email">
                  <div className="input-wrapper">
                    <label
                      htmlFor="retrieve-email"
                      className={`cap${
                        inputStates["retrieveEmail"].isFocused ||
                        inputStates["retrieveEmail"].text !== ""
                          ? " isFocused"
                          : ""
                      }`}
                    >
                      \email address
                    </label>
                    <div>
                      <input
                        type="retrieve-email"
                        id="retrieve-email"
                        placeholder="SillyPancake42@"
                        autoComplete="off"
                        onFocus={() => handleFocus("retrieveEmail")}
                        onBlur={() => handleBlur("retrieveEmail")}
                        onChange={(event) =>
                          handleChange(event, "retrieve-email")
                        }
                      />
                    </div>
                    <p></p>
                  </div>
                </div>
                <div className="button__wrapper">
                  <button className="retrieve-email__button-dark" tabIndex="-1">
                    send
                  </button>
                  <div></div>
                </div>
                <div
                  className="login-form__return"
                  onClick={() => setPortal("login")}
                >
                  <p>Back to Login Form</p>
                </div>
              </>
            )}
          </form>
        </div>
      )}
      <div className="access-portal__create-account">
        {portal !== "create-account" ? (
          <>
            <div className="access-portal__create-account__header">
              <h5 className="upp">new around here ?</h5>
              <p>
                Enjoy personalized recommendations, faster checkout processes,
                exclusive offers, and seamless access to your order history.
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
          </>
        ) : (
          <form className="create-account-form">
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
                      inputStates["createEmail"].text !== ""
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
                      placeholder="bogue@email.com"
                      autoComplete="off"
                      onFocus={() => handleFocus("createEmail")}
                      onBlur={() => handleBlur("createEmail")}
                      onChange={(event) => handleChange(event, "createEmail")}
                    />
                  </div>
                  <p></p>
                </div>
              </div>
              <div className="create-account-form__password">
                <div className="input-wrapper">
                  <label
                    htmlFor="createPassword"
                    className={`cap${
                      inputStates["createPassword"].isFocused ||
                      inputStates["createPassword"].text !== ""
                        ? " isFocused"
                        : ""
                    }`}
                  >
                    \create a password
                  </label>
                  <div>
                    <input
                      type="password"
                      id="createPassword"
                      placeholder="SillyPancake42@"
                      autoComplete="off"
                      onFocus={() => handleFocus("createPassword")}
                      onBlur={() => handleBlur("createPassword")}
                      onChange={(event) =>
                        handleChange(event, "createPassword")
                      }
                    />
                  </div>
                  <p></p>
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
                      inputStates["firstName"].text !== ""
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
                      autoComplete="off"
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => handleBlur("firstName")}
                      onChange={(event) => handleChange(event, "firstName")}
                    />
                  </div>
                  <p></p>
                </div>
              </div>
              <div className="create-account-form__last-name">
                <div className="input-wrapper">
                  <label
                    htmlFor="lastName"
                    className={`cap${
                      inputStates["lastName"].isFocused ||
                      inputStates["lastName"].text !== ""
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
                      autoComplete="off"
                      onFocus={() => handleFocus("lastName")}
                      onBlur={() => handleBlur("lastName")}
                      onChange={(event) => handleChange(event, "lastName")}
                    />
                  </div>
                  <p></p>
                </div>
              </div>
              <div className="create-account-form__phone">
                <div className="input-wrapper">
                  <label
                    htmlFor="phoneNumber"
                    className={`cap${
                      inputStates["phoneNumber"].isFocused ||
                      inputStates["phoneNumber"].text !== ""
                        ? " isFocused"
                        : ""
                    }`}
                  >
                    \phone number
                  </label>
                  <div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      autoComplete="off"
                      value="+1"
                      onChange={(event) => handleChange(event, "phoneNumber")}
                    />
                  </div>
                  <p></p>
                </div>
              </div>
              <div className="create-account-form__date-of-birth">
                <div className="input-wrapper">
                  <label
                    htmlFor="dateOfBirth"
                    className={`cap${
                      inputStates["dateOfBirth"].isFocused ||
                      inputStates["dateOfBirth"].text !== ""
                        ? " isFocused"
                        : ""
                    }`}
                  >
                    \date of birth
                  </label>
                  <div>
                    <input type="date" id="dateOfBirth" autoComplete="off" />
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="create-account-form__tos">
              <div
                className="checkbox"
                onClick={() => {
                  setInputStates({
                    ...inputStates,
                    ["tosCheckbox"]: {
                      isChecked: !(inputStates["tosCheckbox"].isChecked),
                    },
                  });
                }}
              >
                <label
                  className={`checkbox-label${
                    inputStates["tosCheckbox"].isChecked ? " isChecked" : ""
                  }`}
                >
                  <span className="box">
                    <input type="checkbox" id="tosCheckbox" />
                    <span className="icon">
                      {inputStates["tosCheckbox"].isChecked ? (
                        <GrFormCheckmark />
                      ) : (
                        ""
                      )}
                    </span>
                  </span>
                  <p>
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
              <div></div>
            </div>
            <div
              className="create-account-form__return"
              onClick={() => setPortal("login")}
            >
              <p className="cap">back to login form</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AccessPortal;
