//pages
import Catalog from "./pages/Catalog";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//layout
import ForgotPassword from "./pages/ForgotPassword";
import Gateway from "./pages/Gateway";
import Account from "./pages/Account";

//components
import Popup from "./components/Popup";

import { supabase } from "./utils/supabaseClient";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuthStateChange = (event, session) => {
      console.log(event);
      switch (event) {
        case "SIGNED_IN":
          dispatch(setUser(session?.user));
          break;
        case "SIGNED_OUT":
          dispatch(logoutUser());
          break;
        case "USER_UPDATED":
          dispatch(setUser(session?.user));
          break;
        default:
          break;
      }
    };

    supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:slug" element={<Catalog />} />
        <Route path="/catalog/:category/:slug" element={<Catalog />} />
        <Route
          path="/catalog/:category/:subcategory/:slug"
          element={<Catalog />}
        />
        <Route path="/products/:product_id" element={<Product />} />
        <Route
          path="/access-portal/account/change-password"
          element={<ForgotPassword />}
        />
        <Route path="/access-portal" element={<Gateway />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:section" element={<Account />} />
      </Routes>
      <div className="popups">
        <Popup />
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default App;
