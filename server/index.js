require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// 1. First require your models (BEFORE connecting)
require('./models/User'); // This registers the User model
require('./models/Guest'); // This registers the Guest model

// 2. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB Connected');
     // Load collection monitor
     const checkDB = require('./utils/db-status');
     await checkDB();
     
  // 3. 👇 ADD COLLECTION CREATION CODE HERE 👇
  const createCollections = async () => {
    const models = ['User', 'Guest']; // Your model names
    
    for (const model of models) {
      const collectionName = model.toLowerCase() + 's'; // 'users', 'guests'
      if (!mongoose.connection.collections[collectionName]) {
        await mongoose.connection.createCollection(collectionName);
        console.log(`🆕 Created collection: ${collectionName}`);
      }
    }
  };
  
  await createCollections(); // Execute collection creation
  // 4. 👆 END OF COLLECTION CODE 👆
  
  // Now start Express server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guestmgmt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s
})
.then(() => {
    console.log('✅ MongoDB Connected to DB:', mongoose.connection.name);
    console.log('📊 Collections:', mongoose.connection.collections);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('Is MongoDB running? Try: mongod --version');
  });

// Routes
app.use('/api/auth', authRoutes);

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

await createCollections();

// Add indexes
await mongoose.model('User').createIndexes(); // Creates indexes defined in UserSchema
await mongoose.model('Guest').createIndexes();
console.log('🔑 Database indexes created');