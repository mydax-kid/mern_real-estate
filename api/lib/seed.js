import { MongoClient} from 'mongodb';
import { listData } from '../../client/src/lib/dummydata.js';

//Your MongoDB connection string
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Your database name
    const database = client.db('estate'); 
    const collection = database.collection('Post');

    // Clear existing data
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(listData);
    console.log('Data seeded successfully');
  } 
  catch (error) {
    console.error('Error seeding data:', error);
  } 
  finally {
    await client.close();
  }
}


