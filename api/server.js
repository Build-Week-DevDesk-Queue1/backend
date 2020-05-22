const express = require('express');
const cors = require('cors');
const server = express();
const usersRouter = require('./users/usersRouter.js')
const ticketsRouter = require('./tickets/ticketsRouter.js')

// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use('/api/users', usersRouter)
server.use('/api/tickets', ticketsRouter)

module.exports = server;