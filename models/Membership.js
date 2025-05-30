const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now }
});

membershipSchema.index({ roomId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Membership', membershipSchema);
