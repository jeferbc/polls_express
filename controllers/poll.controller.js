const Poll = require('../models/poll.model.js');

// Render new Poll form
exports.new = (req, res) => {
  res.render('polls/new_poll')
};

// Create and Save a new Poll
exports.create = (req, res) => {
  var poll = new Poll(req.body)
  poll.created_by = req.app.locals.user.username
  poll.save( (error, poll) => {
    if(error){
      res.render('polls/new_poll', { error: error.message })
    }else
      res.redirect('/')
  });
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
  const polls = await Poll.find()
  res.render('polls/index', { polls: polls })
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  res.render('polls/poll', { poll: poll })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  const poll = Poll.findById(req.params.pollId);
  if(poll.created_by === req.app.locals.user.username) {
    Poll.deleteOne({ poll });
    res.redirect('/');
  }else{
    res.redirect('/', { error: 'You cannot delete a poll that is not yours' })
  }
};

// Votes
exports.vote = async (req, res) => {
  var poll = await Poll.findById(req.params.pollId);
  votes = poll.options[req.body.options].votes + 1
  poll.options[req.body.options].votes = votes
  await poll.save();

  res.redirect('/polls/' + poll._id + '/results')
}

exports.results = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  res.render('polls/results', { poll: poll })
}
