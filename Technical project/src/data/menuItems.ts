import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Spice Garden Items
  {
    id: '101',
    restaurantId: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in a rich, creamy tomato sauce with butter and spices',
    price: 499,
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Chicken Specials',
    isVeg: false,
    isSpicy: false,
    popular: true,
    tags: ['chicken', 'creamy', 'Indian']
  },
  {
    id: '102',
    restaurantId: '1',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in a spicy tomato-based gravy',
    price: 449,
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Paneer Specials',
    isVeg: true,
    isSpicy: true,
    popular: true,
    tags: ['paneer', 'creamy', 'masala']
  },
  {
    id: '103',
    restaurantId: '1',
    name: 'Garlic Naan',
    description: 'Leavened flatbread topped with garlic and butter',
    price: 99,
    image: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Rotis',
    isVeg: true,
    isSpicy: false,
    popular: false,
    tags: ['bread', 'tandoor']
  },
  
  // Dosa Delight Items
  {
    id: '201',
    restaurantId: '2',
    name: 'Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling, served with sambar and chutney',
    price: 159,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'South Indian',
    isVeg: true,
    isSpicy: false,
    popular: true,
    tags: ['south indian', 'breakfast', 'crispy']
  },
  {
    id: '202',
    restaurantId: '2',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil soup and coconut chutney',
    price: 129,
    image: 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'South Indian',
    isVeg: true,
    isSpicy: false,
    popular: true,
    tags: ['south indian', 'breakfast', 'healthy']
  },
  {
    id: '203',
    restaurantId: '2',
    name: 'Fish Curry',
    description: 'Fish cooked in coconut milk with curry leaves and traditional Kerala spices',
    price: 449,
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Fish Specials',
    isVeg: false,
    isSpicy: true,
    popular: false,
    tags: ['Bengali', 'fish', 'curry']
  },
  
  // Punjab Grill Items
  {
    id: '301',
    restaurantId: '3',
    name: 'Saag',
    description: 'Traditional Punjabi dish made with mustard greens, served with makki di roti',
    price: 49,
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Saag Specials',
    isVeg: true,
    isSpicy: false,
    popular: true,
    tags: ['Bengali', 'seasonal', 'traditional']
  },
  {
    id: '302',
    restaurantId: '3',
    name: 'Amritsari Fish',
    description: 'Crispy fried fish marinated in ajwain and gram flour batter',
    price: 350,
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Fish Specials',
    isVeg: false,
    isSpicy: true,
    popular: true,
    tags: ['Fish Fry', 'fish', 'fried']
  },
  {
    id: '303',
    restaurantId: '3',
    name: 'Dal Makhani',
    description: 'Black lentils simmered overnight with butter and cream',
    price: 240,
    image: 'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Main Course',
    isVeg: true,
    isSpicy: false,
    popular: true,
    tags: ['punjabi', 'lentil', 'creamy']
  },
  
  // Items for other restaurants would follow a similar pattern
  // Gujarati Thali items
  {
    id: '401',
    restaurantId: '4',
    name: 'Special Gujarati Thali',
    description: 'Complete meal with 3 sabzis, dal, kadhi, rotis, rice, papad, and dessert',
    price: 320,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Thali',
    isVeg: true,
    isSpicy: false,
    popular: true,
    tags: ['gujarati', 'thali', 'complete meal']
  },
  
  // Biryani House items
  {
    id: '501',
    restaurantId: '5',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic long grain rice cooked with tender chicken pieces and authentic spices',
    price: 380,
    image: 'https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Biryani',
    isVeg: false,
    isSpicy: true,
    popular: true,
    tags: ['hyderabadi', 'biryani', 'spicy']
  },
  
  // Bengali Corner items
  {
    id: '601',
    restaurantId: '6',
    name: 'Macher Jhol',
    description: 'Traditional Bengali fish curry cooked with potatoes and spices',
    price: 290,
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bengali Specials',
    isVeg: false,
    isSpicy: false,
    popular: true,
    tags: ['bengali', 'fish', 'traditional']
  }
];