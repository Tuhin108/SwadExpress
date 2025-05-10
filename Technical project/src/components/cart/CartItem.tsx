import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrease = () => {
    updateQuantity(item.item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.item.id, item.quantity - 1);
    } else {
      removeFromCart(item.item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.item.id);
  };
  
  return (
    <div className="flex border-b border-gray-200 py-4 group">
      <div className="w-20 h-20 relative rounded-md overflow-hidden">
        <img 
          src={item.item.image} 
          alt={item.item.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0">
          {item.item.isVeg ? (
            <div className="h-5 w-5 bg-white border border-green-600 flex items-center justify-center">
              <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="h-5 w-5 bg-white border border-red-600 flex items-center justify-center">
              <div className="h-3 w-3 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.item.name}</h3>
          <p className="font-medium">₹{item.item.price * item.quantity}</p>
        </div>
        
        <p className="text-sm text-gray-500 mt-1">₹{item.item.price} each</p>
        
        <div className="flex justify-between mt-3">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={handleDecrease}
              className="p-1 text-gray-600 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 font-medium">
              {item.quantity}
            </span>
            <button 
              onClick={handleIncrease}
              className="p-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;