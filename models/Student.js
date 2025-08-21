const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  state: {
    type: String,
    required: [true, 'State/Governorate is required'],
    trim: true,
    maxlength: [50, 'State/Governorate cannot exceed 50 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country cannot exceed 50 characters']
  },
  schoolName: {
    type: String,
    required: [true, 'School name is required'],
    trim: true,
    maxlength: [100, 'School name cannot exceed 100 characters']
  },
  grade: {
    type: String,
    required: [true, 'Grade/Year is required'],
    trim: true,
    maxlength: [20, 'Grade/Year cannot exceed 20 characters']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['registered', 'confirmed', 'participated', 'withdrawn'],
    default: 'registered'
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ state: 1 });
studentSchema.index({ country: 1 });
studentSchema.index({ schoolName: 1 });
studentSchema.index({ status: 1 });

// Ensure virtual fields are serialized
studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

// Add pagination plugin
studentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', studentSchema);
