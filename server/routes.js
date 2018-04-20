
const twitterController = require('./controllers/twitterController');

module.exports = app => {
    app.get('/api/analyze', twitterController.getUserTweets);
}