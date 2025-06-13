import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },

  dateOfBirth: {
    type: Date
  },

  avatar: {
    type: String // URL to profile picture (optional)
  },

  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },

  lastFeeling: {
    type: String,
    enum: ['love', 'miss_you', 'happy', 'sad', 'angry', 'none'],
    default: 'none'
  },

  statusMessage: {
    type: String,
    default: ''
  },

  isOnline: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

// Create 2dsphere index for location search
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema)
export default User;