export const validateName = (name) => {
  if (!/^[a-z]+$/i.test(name)) {
    return "! Please enter a valid name.";
  }
};

export const validatePassword = (pw) => {
  if (pw.length > 0) {
    return "";
  }
};

export const validateNewPassword = (pw) => {
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

export const validateConfirmPassword = (newPW, confirmPW) => {
  if (newPW !== confirmPW) {
    return "! Passwords do not match. Please try again.";
  }
};

export const validateEmail = (email) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "! Please enter a valid email address.";
  }
};

export const validatePhone = (phone) => {
  if (phone.replace(/[^\d]/g, "").length < 10) {
    return "! Please enter a valid phone number.";
  }
};

export const validateDate = (date) => {
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

export const validateStreet = (street) => {
  const streetPattern = /^\d+\s*.+/;
  
  if (!streetPattern.test(street.trim())) {
    return "! Please enter a valid street address.";
  }
};

export const validateCity = (city) => {
  const containsNonAlphabetic = /[^A-Za-z\s]/.test(city);

  if (containsNonAlphabetic) {
    return "! Please enter a valid city.";
  }
};

const canadianProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories",
  "Nunavut", "Yukon"
];

export const validateProvince = (province) => {
  if (!canadianProvinces.includes(province.trim())) {
    return "! Please enter a valid Canadian province.";
  }
};

export const validatePostalCode = (postalCode) => {
  const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  
  if (!postalCodePattern.test(postalCode)) {
    return "! Please enter a valid postal code (e.g., A1A 1A1).";
  }
};