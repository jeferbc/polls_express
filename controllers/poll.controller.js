const Poll = require('../models/poll.model.js');

// Render new Poll form
exports.new = (req, res) => {
  res.render('new_poll')
};

// Create and Save a new Poll
exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  const polls = Poll.find()
  res.render('polls/index', { polls: polls })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
