# Exelon Group Chat Backend

A Node.js and MongoDB backend for a Group Chat Application built as part of the Exelon internship assignment. This backend provides secure user authentication, chat room management, membership tracking, and real-time-style messaging support via polling.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register and login with JWT & bcrypt
- 💬 **Chat Room Management**
  - Create, delete, and list chat rooms
- 👥 **Room Membership**
  - Join and leave rooms
  - View rooms joined by a user
- 📩 **Messaging**
  - Post messages to a room
  - Retrieve last N messages per room
- 📦 **MongoDB Collections**
  - Users, Rooms, Memberships, Messages with proper indexing

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- Postman for API testing

---

## 📁 Folder Structure
group-chat-app/
├── models/ # Mongoose models (User, Room, Membership, Message)
├── routes/ # API routes
├── middleware/ # JWT auth middleware
├── server.js # Entry point
├── .env # Environment variables
├── package.json # Dependencies
├── postman_collection.json # Postman collection for testing



---

## 🔑 API Endpoints Overview

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT

### Rooms
- `POST /api/rooms` – Create room
- `GET /api/rooms` – List all rooms
- `DELETE /api/rooms/:roomId` – Delete a room

### Membership
- `POST /api/rooms/:roomId/join` – Join a room
- `POST /api/rooms/:roomId/leave` – Leave a room
- `GET /api/users/:userId/rooms` – List rooms a user has joined

### Messages
- `POST /api/rooms/:roomId/messages` – Send a message
- `GET /api/rooms/:roomId/messages?limit=N` – Get last N messages

---

## 🧪 Postman Collection

Import `postman_collection.json` into Postman to test all endpoints. JWT token needs to be added in the headers (`Authorization: Bearer <token>`) for protected routes.

---

## ⚙️ Setup & Run

```bash
git clone https://github.com/jp973/Exelon-group-chat-backend.git
cd Exelon-group-chat-backend
npm install

# Create a .env file with the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/group-chat
JWT_SECRET=your_jwt_secret

# Start the server
npm run dev


