import { supabase } from "../utils/supabaseClient";

export const handleAuthenticate = async (userData, setPortal, setInputStates) => {
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
      }
    }
  } catch (error) {
    console.error("Error inserting user:", error.message);
    throw error;
  }
};

export const handleSignInAuthentication = async (userData, setInputStates) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;

    if (data && data.session) {
      sessionStorage.setItem("token", JSON.stringify(data.session));
      window.location.reload();
    }
  } catch (error) {
    console.error("Unexpected error occurred during sign-in: ", error.message);
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      password: {
        ...prevInputStates.password,
        hasError: "! Invalid login credentials, please try again.",
      },
    }));
  }
};

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    if (!error) {
      sessionStorage.removeItem("token");
      window.location.reload();
    }
  } catch (error) {
    console.error("Unexpected error occurred during sign-out: ", error.message);
  }
};
