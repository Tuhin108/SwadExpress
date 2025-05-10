import React from 'react';
import Hero from '../components/home/Hero';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';

const HomePage: React.FC = () => {
  // Get popular items (those marked as popular)
  const popularItems = menuItems.filter(item => item.popular).slice(0, 4);
  
  // Group restaurants by cuisine
  const northIndianRestaurants = restaurants.filter(r => 
    r.cuisine.some(c => c.includes('North') || c.includes('Punjabi') || c.includes('Mughlai'))
  ).slice(0, 3);
  
  const southIndianRestaurants = restaurants.filter(r => 
    r.cuisine.some(c => c.includes('South') || c.includes('Kerala') || c.includes('Tamil'))
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Popular Dishes Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Dishes</h2>
            <Link to="/popular" className="flex items-center text-orange-600 hover:text-orange-700">
              <span className="mr-1">View all</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <Link to={`/restaurant/${item.restaurantId}`} key={item.id} className="block group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">₹{item.price}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {restaurants.find(r => r.id === item.restaurantId)?.name}
                      </span>
                      <div className={`h-4 w-4 ${item.isVeg ? 'border-green-600' : 'border-red-600'} border flex items-center justify-center`}>
                        <div className={`h-2 w-2 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* North Indian Restaurants Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">North Indian Delights</h2>
            <Link to="/restaurants?cuisine=North%20Indian" className="flex items-center text-orange-600 hover:text-orange-700">
              <span className="mr-1">View all</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {northIndianRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
        
        {/* South Indian Restaurants Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">South Indian Specialties</h2>
            <Link to="/restaurants?cuisine=South%20Indian" className="flex items-center text-orange-600 hover:text-orange-700">
              <span className="mr-1">View all</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {southIndianRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
        
        {/* App Promotion Section */}
        <section className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-3">Download Our App</h2>
              <p className="mb-4">Get exclusive offers and track your deliveries in real-time</p>
              <div className="flex space-x-4">
                <button className="bg-black text-white px-4 py-2 rounded-md flex items-center">
                  <span className="mr-2">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3301 0C13.3483 0 13.3665 0 13.3847 0C13.5486 0.0529 13.7308 0.0882 13.876 0.1764C16.2902 1.3234 18.7044 2.4704 21.1186 3.6351C21.9237 4.0235 22.5378 4.6587 22.7382 5.5469C22.7746 5.688 22.8293 5.811 22.9022 5.9616V26.0384C22.8293 26.189 22.7564 26.3396 22.7382 26.4901C22.5378 27.3784 21.9237 28.0136 21.1186 28.3843C18.7044 29.549 16.2902 30.6959 13.876 31.843C13.3847 32.0642 12.8933 32.0995 12.3837 31.9313C12.2199 31.8784 12.0378 31.8431 11.8925 31.7549C9.49654 30.6077 7.10062 29.4607 4.70468 28.2959C3.89958 27.9075 3.28553 27.2722 3.08509 26.384C3.04869 26.243 2.99408 26.12 2.90305 25.9694V6.0306C2.99408 5.88 3.06687 5.7294 3.08509 5.5788C3.28553 4.6905 3.89958 4.0553 4.70468 3.6847C7.10062 2.5199 9.49654 1.373 11.8925 0.2258C12.0743 0.1411 12.2562 0.0882 12.4563 0C12.748 0 13.0397 0 13.3301 0ZM13.04 22.5524C16.272 20.7585 19.4858 18.9822 22.7382 17.1707V6.7953C19.5041 8.5891 16.2902 10.3654 13.04 12.1769V22.5524ZM13.0218 2.5234C9.78983 4.3173 6.57601 6.0936 3.32356 7.905V18.2805C6.55779 16.4866 9.77163 14.7103 13.0218 12.8988V2.5234Z" fill="white"/>
                    </svg>
                  </span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                
                <button className="bg-black text-white px-4 py-2 rounded-md flex items-center">
                  <span className="mr-2">
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.32165 0.196289C1.43946 0.339577 1.55726 0.482866 1.66291 0.626154C3.44678 3.11578 5.2425 5.60541 7.03038 8.08288C7.13603 8.2271 7.13603 8.32991 7.03038 8.47412C5.21064 11.0196 3.40091 13.5542 1.58587 16.0997C1.51593 16.208 1.44599 16.3163 1.36389 16.4356C1.36389 16.407 1.36389 16.3785 1.36389 16.35C1.36389 11.8501 1.36389 7.3502 1.36389 2.85031C1.36389 1.95344 1.36389 1.0457 1.36389 0.147694C1.36389 0.119124 1.36389 0.0905539 1.32165 0.196289Z" fill="white"/>
                      <path d="M12.7213 10.9481C14.5074 9.81426 16.2934 8.67124 18.0795 7.53911C19.0934 6.88566 20.1154 6.24309 21.1256 5.58964C21.2316 5.51777 21.317 5.47013 21.4466 5.49869C21.4466 5.59062 21.4466 5.67337 21.4466 5.7561C21.4466 10.9537 21.4466 16.1403 21.4466 21.3379C21.4466 21.4695 21.4466 21.592 21.4466 21.7236C21.3764 21.7236 21.3409 21.7236 21.3053 21.7236C20.1036 21.0206 18.9018 20.3177 17.7 19.6147C16.0536 18.6226 14.3954 17.6305 12.7491 16.6384C12.6197 16.5571 12.5615 16.471 12.5615 16.3163C12.5615 14.5299 12.5615 12.7345 12.5615 10.9481C12.6197 10.9481 12.6671 10.9481 12.7213 10.9481Z" fill="white"/>
                      <path d="M7.19702 16.4573C9.49651 13.1729 11.796 9.8886 14.1073 6.59344C14.1547 6.51069 14.2128 6.42794 14.282 6.3452C14.3401 6.28421 14.4101 6.24745 14.4801 6.32931C16.0537 7.32141 17.6273 8.31352 19.1889 9.31651C19.2945 9.38838 19.2708 9.46024 19.2234 9.5411C16.9239 13.1966 14.6244 16.8611 12.3249 20.5166C12.2786 20.5994 12.2194 20.6821 12.1613 20.7649C12.0913 20.8449 12.0212 20.8816 11.9275 20.8259C10.3421 19.8338 8.7567 18.8417 7.17129 17.8496C7.15371 17.8405 7.14498 17.8223 7.14498 17.8032C7.14498 17.7841 7.15371 17.7659 7.17129 17.7567C7.20337 17.7089 7.22904 17.6501 7.24389 17.5859C7.38341 17.3268 7.4939 17.0578 7.6282 16.7988C7.64784 16.7588 7.68198 16.7188 7.71613 16.6788C7.5402 16.6069 7.37337 16.5359 7.19702 16.4573Z" fill="white"/>
                      <path d="M7.19678 6.33844C7.37314 6.25977 7.53997 6.18887 7.71589 6.11702C7.68175 6.07705 7.6476 6.03709 7.62798 5.99713C7.49367 5.73806 7.38319 5.46905 7.24367 5.21092C7.2106 5.14654 7.16487 5.08931 7.10977 5.0429C7.09219 5.03324 7.08341 5.01445 7.08336 4.9946C7.0833 4.97476 7.09198 4.95591 7.10949 4.94615C8.71285 3.93317 10.3162 2.92108 11.9313 1.91997C12.0249 1.86425 12.0951 1.8919 12.1652 1.97191C12.2233 2.05466 12.2824 2.13741 12.3288 2.22017C14.6282 5.86485 16.9277 9.52039 19.2271 13.1759C19.2865 13.2587 19.2983 13.3305 19.1926 13.3933C17.6311 14.3873 16.0575 15.3884 14.4838 16.3805C14.4138 16.4224 14.3438 16.4633 14.2737 16.4123C14.2046 16.3386 14.1465 16.2558 14.099 16.173C12.9691 14.4729 11.8392 12.7727 10.6975 11.0726C9.55968 9.37339 8.41969 7.67422 7.29755 5.97593C7.26115 5.92021 7.23661 5.86448 7.19678 5.78173C7.19678 5.94596 7.19678 6.09017 7.19678 6.24526C7.19678 6.27291 7.19678 6.30056 7.19678 6.33844Z" fill="white"/>
                    </svg>
                  </span>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Mobile App" 
                className="h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;