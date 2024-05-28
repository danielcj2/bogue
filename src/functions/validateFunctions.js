import { supabase } from "../utils/supabaseClient";

export const validateName = (name) => {
  if (!/^[a-z]+$/i.test(name)) {
    return "! Please enter a valid name.";
  }
};

export const validatePassword = (pw) => {
    if (pw.length > 0){
        return "";
    }
}

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

export const validateEmail = (email) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "! Please enter a valid email address.";
  }
};

export const validatePhone = (phone) => {
  if (phone.length < 10) {
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

export const insertUser = async (userData) => {
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

  export const checkEmail = async (email) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("email_address", email);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error.message);
      throw error;
    }
  };

  export const checkPassword = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email_address", email)
        .eq("password", password);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error.message);
      throw error;
    }
  };
