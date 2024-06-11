import React, { useEffect, useState } from "react";

//components
import Notice from "../components/Notice";
import Header from "../layout/Header";

//layout
import AdressBook from "../layout/AdressBook";
import PaymentMethods from "../layout/PaymentMethods";

import accountEditStates from "../json/accountEditStates.json";
import { formatPhone, handleChange } from "../functions/handleChange";
import {
  handleUpdateEmail,
  handleUpdateIdentity,
  handleUpdateLogin,
  handleUpdatePassword,
} from "../functions/authenticationFunctions";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//svg
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { PiPencilSimpleLineLight, PiPencilSimpleSlashLight } from "react-icons/pi";
import { GrClose } from "react-icons/gr";

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

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const componentsLoading = useSelector(
    (state) => state.auth.loadingComponents
  );

  const [editStates, setEditStates] = useState(accountEditStates);
  const [editOutcome, setEditOutcome] = useState({
    type: "",
    state: "",
    message: "",
  });

  const handleOnLoadLoginStates = () => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      editEmail: {
        ...prevEditStates.editEmail,
        value: user.email,
        hasError: "",
      },
      editPassword: {
        ...prevEditStates.editPassword,
        value: "",
        hasError: "",
      },
      editConfirmPassword: {
        ...prevEditStates.editConfirmPassword,
        value: "",
        hasError: "",
      },
    }));
  };

  const handleOnLoadPersonalStates = () => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      editFirstName: {
        ...prevEditStates.editFirstName,
        value: user.user_metadata.first_name,
        hasError: "",
      },
      editLastName: {
        ...prevEditStates.editLastName,
        value: user.user_metadata.last_name,
        hasError: "",
      },
      editPhone: {
        ...prevEditStates.editPhone,
        value: formatPhone(user.user_metadata.phone_number),
        hasError: "",
      },
      editDOB: {
        ...prevEditStates.editDOB,
        value: user.user_metadata.dob,
        hasError: "",
      },
    }));
  };
  useEffect(() => {
    const handleOnLoadStates = () => {
      handleOnLoadLoginStates();
      handleOnLoadPersonalStates();
    };

    user?.identities ? handleOnLoadStates() : navigate("/access-portal");
  }, [user, componentsLoading, navigate]);

  const handleFocus = (ID) => {
    setEditStates({
      ...editStates,
      [ID]: {
        ...editStates[ID],
        isFocused: true,
      },
    });
  };

  const handleBlur = (editID) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [editID]: {
        ...prevEditStates[editID],
        isFocused: false,
        hasError:
          prevEditStates[editID].type === "create-password" &&
          prevEditStates[editID].value.length === 0
            ? []
            : prevEditStates[editID].type === "confirm-password" &&
              prevEditStates[editID].value.length === 0
            ? ""
            : prevEditStates[editID].value.length === 0
            ? "! Input field required."
            : prevEditStates[editID].hasError,
      },
    }));
  };

  const [formActive, setFormActive] = useState("");
  const handleLoginEdit = (event) => {
    event.preventDefault();

    let errors = [];
    for (const objState of Object.values(editStates)) {
      if (objState.form === "credentials") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
      }
    }

    if (
      editStates.editPassword.value === "" &&
      editStates.editConfirmPassword.value === ""
    ) {
      if (editStates.editEmail.value !== user.email) {
        if (!editStates.editEmail.hasError) {
          handleUpdateEmail(
            editStates.editEmail.value,
            setEditOutcome,
            handleLoginEditCancel,
            dispatch
          );
        }
      } else if (editStates.editEmail.value === user.email) {
        handleLoginEditCancel();
        return;
      }
    } else {
      if (!errors.length) {
        if (editStates.editEmail.value === user.email) {
          handleUpdatePassword(
            editStates.editPassword.value,
            setEditOutcome,
            setEditStates,
            handleLoginEditCancel,
            dispatch
          );
        } else if (editStates.editEmail.value !== user.email) {
          handleUpdateLogin(
            editStates.editEmail.value,
            editStates.editPassword.value,
            setEditOutcome,
            setEditStates,
            handleLoginEditCancel,
            dispatch
          );
        }
      }
    }
  };

  const handlePersonalEdit = (event) => {
    event.preventDefault();

    let errors = [];
    for (const objState of Object.values(editStates)) {
      if (objState.form === "identity") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
      }
    }
    if (!errors.length) {
      handleUpdateIdentity(
        {
          first_name: editStates.editFirstName.value,
          last_name: editStates.editLastName.value,
          dob: editStates.editDOB.value,
          phone_number: editStates.editPhone.value.replace(/[^\d]/g, ""),
        },
        setEditOutcome,
        handlePersonalEditCancel,
        dispatch
      );
    }
  };

  const handleLoginEditClick = () => {
    setEditOutcome({ type: "", state: "", message: "" });
    handleOnLoadPersonalStates();
    setFormActive("credentials");
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      editPassword: {
        ...prevEditStates.editPassword,
        value: "",
      },
    }));
  };
  const handlePersonalEditClick = () => {
    setEditOutcome({ type: "", state: "", message: "" });
    handleOnLoadLoginStates();
    setFormActive("identity");
  };
  const handleLoginEditCancel = () => {
    handleOnLoadLoginStates();
    setFormActive("");
  };
  const handlePersonalEditCancel = () => {
    handleOnLoadPersonalStates();
    setFormActive("");
  };

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
              <div className="content__profile">
                <div className="content__profile__header">
                  <h1 className="upp">manage your profile information</h1>
                  <p>
                    This section allows you to manage your personal information.
                    Keeping this information up to date ensures that your
                    account remains accurate and personalized.
                  </p>
                </div>
                <form
                  onSubmit={handleLoginEdit}
                  className={`update-profile-form credentials${
                    formActive === "credentials" ? " editing" : ""
                  }`}
                  noValidate
                >
                  <div className="login-info">
                    <div className="login-info__header">
                      <h1 className="upp">
                        <span>login information</span>
                        {formActive === "credentials" ? (
                          <span
                            className="cancel-icon"
                            onClick={() => handleLoginEditCancel()}
                          >
                            <PiPencilSimpleSlashLight />
                          </span>
                        ) : (
                          <span
                            className="edit-icon"
                            onClick={handleLoginEditClick}
                          >
                            <PiPencilSimpleLineLight />
                          </span>
                        )}
                      </h1>
                    </div>
                    {editOutcome.type === "login" ? (
                      <div className="edit-outcome">
                        <div className="__container">
                          <span className="edit-outcome__state upp">
                            {editOutcome.state}
                          </span>
                          <span
                            onClick={() =>
                              setEditOutcome({
                                type: "",
                                state: "",
                                message: "",
                              })
                            }
                          >
                            <GrClose />
                          </span>
                        </div>
                        <p>{editOutcome.message}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="login-info__wrapper">
                      <div className="update-profile-form__email">
                        <div className="input-wrapper">
                          <label htmlFor="editEmail" className="cap">
                            \email
                          </label>
                          <div>
                            <input
                              type="email"
                              id="editEmail"
                              value={editStates.editEmail.value}
                              placeholder="bogue@email.com"
                              autoComplete="off"
                              spellCheck="false"
                              onBlur={() => handleBlur("editEmail")}
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  "editEmail",
                                  editStates.editEmail.type,
                                  setEditStates
                                )
                              }
                            />
                          </div>
                          <p
                            className={
                              editStates.editEmail.hasError
                                ? "hasError"
                                : "valid"
                            }
                          >
                            {editStates.editEmail.hasError}
                          </p>
                        </div>
                      </div>
                      <div className="update-profile-form__password">
                        <div className="input-wrapper">
                          <label
                            htmlFor="editPassword"
                            className={`cap${
                              formActive !== "credentials"
                                ? " isFocused"
                                : editStates.editPassword.isFocused ||
                                  editStates.editPassword.value !== ""
                                ? " isFocused"
                                : " notFocused"
                            }`}
                          >
                            \password
                          </label>
                          <div className="__container">
                            <input
                              type={`${
                                formActive === "credentials" &&
                                editStates.editPassword.isVisible
                                  ? "text"
                                  : "password"
                              }`}
                              id="editPassword"
                              value={
                                formActive === "credentials"
                                  ? editStates.editPassword.value
                                  : "randomPasswordLol"
                              }
                              placeholder="SillyPancake42@"
                              autoComplete="off"
                              spellCheck="false"
                              onFocus={() => handleFocus("editPassword")}
                              onBlur={() => handleBlur("editPassword")}
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  "editPassword",
                                  editStates.editPassword.type,
                                  setEditStates
                                )
                              }
                              maxLength="25"
                            />
                            {formActive === "credentials" ? (
                              <span
                                onClick={() => {
                                  setEditStates({
                                    ...editStates,
                                    editPassword: {
                                      ...editStates.editPassword,
                                      isVisible:
                                        !editStates.editPassword.isVisible,
                                    },
                                  });
                                }}
                              >
                                {editStates.editPassword.isVisible ? (
                                  <PiEye />
                                ) : (
                                  <PiEyeClosed />
                                )}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          {formActive === "credentials" ? (
                            <p className="create-pw-field">
                              <span
                                className={
                                  editStates.editPassword.hasError.includes(
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
                                  editStates.editPassword.hasError.includes(
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
                                  editStates.editPassword.hasError.includes(
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
                                  editStates.editPassword.hasError.includes(
                                    "digit"
                                  )
                                    ? "hasError"
                                    : "valid"
                                }
                              >
                                1 digit
                              </span>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {formActive === "credentials" ? (
                      <div className="login-info__wrapper">
                        <div className="update-profile-form__null">
                          <div className="input-wrapper"></div>
                        </div>
                        <div className="update-profile-form__editConfirmPassword">
                          <div className="input-wrapper">
                            <label
                              htmlFor="editConfirmPassword"
                              className={`cap${
                                editStates["editConfirmPassword"].isFocused ||
                                editStates["editConfirmPassword"].value !== ""
                                  ? " isFocused"
                                  : " notFocused"
                              }`}
                            >
                              \confirm password
                            </label>
                            <div className="__container">
                              <input
                                type={`${
                                  editStates.editPassword.isVisible
                                    ? "text"
                                    : "password"
                                }`}
                                id="editConfirmPassword"
                                value={editStates.editConfirmPassword.value}
                                autoComplete="off"
                                spellCheck="false"
                                onFocus={() =>
                                  handleFocus("editConfirmPassword")
                                }
                                onBlur={() => handleBlur("editConfirmPassword")}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    "editConfirmPassword",
                                    editStates.editConfirmPassword.type,
                                    setEditStates,
                                    editStates.editPassword.value
                                  )
                                }
                                maxLength="25"
                              />
                              <span
                                onClick={() => {
                                  setEditStates({
                                    ...editStates,
                                    editPassword: {
                                      ...editStates.editPassword,
                                      isVisible:
                                        !editStates.editPassword.isVisible,
                                    },
                                  });
                                }}
                              >
                                {editStates.editPassword.isVisible ? (
                                  <PiEye />
                                ) : (
                                  <PiEyeClosed />
                                )}
                              </span>
                            </div>
                            <p
                              className={
                                editStates.editConfirmPassword.hasError
                                  ? "hasError"
                                  : "valid"
                              }
                            >
                              {editStates.editConfirmPassword.hasError}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="credentials__button__wrapper">
                    {formActive === "credentials" ? (
                      <>
                        <button
                          type="submit"
                          className="credentials__button-dark"
                        >
                          Update
                        </button>
                        <p
                          className="cancel-edit cap"
                          onClick={() => handleLoginEditCancel()}
                        >
                          Cancel
                        </p>
                      </>
                    ) : (
                      <div
                        className="credentials__button-light"
                        onClick={handleLoginEditClick}
                      >
                        Edit
                      </div>
                    )}
                  </div>
                </form>
                <form
                  onSubmit={handlePersonalEdit}
                  className={`update-profile-form credentials${
                    formActive === "identity" ? " editing" : ""
                  }`}
                  noValidate
                >
                  <div className="personal-info">
                    <div className="personal-info__header">
                      <h1 className="upp">
                        <span>personal information</span>
                        {formActive === "identity" ? (
                          <span
                            className="cancel-icon"
                            onClick={() => handlePersonalEditCancel()}
                          >
                            <PiPencilSimpleSlashLight />
                          </span>
                        ) : (
                          <span
                            className="edit-icon"
                            onClick={() => handlePersonalEditClick()}
                          >
                            <PiPencilSimpleLineLight />
                          </span>
                        )}
                      </h1>
                    </div>
                    {editOutcome.type === "personal" ? (
                      <div className="edit-outcome">
                        <div className="__container">
                          <span className="edit-outcome__state upp">
                            {editOutcome.state}
                          </span>
                          <span
                            onClick={() =>
                              setEditOutcome({
                                type: "",
                                state: "",
                                message: "",
                              })
                            }
                          >
                            <GrClose />
                          </span>
                        </div>
                        <p>{editOutcome.message}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {!componentsLoading.includes("update-identity") ? (
                      <>
                        <div className="update-profile-form__first-name">
                          <div className="input-wrapper">
                            <label htmlFor="editFirstName" className="cap">
                              \first name
                            </label>
                            <div>
                              <input
                                type="text"
                                id="editFirstName"
                                value={editStates.editFirstName.value}
                                maxLength="30"
                                autoComplete="off"
                                spellCheck="false"
                                onBlur={() => handleBlur("editFirstName")}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    "editFirstName",
                                    editStates.editFirstName.type,
                                    setEditStates
                                  )
                                }
                              />
                            </div>
                            <p
                              className={
                                editStates.editFirstName.hasError
                                  ? "hasError"
                                  : "valid"
                              }
                            >
                              {editStates.editFirstName.hasError}
                            </p>
                          </div>
                        </div>
                        <div className="update-profile-form__last-name">
                          <div className="input-wrapper">
                            <label htmlFor="editLastName" className="cap">
                              \last name
                            </label>
                            <div>
                              <input
                                type="text"
                                id="editLastName"
                                value={editStates.editLastName.value}
                                maxLength="30"
                                autoComplete="off"
                                spellCheck="false"
                                onBlur={() => handleBlur("editLastName")}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    "editLastName",
                                    editStates.editLastName.type,
                                    setEditStates
                                  )
                                }
                              />
                            </div>
                            <p
                              className={
                                editStates.editLastName.hasError
                                  ? "hasError"
                                  : "valid"
                              }
                            >
                              {editStates.editLastName.hasError}
                            </p>
                          </div>
                        </div>
                        <div className="update-profile-form__phone">
                          <div className="input-wrapper">
                            <label htmlFor="editPhone" className="cap">
                              \phone number
                            </label>
                            <div className="__container">
                              <span>+1</span>
                              <input
                                type="tel"
                                id="editPhone"
                                value={editStates.editPhone.value}
                                autoComplete="off"
                                onBlur={() => handleBlur("editPhone")}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    "editPhone",
                                    editStates.editPhone.type,
                                    setEditStates
                                  )
                                }
                              />
                            </div>
                            <p
                              className={
                                editStates.editPhone.hasError
                                  ? "hasError"
                                  : "valid"
                              }
                            >
                              {editStates.editPhone.hasError}
                            </p>
                          </div>
                        </div>
                        <div className="update-profile-form__date-of-birth">
                          <div className="input-wrapper">
                            <label htmlFor="editDOB" className="cap">
                              \date of birth
                            </label>
                            <div>
                              <input
                                type="date"
                                id="editDOB"
                                value={editStates.editDOB.value}
                                autoComplete="off"
                                onBlur={() => handleBlur("editDOB")}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    "editDOB",
                                    editStates.editDOB.type,
                                    setEditStates
                                  )
                                }
                                max="9999-12-31"
                              />
                            </div>
                            <p
                              className={
                                editStates.editDOB.hasError
                                  ? "hasError"
                                  : "valid"
                              }
                            >
                              {editStates.editDOB.hasError}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      "Loading"
                    )}
                    <p className="disclaimer">
                      Disclaimer: Bogue assumes full responsibility for the
                      management and protection of your personal information. We
                      utilize the details you provide with utmost discretion and
                      integrity, primarily for critical business operations
                      including account creation, meticulous invoice management,
                      and timely delivery services. Should you have any
                      inquiries or require clarification regarding the
                      processing of your personal data, we encourage you to
                      consult our comprehensive{" "}
                      <span className="privacy-policy">privacy policy</span>. At
                      Bogue, we prioritize the privacy and security of your
                      data, adhering strictly to industry standards and
                      regulations to maintain your trust and confidence in our
                      business practices.
                    </p>
                  </div>
                  <div className="identity__button__wrapper">
                    {formActive === "identity" ? (
                      <>
                        <button className="identity__button-dark">
                          Update
                        </button>
                        <p
                          className="cancel-edit cap"
                          onClick={() => handlePersonalEditCancel()}
                        >
                          Cancel
                        </p>
                      </>
                    ) : (
                      <div
                        className="identity__button-light"
                        onClick={() => handlePersonalEditClick()}
                      >
                        Edit
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
            {toggle === "address-book" && (
              <div className="content__address-book">
                <div className="content__address-book__header">
                  <h1 className="upp">Shipping and Billing Addresses</h1>
                  <p>
                    In the address book, you can store multiple shipping and
                    billing addresses. This feature is particularly handy for
                    users who frequently ship items to different locations, such
                    as home, work, or friends' addresses. You can add, edit, or
                    delete addresses as needed, making the checkout process
                    smoother and more convenient.
                  </p>
                </div>
                <AdressBook userID={user?.id}/>
              </div>
            )}
            {toggle === "payment-methods" && (
              <div className="content__payment-methods">
                <div className="content__payment-methods__header">
                  <h1 className="upp">credit and debit cards</h1>
                  <p>
                    Here, you can control the various payment methods associated
                    with your account. This includes adding new credit or debit
                    cards, editing existing ones, and removing outdated or
                    unused payment options. Keeping your payment methods updated
                    ensures that you can easily make purchases without any
                    hassles.
                  </p>
                </div>
                <PaymentMethods userID={user?.id}/>
              </div>
            )}
            {toggle === "orders" && (
              <div className="content__orders">
                <div className="content__orders__header">
                  <h1 className="upp">view your order history</h1>
                  <p>
                    The orders section provides a comprehensive overview of your
                    purchase history. You can track the status of current
                    orders, view details of past purchases, and manage any
                    returns or cancellations. This feature gives you full
                    visibility into your shopping activity and allows you to
                    easily reference previous transactions.
                  </p>
                </div>
              </div>
            )}
            {toggle === "wishlist" && (
              <div className="content__wishlist">
                <div className="content__wishlist__header">
                  <h1 className="upp">save items for later</h1>
                  <p>
                    The wishlist feature allows you to save items that you're
                    interested in purchasing in the future. You can add products
                    to your wishlist while browsing the site, making it easy to
                    keep track of items you want to buy later.
                  </p>
                </div>
              </div>
            )}
            {toggle === "account-settings" && (
              <div className="content__account-settings">
                <div className="content__wishlist__header">
                  <h1 className="upp">customize your account</h1>
                  <p>
                    In the settings section, you can customize various aspects
                    of your account to suit your preferences. Personalizing your
                    account settings ensures that your experience on the
                    platform aligns with your individual needs and preferences.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
