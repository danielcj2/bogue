import React, { useRef, useState } from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { supabase } from "../utils/supabaseClient";

function AccessPortal({ defaultPortal = "login" }) {
  const [inputStates, setInputStates] = useState({
    password: {
      id: "password",
      isFocused: false,
      value: "",
      isVisible: false,
      hasError: "",
      type: "password",
    },
    email: {
      id: "email",
      isFocused: false,
      value: "",
      hasError: "",
      type: "email",
    },
    retrieveEmail: {
      id: "retrieveEmail",
      isFocused: false,
      value: "",
      hasError: "",
      type: "email",
    },
    createPassword: {
      id: "createPassword",
      isFocused: false,
      value: "",
      isVisible: false,
      hasError: [],
      type: "create-password",
      form: "create",
    },
    createEmail: {
      id: "createEmail",
      isFocused: false,
      value: "",
      hasError: "",
      type: "email",
      form: "create",
    },
    firstName: {
      id: "firstName",
      isFocused: false,
      value: "",
      hasError: "",
      type: "name",
      form: "create",
    },
    lastName: {
      id: "lastName",
      isFocused: false,
      value: "",
      hasError: "",
      type: "name",
      form: "create",
    },
    phoneNumber: {
      id: "phoneNumber",
      isFocused: true,
      value: "",
      hasError: "",
      type: "phone",
      form: "create",
    },
    dateOfBirth: {
      id: "dateOfBirth",
      isFocused: true,
      value: "",
      hasError: "",
      type: "date",
      form: "create",
    },
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

  const pRef = useRef(null);
  const handleCreateAccount = (event) => {
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
      insertUser({
        email_address: inputStates.createEmail.value,
        password: inputStates.createPassword.value,
        first_name: inputStates.firstName.value,
        last_name: inputStates.lastName.value,
        phone_number: inputStates.phoneNumber.value,
        dob: inputStates.dateOfBirth.value,
      });
      alert("inserted");
    }
  };

  const insertUser = async (userData) => {
    try {
      const { data, error } = await supabase.from("users").insert([userData]);

      if (error) {
        throw error;
      }

      // return data;
    } catch (error) {
      console.error("Error inserting user:", error.message);
      throw error;
    }
  };

  const updateInputState = (inputID, value, validationFunction) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [inputID]: {
        ...prevInputStates[inputID],
        value: value,
        hasError: validationFunction(value),
      },
    }));
  };

  const validateName = (name) => {
    if (!/^[a-z]+$/i.test(name)) {
      return "! Please enter a valid name.";
    }
  };

  const validatePassword = (pw) => {
    let errors = [];

    if (pw.length < 7) {
      errors.push("length");
    }

    if (!/[a-z]/.test(pw)) {
      errors.push("lowercase");
    }

    if (!/[A-Z]/.test(pw)) {
      errors.push("uppercase");
    }

    if (!/\d/.test(pw)) {
      errors.push("digit");
    }

    return errors;
  };

  const validateEmail = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return "! Please enter a valid email address.";
    }
  };

  const validatePhone = (phone) => {
    if (phone.length < 10) {
      return "! Please enter a valid phone number.";
    }
  };

  const validateDate = (date) => {
    let cleanDate = date.replace(/-/g, "");

    if (cleanDate.length !== 8) {
      return "! Date must be 8 digits (MMDDYYYY)";
    }

    //extract year, month, day
    let year = parseInt(cleanDate.substring(0, 4));
    const month = parseInt(cleanDate.substring(4, 6)) - 1;
    const day = parseInt(cleanDate.substring(6, 8));

    const dateInput = new Date(year, month, day);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 14);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 85);

    if (dateInput < maxDate) {
      return "! You're not that old pal. Please provide a valid DOB.";
    }

    if (dateInput > minDate) {
      return "! Please provide a valid DOB.";
    }
  };

  const handleChange = (event, inputID, phone = false) => {
    const { value } = event.target;

    let formattedValue = value;

    //format Phone Number (###) ### - ####
    if (phone) {
      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");

      if (!numericValue.length) {
        formattedValue = "";
      } else if (numericValue.length <= 3) {
        formattedValue = `(${numericValue}`;
      } else if (numericValue.length <= 6) {
        formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(
          3
        )}`;
      } else {
        formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(
          3,
          6
        )} - ${numericValue.slice(6, 10)}`;
      }

      // Set the input field's value to the formatted value
      if (event.target.value !== formattedValue) {
        event.target.value = formattedValue;
      }
    }

    switch (inputStates[inputID].type) {
      case "email":
        updateInputState(inputID, formattedValue, validateEmail);
        break;
      case "create-password":
        updateInputState(inputID, formattedValue, validatePassword);
        break;
      case "password":
        break;
      case "name":
        updateInputState(inputID, formattedValue, validateName);
        break;
      case "phone":
        updateInputState(inputID, formattedValue, validatePhone);
        break;
      case "date":
        updateInputState(inputID, formattedValue, validateDate);
        break;
      default:
        break;
    }
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
                        inputStates["email"].value !== ""
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
                        value={inputStates.email.value}
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
                        onChange={(event) => handleChange(event, "password")}
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
                        inputStates["retrieveEmail"].value !== ""
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
                        value={inputStates.retrieveEmail.value}
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
          <form onSubmit={handleCreateAccount} className="create-account-form">
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
                      onChange={(event) => handleChange(event, "createEmail")}
                    />
                  </div>
                  <p
                    className={
                      inputStates.createEmail.hasError ? "hasError" : "valid"
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
                        handleChange(event, "createPassword")
                      }
                      maxLength="20"
                    />
                    <span
                      onClick={() => {
                        setInputStates({
                          ...inputStates,
                          createPassword: {
                            ...inputStates.createPassword,
                            isVisible: !inputStates.createPassword.isVisible,
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
                        inputStates.createPassword.hasError.includes("length")
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
                        inputStates.createPassword.hasError.includes("digit")
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
                      onChange={(event) => handleChange(event, "firstName")}
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
                      onChange={(event) => handleChange(event, "lastName")}
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
                        handleChange(event, "phoneNumber", true)
                      }
                    />
                  </div>
                  <p
                    className={
                      inputStates.phoneNumber.hasError ? "hasError" : "valid"
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
                      onChange={(event) => handleChange(event, "dateOfBirth")}
                      max="9999-12-31"
                    />
                  </div>
                  <p
                    className={
                      inputStates.dateOfBirth.hasError ? "hasError" : "valid"
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
