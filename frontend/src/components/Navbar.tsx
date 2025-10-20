import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="tea-navbar px-4 py-3 shadow-md">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-white no-underline">
          <h1 className="text-xl font-semibold text-white hover:text-green-100 transition-colors">
            TeaShop
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-white font-normal hover:text-green-100 transition-colors no-underline"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-white font-normal hover:text-green-100 transition-colors no-underline"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;