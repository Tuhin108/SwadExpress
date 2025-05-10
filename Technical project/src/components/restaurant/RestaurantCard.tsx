import React from 'react';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types';
import Badge from '../common/Badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {restaurant.isVeg && (
            <div className="absolute top-2 right-2">
              <Badge variant="success" size="sm">Veg Only</Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white text-xl font-semibold">{restaurant.name}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            {restaurant.cuisine.join(', ')}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="flex items-center bg-green-100 text-green-800 rounded px-1.5 py-0.5 text-sm font-medium">
                <Star size={14} className="fill-green-800 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">₹{restaurant.minOrder} min order</span>
            <span className="text-gray-600">₹{restaurant.deliveryFee} delivery fee</span>
          </div>
          
          {restaurant.rating >= 4.5 && (
            <div className="flex items-center mt-3 text-orange-600 text-sm">
              <TrendingUp size={14} className="mr-1" />
              <span>Popular in your area</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;