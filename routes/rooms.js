const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/rooms - Create a room
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingRoom = await Room.findOne({ name });
    if (existingRoom)
      return res.status(400).json({ message: 'Room already exists' });

    const newRoom = new Room({
      name,
      description,
      createdBy: req.user.userId
    });

    await newRoom.save();
    res.status(201).json({ message: 'Room created', room: newRoom });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create room', error: err.message });
  }
});

// GET /api/rooms - List all rooms
router.get('/', authMiddleware, async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });
  res.status(200).json(rooms);
});

// DELETE /api/rooms/:roomId - Delete room
router.delete('/:roomId', authMiddleware, async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (room.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Only creator can delete this room' });

    await room.deleteOne();
    res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting room', error: err.message });
  }
});

module.exports = router;
