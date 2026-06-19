import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';
import { connectDb, printMongoHelp } from './db/connect.js';

dotenv.config();

const menuItems = [
  {
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle, parmesan, and herb aioli.',
    price: 14,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1633504581789-909db05892fd?w=800&q=80',
    isFeatured: true,
    isVegetarian: true,
  },
  {
    name: 'Seared Scallops',
    description: 'Pan-seared scallops on cauliflower purée with lemon butter sauce.',
    price: 18,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a98570f61?w=800&q=80',
    isFeatured: true,
  },
  {
    name: 'Charred Octopus',
    description: 'Grilled octopus with smoked paprika, chickpeas, and romesco.',
    price: 16,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    name: 'Burrata & Heirloom Tomatoes',
    description: 'Creamy burrata, basil oil, aged balsamic, and flaky sea salt.',
    price: 15,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1695635730492-73989a91693e?w=800&q=80',
    isVegetarian: true,
  },
  {
    name: 'Herb-Crusted Lamb Rack',
    description: 'New Zealand lamb with rosemary jus, roasted root vegetables.',
    price: 38,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    isFeatured: true,
  },
  {
    name: 'Pan-Roasted Salmon',
    description: 'Atlantic salmon, dill cream, asparagus, and lemon caper relish.',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    isFeatured: true,
  },
  {
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice, porcini, shiitake, white wine, and pecorino.',
    price: 26,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    isVegetarian: true,
  },
  {
    name: 'Spicy Rigatoni Vodka',
    description: 'House-made rigatoni in creamy tomato vodka sauce with basil.',
    price: 24,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    isVegetarian: true,
    isSpicy: true,
  },
  {
    name: 'Wagyu Beef Burger',
    description: 'A5 wagyu patty, brioche bun, aged cheddar, caramelized onions.',
    price: 28,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with vanilla bean ice cream.',
    price: 12,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?w=800&q=80',
    isFeatured: true,
    isVegetarian: true,
  },
  {
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard with caramelized sugar crust.',
    price: 10,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80',
    isVegetarian: true,
  },
  {
    name: 'Tiramisu',
    description: 'Espresso-soaked ladyfingers, mascarpone, cocoa dust.',
    price: 11,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    isVegetarian: true,
  },
  {
    name: 'Old Fashioned',
    description: 'Bourbon, bitters, orange peel, and a Luxardo cherry.',
    price: 14,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
  },
  {
    name: 'House Red Wine',
    description: 'Glass of our selected Cabernet Sauvignon from Napa Valley.',
    price: 12,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    isVegetarian: true,
  },
  {
    name: 'Sparkling Elderflower',
    description: 'Refreshing non-alcoholic sparkling drink with elderflower.',
    price: 8,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    isVegetarian: true,
  },
];

async function seed() {
  try {
    await connectDb();
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    console.log(`Seeded ${menuItems.length} menu items`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    printMongoHelp(error);
    process.exit(1);
  }
}

seed();
