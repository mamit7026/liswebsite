require('dotenv').config();
const { connectDB } = require('./db');
const Solution = require('../models/Solution');
const Product = require('../models/Product');
const { solutionsData, productsData } = require('./seedData');

const seedDatabase = async () => {
  console.log('[Seed] Connecting to database...');
  await connectDB();

  try {
    const solutionCount = await Solution.countDocuments();
    if (solutionCount === 0) {
      console.log('[Seed] Seeding Solutions...');
      await Solution.insertMany(solutionsData);
      console.log(`[Seed] Inserted ${solutionsData.length} solutions.`);
    } else {
      console.log(`[Seed] Solutions already exist (${solutionCount} records).`);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[Seed] Seeding Products...');
      await Product.insertMany(productsData);
      console.log(`[Seed] Inserted ${productsData.length} products.`);
    } else {
      console.log(`[Seed] Products already exist (${productCount} records).`);
    }

    console.log('[Seed] Database initialization completed successfully.');
  } catch (err) {
    console.error('[Seed Error] Failed to seed database:', err);
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;
