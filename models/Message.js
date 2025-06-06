const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

messageSchema.index({ roomId: 1, sentAt: -1 }); // for fast recent messages retrieval

module.exports = mongoose.model('Message', messageSchema);
