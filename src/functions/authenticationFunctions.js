import { supabase } from "../utils/supabaseClient";
import { showPopup } from "../features/popup/popupSlice";

export const handleAuthenticate = async (
  userData,
  setPortal,
  setInputStates,
  dispatch
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          dob: userData.dob,
          phone_number: userData.phone,
        },
      },
    });

    if (error) throw error;

    if (data && data.user) {
      if (data.user.identities && data.user.identities?.length > 0) {
        setPortal("login");
        dispatch(
          showPopup({
            message:
              "Your account has been successfully created. Welcome aboard!",
            type: "success",
          })
        );
        //maybe have a popup confirmation that account was created successfully
        //and proceed to login
      } else {
        setInputStates((prevInputStates) => ({
          ...prevInputStates,
          createEmail: {
            ...prevInputStates.createEmail,
            hasError: "! Email already exists.",
          },
        }));
        dispatch(
          showPopup({
            message: "Email is already in use. Please use a different email.",
            type: "error",
          })
        );
      }
    }
  } catch (error) {
    console.error("Error inserting user:", error.message);
    dispatch(
      showPopup({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      })
    );
  }
};

export const handleSignInAuthentication = async (
  userData,
  setInputStates,
  dispatch
) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;

    if (data && data.session) {
      dispatch(
        showPopup({
          message: "You're in! Welcome back! You've successfully logged in.",
          type: "success",
        })
      );
      // window.location.reload();
    }
  } catch (error) {
    if (error.message === "Invalid login credentials") {
      setInputStates((prevInputStates) => ({
        ...prevInputStates,
        password: {
          ...prevInputStates.password,
          hasError: "! Invalid login credentials, please try again.",
        },
      }));
      dispatch(
        showPopup({
          message: "Invalid email or password. Please try again.",
          type: "error",
        })
      );
    } else {
      console.error(
        "Unexpected error occurred during sign-in: ",
        error.message
      );
      dispatch(
        showPopup({
          message: "An unexpected error occurred. Please try again.",
          type: "error",
        })
      );
    }
  }
};

export const handleSignOut = async (dispatch) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    if (!error) {
      // sessionStorage.removeItem("token");
      dispatch(
        showPopup({
          message: "You have successfully logged out.",
          type: "info",
        })
      );
      // window.location.reload();
    }
  } catch (error) {
    console.error("Unexpected error occurred during sign-out: ", error.message);
    dispatch(
      showPopup({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      })
    );
  }
};

export const handleForgotPasswordAuthentication = async (
  email,
  setPortal,
  dispatch
) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    setPortal("password-reset-email-sent");
    dispatch(
      showPopup({
        message:
          "Password reset email sent! Check your inbox for further instructions on resetting your password.",
        type: "info",
      })
    );
  } catch (error) {
    console.error(
      "Unexpected error occurred during forgot-password: ",
      error.message
    );
    dispatch(
      showPopup({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      })
    );
  }
};

export const handleResetPasswordAuthentication = async (
  password,
  setInputStates,
  setPortal,
  dispatch
) => {
  try {
    const token = getAuthToken();

    if (token === null) throw null;

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) throw error;

    if (data) {
      setPortal("login");
      dispatch(
        showPopup({
          message:
            "Great news! Your password has been updated successfully. Your account is now more secure.",
          type: "success",
        })
      );
    }
  } catch (error) {
    if (error === null) {
      setInputStates((prevInputStates) => ({
        ...prevInputStates,
        confirmPassword: {
          ...prevInputStates.confirmPassword,
          hasError:
            "! Password recovery token expired. Please request another token (Fillout the forgot-password form again).",
        },
      }));
      dispatch(
        showPopup({
          message: "Password recovery token expired.",
          type: "error",
        })
      );
    } else if (
      error.message ===
      "New password should be different from the old password."
    ) {
      console.error("Pick a new password: ", error.message);
      dispatch(
        showPopup({
          message: "New password should be different from the old password.",
          type: "error",
        })
      );
    } else {
      console.error(
        "Unexpected error occurred during forgot-password: ",
        error.message
      );
      dispatch(
        showPopup({
          message: "An unexpected error occurred. Please try again.",
          type: "error",
        })
      );
    }
  }
};

export const handleUpdateEmail = async (email, setEditStates, dispatch) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
    });

    if (error) throw error;

    if (data) {
      dispatch(
        showPopup({
          message: "Great news! Your email has been updated successfully.",
          type: "success",
        })
      );
    }
  } catch (error) {
    console.error("Unexpected error occurred: ", error.message);
    dispatch(
      showPopup({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      })
    );
  }
};

export const handleResetLoginInfo = async (
  email,
  password,
  setEditStates,
  dispatch
) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password,
    });

    if (error) throw error;

    if (data) {
      dispatch(
        showPopup({
          message:
            "Great news! Your password has been updated successfully. Your account is now more secure.",
          type: "success",
        })
      );
    }
  } catch (error) {
    if (
      error.message ===
      "New password should be different from the old password."
    ) {
      setEditStates((setEditStates) => ({
        ...setEditStates,
        editConfirmPassword: {
          ...setEditStates.editConfirmPassword,
          hasError: "! New password should be different from the old password.",
        },
      }));
      console.error("Pick a new password: ", error.message);
      dispatch(
        showPopup({
          message: "New password should be different from the old password.",
          type: "error",
        })
      );
    } else {
      console.error("Unexpected error occurred: ", error.message);
      dispatch(
        showPopup({
          message: "An unexpected error occurred. Please try again.",
          type: "error",
        })
      );
    }
  }
};

export function getAuthToken() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes("-auth-token")) {
      return localStorage.getItem(key);
    }
  }
  //if no token was found
  return null;
}
