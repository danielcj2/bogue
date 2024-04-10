import Catalog from './pages/Catalog';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/catalog/:params*" element={<Catalog />} />
        <Route path="/product" element={<Product/>}/>
      </Routes>
  );
}

export default App;
