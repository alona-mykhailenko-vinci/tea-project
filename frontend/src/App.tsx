import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { Home, Products } from './components';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
