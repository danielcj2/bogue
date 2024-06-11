import {
  validateCity,
  validateConfirmPassword,
  validateDate,
  validateEmail,
  validateName,
  validateNewPassword,
  validatePassword,
  validatePhone,
  validatePostalCode,
  validateProvince,
  validateStreet,
} from "./validateFunctions";

export const handleChange = (event, ID, type, setStates, newPW) => {
  const { value } = event.target;

  let formattedValue = value;

  //format Phone Number (###) ### - ####
  if (type === "phone") {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    formattedValue = formatPhone(numericValue);

    // Set the input field's value to the formatted value
    if (event.target.value !== formattedValue) {
      event.target.value = formattedValue;
    }
  }

  switch (type) {
    case "email":
      updateInputState(setStates, ID, formattedValue, validateEmail);
      break;
    case "create-password":
      updateInputState(setStates, ID, formattedValue, validateNewPassword);
      break;
    case "password":
      updateInputState(setStates, ID, formattedValue, validatePassword);
      break;
    case "confirm-password":
      updateInputState(
        setStates,
        ID,
        formattedValue,
        validateConfirmPassword,
        newPW
      );
      break;
    case "name":
      updateInputState(setStates, ID, formattedValue, validateName);
      break;
    case "phone":
      updateInputState(setStates, ID, formattedValue, validatePhone);
      break;
    case "date":
      updateInputState(setStates, ID, formattedValue, validateDate);
      break;
    case "street":
      updateInputState(setStates, ID, formattedValue, validateStreet);
      break;
    case "city":
      updateInputState(setStates, ID, formattedValue, validateCity);
      break;
    case "province":
      updateInputState(setStates, ID, formattedValue, validateProvince);
      break;
    case "postal-code":
      updateInputState(setStates, ID, formattedValue, validatePostalCode);
      break;
    default:
      break;
  }
};

const updateInputState = (setStates, ID, value, validationFunction, newPW) => {
  setStates((prevStates) => ({
    ...prevStates,
    [ID]: {
      ...prevStates[ID],
      value: value,
      hasError: newPW
        ? validationFunction(newPW, value)
        : validationFunction(value),
    },
  }));
};

export const formatPhone = (value) => {
  if (!value.length) {
    return "";
  } else if (value.length <= 3) {
    return `(${value}`;
  } else if (value.length <= 6) {
    return `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)} - ${value.slice(
      6,
      10
    )}`;
  }
};
