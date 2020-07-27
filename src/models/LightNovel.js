import mongoose from 'mongoose';

const lightNovelSchema = new mongoose.Schema({
  title: String,
  author: String,
  status: String,
  coverLink: String, //readmanhua
  summary: String,
  categories: [String],
  tags: [String],
  scrapingFrom: String, // supportedPages -> e.g. (lightnovelworld)
  lastChap: String, // last scraped Chapter
  nextChap: String,
  chapterCount: Number,
  chapter: [
    {
      date: { type: Date, default: Date.now },
      title: String,
      chapter: Number, // id -> chapter >182< <-- this
      content: Array,
    },
  ],
});

const LightNovel = mongoose.model('LightNovel', lightNovelSchema);
export default LightNovel;
