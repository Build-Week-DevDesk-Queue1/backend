const express = require('express');
const cors = require('cors');
const server = express();
const usersRouter = require('./users/usersRouter.js')
const ticketsRouter = require('./tickets/ticketsRouter.js')
const authRouter = require('./auth/authRouter')
// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use('/api/users', usersRouter)
server.use('/api/tickets', ticketsRouter)
server.use('/api/auth', authRouter)

module.exports = server;