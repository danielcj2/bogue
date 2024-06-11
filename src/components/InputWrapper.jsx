import React from "react";

const InputWrapper = ({ state, text, children }) => {
  return (
    <div className="input-wrapper">
      {state ? (
        <>
          <label
            htmlFor={state.id}
            className={`cap${
              state.isFocused || state.value !== "" ? " isFocused" : " notFocused"
            }`}
          >
            {text}
          </label>
          <div
            className={
              state.type.includes("create") ||
              state.type.includes("confirm") ||
              state.type.includes("phone") ||
              state.id === "password"
                ? "__container"
                : ""
            }
          >
            {children}
          </div>
          {state.type.includes("password") &&
          !state.type.includes("confirm") &&
          state.id !== "password" ? (
            <p className="create-pw-field">
              <span
                className={
                  state.hasError.includes("length") ? "hasError" : "valid"
                }
              >
                At least 6 characters
              </span>
              <span
                className={
                  state.hasError.includes("lowercase") ? "hasError" : "valid"
                }
              >
                1 lowercase letter
              </span>
              <span
                className={
                  state.hasError.includes("uppercase") ? "hasError" : "valid"
                }
              >
                1 uppercase letter
              </span>
              <span
                className={
                  state.hasError.includes("digit") ? "hasError" : "valid"
                }
              >
                1 digit
              </span>
            </p>
          ) : (
            <p className={state.hasError ? "hasError" : "valid"}>
              {state.hasError}
            </p>
          )}{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputWrapper;
