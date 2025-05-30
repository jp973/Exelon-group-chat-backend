const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const membershipRoutes = require('./routes/memberships');
const messageRoutes = require('./routes/messages');

dotenv.config();

const app = express();
app.use(express.json());

// Routes (will be added later)
app.get('/', (req, res) => {
  res.send('Group Chat API is running...');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));


app.use('/api/auth', authRoutes);

app.use('/api/rooms', roomRoutes);

app.use('/api/rooms', membershipRoutes);

app.use('/api/rooms', messageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
