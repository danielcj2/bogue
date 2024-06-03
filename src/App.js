//pages
import Catalog from "./pages/Catalog";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import ForgotPassword from "./pages/ForgotPassword";
import AcessPortalPage from "./pages/AcessPortalPage";
import Popup from "./components/Popup";

import { supabase } from "./utils/supabaseClient";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);
      switch (event) {
        case "SIGNED_IN":
          dispatch(setUser(session?.user));
          break;
        case "SIGNED_OUT":
          dispatch(logoutUser());
          break;
        default:
          break;
      }
    });
  }, []);

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
        <Route path="/access-portal" element={<AcessPortalPage />} />
      </Routes>
      <div className="popups">
        <Popup />
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default App;
