const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Membership = require('../models/Membership');
const authMiddleware = require('../middleware/authMiddleware');

// Send message to a room
router.post('/:roomId/messages', authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;

  try {
    const isMember = await Membership.findOne({ roomId, userId: req.user.userId });
    if (!isMember) return res.status(403).json({ message: 'Join the room first' });

    const message = new Message({
      roomId,
      userId: req.user.userId,
      content
    });

    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
});

// Get last N messages from a room
router.get('/:roomId/messages', authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const isMember = await Membership.findOne({ roomId, userId: req.user.userId });
    if (!isMember) return res.status(403).json({ message: 'Join the room first' });

    const messages = await Message.find({ roomId })
      .sort({ sentAt: -1 })
      .limit(limit)
      .populate('userId', 'email');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

module.exports = router;
