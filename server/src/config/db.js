import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  let mongoURI = process.env.MONGO_URI;
  console.log(`The URI: ${mongoURI}`);

  // Check if there's an existing connection or if the URI is the same
  if (mongoose.connection.readyState === 1 && mongoose.connection._connectionString === mongoURI) {
    console.log('Using existing MongoDB connection');
    return;
  }

  // Close existing connections before creating a new one, especially for testing
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

  const db = mongoose.connection;

  db.on('connected', () => console.log('Mongoose connection is open to', mongoURI));
  db.on('error', err => console.log('Mongoose connection error:', err));
  db.on('disconnected', () => console.log('Mongoose connection is disconnected'));

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('Mongoose says bye...');
      process.exit(0);
    });
  });
};

// Call connectDB() only if not running tests
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

export default connectDB;
