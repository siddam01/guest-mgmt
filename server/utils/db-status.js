// server/utils/db-status.js
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Active Collections:');
    collections.forEach(c => console.log(`- ${c.name}`));
    
    // Verify specific collections
    const requiredCollections = ['users', 'guests'];
    requiredCollections.forEach(col => {
      const exists = collections.some(c => c.name === col);
      console.log(exists ? `✅ ${col}` : `❌ ${col} (MISSING)`);
    });
  } catch (err) {
    console.error('🔴 Database check failed:', err);
  }
};