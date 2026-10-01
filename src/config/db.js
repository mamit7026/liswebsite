const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lis_informatics';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] MongoDB connection failed: ${error.message}`);
    isConnected = false;
    // Don't crash the server - allow fallback or delayed reconnection
    return null;
  }
};

const getStatus = () => ({
  connected: isConnected && mongoose.connection.readyState === 1,
  host: mongoose.connection?.host || 'Disconnected',
  name: mongoose.connection?.name || 'None',
  readyState: mongoose.connection.readyState
});

module.exports = { connectDB, getStatus };
