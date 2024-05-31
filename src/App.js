//pages
import Catalog from "./pages/Catalog";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const tokenParsed = JSON.parse(token);
      dispatch(setUser(tokenParsed.user));
    }
  }, [dispatch]);

  return (
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
    </Routes>
  );
}

export default App;
