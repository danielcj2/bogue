//pages
import Catalog from "./pages/Catalog";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./utils/store"; //Redux store

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
