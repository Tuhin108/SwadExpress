import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import Button from '../components/common/Button';

const RestaurantsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const cuisineFilter = searchParams.get('cuisine') || '';
  
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>(cuisineFilter);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique cuisines
  const cuisines = ['All Cuisines', ...new Set(restaurants.flatMap(restaurant => restaurant.cuisine))];
  
  useEffect(() => {
    let filtered = restaurants;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply vegetarian filter
    if (vegetarianOnly) {
      filtered = filtered.filter(restaurant => restaurant.isVeg);
    }
    
    // Apply cuisine filter
    if (selectedCuisine && selectedCuisine !== 'All Cuisines') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.some(c => c === selectedCuisine)
      );
    }
    
    // Apply rating filter
    if (ratingFilter) {
      filtered = filtered.filter(restaurant => restaurant.rating >= ratingFilter);
    }
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, vegetarianOnly, selectedCuisine, ratingFilter]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setVegetarianOnly(false);
    setSelectedCuisine('All Cuisines');
    setRatingFilter(null);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {searchQuery 
            ? `Search results for "${searchQuery}"` 
            : cuisineFilter 
              ? `${cuisineFilter} Restaurants` 
              : 'All Restaurants'}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search and filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </form>
              
              <div className="lg:hidden mb-4">
                <button
                  onClick={toggleFilters}
                  className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-md text-gray-700"
                >
                  <span>Filters</span>
                  <Filter size={18} />
                </button>
              </div>
              
              <div className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
                <div>
                  <h3 className="font-medium mb-2">Cuisine</h3>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {cuisines.map(cuisine => (
                      <label key={cuisine} className="flex items-center">
                        <input
                          type="radio"
                          name="cuisine"
                          checked={selectedCuisine === cuisine}
                          onChange={() => setSelectedCuisine(cuisine)}
                          className="mr-2"
                        />
                        <span className="text-sm">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 4.5}
                        onChange={() => setRatingFilter(4.5)}
                        className="mr-2"
                      />
                      <span className="text-sm">4.5+</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 4}
                        onChange={() => setRatingFilter(4)}
                        className="mr-2"
                      />
                      <span className="text-sm">4.0+</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === null}
                        onChange={() => setRatingFilter(null)}
                        className="mr-2"
                      />
                      <span className="text-sm">All Ratings</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={vegetarianOnly}
                      onChange={() => setVegetarianOnly(!vegetarianOnly)}
                      className="mr-2"
                    />
                    <span className="text-sm">Vegetarian Only</span>
                  </label>
                </div>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={resetFilters}
                  size="sm"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Restaurant grid */}
          <div className="w-full lg:w-3/4">
            {filteredRestaurants.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No restaurants found</h2>
                <p className="text-gray-600 mb-4">Try changing your filters or search terms</p>
                <Button variant="primary" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;