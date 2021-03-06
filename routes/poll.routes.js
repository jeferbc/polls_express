module.exports = (app) => {
    const polls = require('../controllers/poll.controller.js');
    // Render poll form
    app.get('/polls/new', polls.new);

    // Create a new poll
    app.post('/polls', polls.create);

    // Retrieve all polls
    app.get('/', polls.findAll);

    // Retrieve a single poll with pollId
    app.get('/polls/:pollId', polls.findOne);

    // Render edit poll form
    app.get('/polls/:pollId/edit', polls.create);

    // Delete a poll with pollId
    app.get('/polls/:pollId/delete', polls.delete);

    // vote
    app.post('/polls/:pollId/vote', polls.vote);

    // results
    app.get('/polls/:pollId/results', polls.results);
}
