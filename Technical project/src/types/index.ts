export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  description: string;
  address: string;
  isVeg: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  popular: boolean;
  tags: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  total: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  paymentMethod: string;
  deliveryAddress: Address;
  placedAt: Date;
  estimatedDeliveryTime: string;
}