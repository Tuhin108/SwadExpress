import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { items, cartTotal, clearCart, restaurantId } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const restaurant = restaurants.find(r => r.id === restaurantId);
  
  const deliveryFee = restaurant ? restaurant.deliveryFee : 0;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + tax;
  
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/orders');
    }, 3000);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/restaurants">
              <Button variant="primary">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your delicious food is on its way.</p>
            <p className="mb-8">Redirecting to order tracking...</p>
            <div className="flex justify-center">
              <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to={`/restaurant/${restaurantId}`} className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Restaurant</span>
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium">{restaurant?.name}</p>
              </div>
              
              <div className="space-y-1">
                {items.map(item => (
                  <CartItem key={item.item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              
              {/* Delivery Address */}
              {isAuthenticated ? (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Address</h3>
                  {user?.addresses.map(address => (
                    <label key={address.id} className="flex items-start mb-2">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1 mr-2"
                      />
                      <div>
                        <p className="font-medium">{address.type}</p>
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-sm text-gray-700 mb-2">Please login to continue</p>
                  <Link to="/login">
                    <Button variant="primary" size="sm">
                      Login to proceed
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="mr-2"
                    />
                    <span>Online Payment (UPI, Cards)</span>
                  </label>
                </div>
              </div>
              
              {/* Bill Details */}
              <div className="border-t pt-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Bill Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST and Restaurant Charges</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                fullWidth
                onClick={handlePlaceOrder}
                disabled={!isAuthenticated || !selectedAddress}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;