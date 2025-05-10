import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-orange-600">Spice</span>
          <span className="text-2xl font-bold text-green-600">Route</span>
        </Link>

        {/* Search bar - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/restaurants" className="text-gray-700 hover:text-orange-600">
            Restaurants
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="text-gray-700 hover:text-orange-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-orange-600">
                <span className="mr-1">{user?.name.split(' ')[0]}</span>
                <User size={18} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Orders</Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64' : 'max-h-0 invisible'} overflow-hidden bg-white`}>
        <div className="px-4 py-2">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <nav className="flex flex-col space-y-4 pb-4">
            <Link to="/restaurants" className="text-gray-700 hover:text-orange-600">
              Restaurants
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-orange-600 flex items-center">
              <ShoppingBag className="mr-2" size={18} />
              Cart {cartCount > 0 && <span className="ml-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-orange-600">
                  <User className="mr-2 inline" size={18} />
                  Profile
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-orange-600">
                  Orders
                </Link>
                <button 
                  onClick={logout}
                  className="text-left text-gray-700 hover:text-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" fullWidth>
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;