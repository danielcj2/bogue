import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputWrapper from "../components/InputWrapper";

import { PiEye, PiEyeClosed } from "react-icons/pi";
import {
  PiPencilSimpleLineLight,
  PiPencilSimpleSlashLight,
} from "react-icons/pi";
import { GrClose } from "react-icons/gr";

import { formatPhone, handleChange } from "../functions/handleChange";
import {
  handleUpdateEmail,
  handleUpdateIdentity,
  handleUpdateLogin,
  handleUpdatePassword,
} from "../functions/authenticationFunctions";

import accountEditStates from "../json/accountEditStates.json";

const Profile = () => {
  const dispatch = useDispatch();

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
        value: user?.email,
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
        value: user?.user_metadata.first_name,
        hasError: "",
      },
      editLastName: {
        ...prevEditStates.editLastName,
        value: user?.user_metadata.last_name,
        hasError: "",
      },
      editPhone: {
        ...prevEditStates.editPhone,
        value: formatPhone(user?.user_metadata.phone_number),
        hasError: "",
      },
      editDOB: {
        ...prevEditStates.editDOB,
        value: user?.user_metadata.dob,
        hasError: "",
      },
    }));
  };

  const user = useSelector((state) => state.auth.user);
  const componentsLoading = useSelector(
    (state) => state.auth.loadingComponents
  );
  useEffect(() => {
    const handleOnLoadStates = () => {
      handleOnLoadLoginStates();
      handleOnLoadPersonalStates();
    };

    handleOnLoadStates();
  }, [user, componentsLoading]);

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
        isFocused: prevEditStates[editID].type === "phone" ? true : false,
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
                <span className="edit-icon" onClick={handleLoginEditClick}>
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
              <InputWrapper state={editStates.editEmail} text="\email">
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
              </InputWrapper>
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
                            isVisible: !editStates.editPassword.isVisible,
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
                        editStates.editPassword.hasError.includes("length")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      At least 6 characters
                    </span>
                    <span
                      className={
                        editStates.editPassword.hasError.includes("lowercase")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      1 lowercase letter
                    </span>
                    <span
                      className={
                        editStates.editPassword.hasError.includes("uppercase")
                          ? "hasError"
                          : "valid"
                      }
                    >
                      1 uppercase letter
                    </span>
                    <span
                      className={
                        editStates.editPassword.hasError.includes("digit")
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
                <InputWrapper state={null}></InputWrapper>
              </div>
              <div className="update-profile-form__editConfirmPassword">
                <InputWrapper
                  state={editStates.editConfirmPassword}
                  text="\confirm password"
                >
                  <input
                    type={`${
                      editStates.editPassword.isVisible ? "text" : "password"
                    }`}
                    id="editConfirmPassword"
                    value={editStates.editConfirmPassword.value}
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("editConfirmPassword")}
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
                          isVisible: !editStates.editPassword.isVisible,
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
                </InputWrapper>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="credentials__button__wrapper">
          {formActive === "credentials" ? (
            <>
              <button type="submit" className="credentials__button-dark">
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
                <InputWrapper
                  state={editStates.editFirstName}
                  text="\first name"
                >
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
                </InputWrapper>
              </div>
              <div className="update-profile-form__last-name">
                <InputWrapper state={editStates.editLastName} text="\last name">
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
                </InputWrapper>
              </div>
              <div className="update-profile-form__phone">
                <InputWrapper state={editStates.editPhone} text="\phone number">
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
                </InputWrapper>
              </div>
              <div className="update-profile-form__date-of-birth">
                <InputWrapper state={editStates.editDOB} text="\date of birth">
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
                </InputWrapper>
              </div>
            </>
          ) : (
            "Loading"
          )}
          <p className="disclaimer">
            Disclaimer: Bogue assumes full responsibility for the management and
            protection of your personal information. We utilize the details you
            provide with utmost discretion and integrity, primarily for critical
            business operations including account creation, meticulous invoice
            management, and timely delivery services. Should you have any
            inquiries or require clarification regarding the processing of your
            personal data, we encourage you to consult our comprehensive{" "}
            <span className="privacy-policy">privacy policy</span>. At Bogue, we
            prioritize the privacy and security of your data, adhering strictly
            to industry standards and regulations to maintain your trust and
            confidence in our business practices.
          </p>
        </div>
        <div className="identity__button__wrapper">
          {formActive === "identity" ? (
            <>
              <button className="identity__button-dark">Update</button>
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
    </>
  );
};

export default Profile;
