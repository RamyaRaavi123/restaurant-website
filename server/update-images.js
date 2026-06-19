import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';
import { connectDb, printMongoHelp } from './db/connect.js';

dotenv.config();

const imageUpdates = [
  {
    name: 'Truffle Arancini',
    image: 'https://images.unsplash.com/photo-1633504581789-909db05892fd?w=800&q=80',
  },
  {
    name: 'Seared Scallops',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a98570f61?w=800&q=80',
  },
  {
    name: 'Burrata & Heirloom Tomatoes',
    image: 'https://images.unsplash.com/photo-1695635730492-73989a91693e?w=800&q=80',
  },
  {
    name: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?w=800&q=80',
  },
];

async function updateImages() {
  try {
    await connectDb();

    for (const item of imageUpdates) {
      const result = await MenuItem.updateOne({ name: item.name }, { image: item.image });
      console.log(`${item.name}: ${result.modifiedCount ? 'updated' : 'not found'}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error.message);
    printMongoHelp(error);
    process.exit(1);
  }
}

updateImages();
