const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const Room = require('../models/Room');
const authMiddleware = require('../middleware/authMiddleware');

// Join Room
router.post('/:roomId/join', authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const newMembership = new Membership({
      roomId,
      userId: req.user.userId
    });

    await newMembership.save();
    res.status(201).json({ message: 'Joined room' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already joined' });
    }
    res.status(500).json({ message: 'Failed to join room', error: err.message });
  }
});

// Leave Room
router.post('/:roomId/leave', authMiddleware, async (req, res) => {
  const { roomId } = req.params;

  try {
    const membership = await Membership.findOneAndDelete({
      roomId,
      userId: req.user.userId
    });

    if (!membership)
      return res.status(404).json({ message: 'Not a member of this room' });

    res.status(200).json({ message: 'Left room' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to leave room', error: err.message });
  }
});

// List User's Rooms
router.get('/user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  if (userId !== req.user.userId)
    return res.status(403).json({ message: 'Unauthorized access' });

  try {
    const memberships = await Membership.find({ userId }).populate('roomId');
    const rooms = memberships.map((m) => m.roomId);
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user rooms', error: err.message });
  }
});

module.exports = router;
