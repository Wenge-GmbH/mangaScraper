import mongoose from 'mongoose';

const mangaSchema = new mongoose.Schema({
  title: String,
  slug: String,
  scrapeURL: String,
  scrapeSite: String, //readmanhua
  newestChapter: Number,
  chapter: [
    {
      chaplerone: Number, // id -> chapter >182< <-- this
      images: [
        String, //s
      ],
    },
  ],
});

const Feed = mongoose.model('Feed', mangaSchema);
export default Feed;
