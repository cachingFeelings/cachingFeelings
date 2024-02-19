import mongoose from 'mongoose';

require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

mongoose.connect(mongoURI, options)
.then(() => console.log('MongoDB connection established'))
.catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('connected', () => console.log('Mongoose connection is open to', mongoURI));
db.on('error', err => console.log('Mongoose connection error:', err));
db.on('disconnected', () => console.log('Mongoose connection is disconnected'));

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection is disconnected due to application termination');
    process.exit(0);
  });
});