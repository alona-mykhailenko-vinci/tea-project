import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-tea-dark px-4 py-3 shadow-md">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-tea-lightest no-underline">
          <h1 className="text-xl font-semibold text-tea-lightest hover:text-tea-light transition-colors">
            TeaShop
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-tea-lightest font-normal hover:text-tea-light transition-colors no-underline"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-tea-lightest font-normal hover:text-tea-light transition-colors no-underline"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;