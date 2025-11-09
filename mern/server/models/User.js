import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Junior', 'Mid', 'Senior'], // Example levels, adjust as needed
  },
}, {
  collection: 'records',
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

const User = mongoose.model('User', userSchema);

export default User;