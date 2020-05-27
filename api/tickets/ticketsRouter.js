const express = require('express');
const Tickets = require('./ticketsModel.js');
// const { validateUserId, validateUser } = require('./usersMiddleware.js');
// const { userOnly } = require('../auth/restrictedMiddleware.js');
const router = express.Router();
// Create - POST
// To create a new ticket.
router.post('/', (req, res) => {
    Tickets.insert(req.body)
        .then(newTicket => {
            res.status(201).json(newTicket);
        })
        .catch(error => {
            res.status(500).json({message: `Error adding new ticket: ${error}`});
        })
});
// Retrieve - GET
// To retrieve a list of all tickets & filter through them using sortby, sortdir, and limit.
router.get('/', (req, res) => {
    Tickets.find(req.query)
        .then(tickets => {
            res.status(200).json(tickets);
        })
        .catch(error => {
            res.status(500).json({message: `Error retrieving all tickets: ${error}`});
        })
});
// To retrieve a single ticket by the Ticket ID.
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Tickets.findById(id)
    .then(ticket => {
        res.status(200).json(ticket);
    })
    .catch(error => {
        res.status(500).json({message: `Error retrieving ticket: ${error}`});
    })
    // res.status(200).json(req.ticket);
});
// Update - PUT
// To update a single ticket
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Tickets.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({message: `Error updating ticket profile: ${error}`});
        })
});
// Delete - DELETE
// To delete a single ticket
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Tickets.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json({message: `Error removing ticket from database: ${error}`});
        })
});
module.exports = router;