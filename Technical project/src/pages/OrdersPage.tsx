import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, ChevronDown, Phone, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD12345',
    restaurantName: 'Spice Garden',
    restaurantId: '1',
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 320 },
      { name: 'Garlic Naan', quantity: 2, price: 60 }
    ],
    status: 'delivered',
    orderDate: '2023-05-15',
    total: 440,
    deliveryAddress: {
      type: 'Home',
      street: '42 Park Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  },
  {
    id: 'ORD12346',
    restaurantName: 'Dosa Delight',
    restaurantId: '2',
    items: [
      { name: 'Masala Dosa', quantity: 2, price: 180 },
      { name: 'Idli Sambar', quantity: 1, price: 120 }
    ],
    status: 'out-for-delivery',
    orderDate: '2023-05-20',
    total: 480,
    deliveryAddress: {
      type: 'Work',
      street: '121 Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051'
    }
  }
];

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(mockOrders[1].id);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="container max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <Link to="/login">
            <Button variant="primary">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const toggleExpandOrder = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            {/* Order header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <h3 className="font-medium">{order.restaurantName}</h3>
                </div>
                <div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {order.status === 'delivered' ? 'Delivered' : 'On the way'}
                  </div>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                Ordered on {new Date(order.orderDate).toLocaleDateString()}
              </div>
            </div>
            
            {/* Order details button */}
            <button 
              onClick={() => toggleExpandOrder(order.id)}
              className="flex justify-between items-center w-full p-4 hover:bg-gray-50"
            >
              <span className="font-medium">Order Details</span>
              {expandedOrder === order.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            
            {/* Expanded details */}
            {expandedOrder === order.id && (
              <div className="p-4 bg-gray-50">
                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="text-sm">
                          {item.quantity} × {item.name}
                        </div>
                        <div className="text-sm font-medium">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t">
                    <div className="font-medium">Total</div>
                    <div className="font-medium">₹{order.total}</div>
                  </div>
                </div>
                
                {/* Delivery Address */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <div className="flex items-start">
                    <MapPin size={16} className="mt-0.5 mr-2 text-gray-500" />
                    <div className="text-sm">
                      <p className="font-medium">{order.deliveryAddress.type}</p>
                      <p>
                        {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Order status */}
                {order.status === 'out-for-delivery' && (
                  <div className="bg-white p-4 rounded-md border border-orange-200 mb-4">
                    <h4 className="font-medium mb-2">Delivery Status</h4>
                    
                    <div className="flex mb-3">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mb-1">
                          <Package size={16} />
                        </div>
                        <div className="h-8 w-0.5 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-xs text-gray-500">11:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mb-1">
                          <Clock size={16} />
                        </div>
                        <div className="h-8 w-0.5 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="font-medium">Preparing</p>
                        <p className="text-xs text-gray-500">11:45 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white mb-1">
                          <MapPin size={16} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">On the way</p>
                        <p className="text-xs text-gray-500">12:15 PM</p>
                        <p className="mt-1 text-sm">Expected delivery by 12:45 PM</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        icon={<Phone size={14} />}
                      >
                        Contact Delivery
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                      >
                        Track Live
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Reorder button */}
                <div className="flex justify-between items-center">
                  <Link to={`/restaurant/${order.restaurantId}`}>
                    <Button variant="outline">
                      Reorder
                    </Button>
                  </Link>
                  
                  {order.status === 'delivered' && (
                    <Button 
                      variant="ghost" 
                      className="text-orange-600"
                    >
                      Rate Order
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;