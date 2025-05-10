import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      {heroImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <img 
            src={image} 
            alt="Indian Food" 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span className="block mb-2">Authentic Indian Cuisine</span>
          <span className="text-orange-500">Delivered</span> To Your Door
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Experience the rich flavors and aromas of India from the best local restaurants
        </p>

        {/* Search form */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food, restaurants, or cuisines..."
              className="w-full py-3 px-5 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Popular cuisines */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 hover:bg-orange-500 cursor-pointer">
            North Indian
          </span>
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 hover:bg-orange-500 cursor-pointer">
            South Indian
          </span>
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 hover:bg-orange-500 cursor-pointer">
            Punjabi
          </span>
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 hover:bg-orange-500 cursor-pointer">
            Biryani
          </span>
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 hover:bg-orange-500 cursor-pointer">
            Vegetarian
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;