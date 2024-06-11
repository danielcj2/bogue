import { supabase } from "../utils/supabaseClient";

export const fetchUserAddresses = async () => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("address_book");

    if (error) throw error;

    if (data && data.length !== 0)
      if (data.address_book !== undefined) return data.address_book;
      else return null;
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
