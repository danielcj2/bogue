import { supabase } from "../utils/supabaseClient";

export const fetchUserAddresses = async () => {
  try {
    const { data: addressIDs, error } = await supabase
      .from("profile")
      .select("address_book");

    if (error) throw error;

    if (addressIDs && addressIDs.length !== 0) {
      let addresses = [];
      const id = addressIDs[0].address_book;

      for (let i = 0; i < id.length; i++) {
        const { data: addressData, error: addressError } = await supabase
          .from("address_book")
          .select("*")
          .eq("address_id", id[i]);

        if (addressError) continue;

        if (addressData) addresses.push(addressData[0]);
      }
      
      if (addresses && addresses.length !== 0) return addresses;
    }
  } catch (error) {
    console.error(
      "Unexpected error occurred during fetch-addresses: ",
      error.message
    );
  }
};

export const fetchUserPayments = async () => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("payment_methods");

    if (error) throw error;

    if (data && data.length !== 0)
      if (data.payment_methods !== undefined) return data.payment_methods;
      else return null;
  } catch (error) {
    console.error(
      "Unexpected error occurred during fetch-addresses: ",
      error.message
    );
  }
};

export const fetchUserOrderHistory = async () => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("order_history");

    if (error) throw error;

    if (data && data.length !== 0)
      if (data.order_history !== undefined) return data.order_history;
      else return null;
  } catch (error) {
    console.error(
      "Unexpected error occurred during fetch-order-history: ",
      error.message
    );
  }
};
