var mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  slug: String,
  chapter: [
    {
      chaplerone: String,
      images: Array
    }
  ]
});

const Feed = mongoose.model('Feed', feedSchema);
module.exports = Feed;
