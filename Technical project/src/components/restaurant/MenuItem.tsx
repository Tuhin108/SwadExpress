import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types';
import Badge from '../common/Badge';
import { useCart } from '../../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find(cartItem => cartItem.item.id === item.id);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(item.id, cartItem.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(item.id, cartItem.quantity - 1);
    } else if (cartItem) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="border-b border-gray-200 py-4 flex flex-col sm:flex-row group">
      <div className="sm:w-3/4 mb-3 sm:mb-0 sm:pr-4">
        <div className="flex items-center mb-1">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <div className="ml-2 flex gap-1">
            {item.isVeg ? (
              <div className="h-5 w-5 border border-green-600 flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
              </div>
            ) : (
              <div className="h-5 w-5 border border-red-600 flex items-center justify-center">
                <div className="h-3 w-3 bg-red-600 rounded-full"></div>
              </div>
            )}
            {item.isSpicy && (
              <Badge variant="error" size="sm">Spice</Badge>
            )}
            {item.popular && (
              <Badge variant="info" size="sm">Best Sellers</Badge>
            )}
          </div>
        </div>
        <p className="text-gray-500 mb-2">₹{item.price}</p>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
      
      <div className="sm:w-1/4 relative">
        <div className="h-24 overflow-hidden rounded-lg relative">
          <img 
            src={item.image} 
            alt={item.name} 
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          {!cartItem ? (
            <button 
              onClick={handleAddToCart}
              className="bg-white text-orange-600 border border-orange-600 rounded-md px-3 py-1 text-sm font-medium shadow-md transition-colors hover:bg-orange-50"
            >
              Add
              <Plus size={14} className="ml-1 inline" />
            </button>
          ) : (
            <div className="flex items-center bg-white border border-orange-600 rounded-md overflow-hidden shadow-md">
              <button 
                onClick={handleDecrease}
                className="p-1 text-orange-600 hover:bg-orange-50"
              >
                <Minus size={14} />
              </button>
              <span className="px-2 font-medium text-orange-600">
                {cartItem.quantity}
              </span>
              <button 
                onClick={handleIncrease}
                className="p-1 text-orange-600 hover:bg-orange-50"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;