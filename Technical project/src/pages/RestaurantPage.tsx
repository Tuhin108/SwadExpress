import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, ShoppingBag } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import MenuItem from '../components/restaurant/MenuItem';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(restaurants.find(r => r.id === id));
  const [items, setItems] = useState(menuItems.filter(item => item.restaurantId === id));
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, cartTotal, items: cartItems } = useCart();
  
  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
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
  
  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  if (!restaurant) {
    return <div className="container mx-auto py-20 text-center">Restaurant not found</div>;
  }
  
  const hasItemsInCart = cartItems.some(item => item.item.restaurantId === id);
  
  return (
    <div className="min-h-screen pt-16">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="absolute bottom-0 left-0 right-0 text-white p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <p className="mt-2 text-lg">{restaurant.cuisine.join(', ')}</p>
            
            <div className="flex flex-wrap items-center mt-3 gap-4">
              <div className="flex items-center">
                <div className="flex items-center bg-green-500 text-white rounded px-2 py-1 text-sm font-medium">
                  <Star size={14} className="fill-white mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-200">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              
              <div className="flex items-center text-gray-200">
                <MapPin size={16} className="mr-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Category Navigation */}
      <div className={`${isScrolled ? 'sticky top-16 shadow-md' : ''} bg-white z-30 border-b py-3`}>
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-1">
            {categories.map(category => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              {filteredItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items found in this category</p>
              ) : (
                filteredItems.map(item => (
                  <MenuItem key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="sticky top-32">
              {/* Restaurant Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-3">Restaurant Info</h3>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mr-2 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-600">{restaurant.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={18} className="text-gray-500 mr-2 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-500 mr-2 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Opening Hours</p>
                      <p className="text-sm text-gray-600">10:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cart Preview (if items in cart) */}
              {hasItemsInCart && (
                <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Your Cart</h3>
                    <span className="text-sm text-gray-500">{cartCount} items</span>
                  </div>
                  
                  <div className="border-t border-b py-3 mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Item Total</span>
                      <span className="font-medium">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">₹{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total</span>
                    <span>₹{cartTotal + restaurant.deliveryFee}</span>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    fullWidth
                    icon={<ShoppingBag size={16} />}
                    onClick={() => window.location.href = '/cart'}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;