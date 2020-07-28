import mongoose from 'mongoose';

const lightNovelSchema = new mongoose.Schema({
  title: String,
  author: String,
  status: String,
  coverImg: String, //readmanhua
  summary: String,
  categories: [String],
  tags: [String],
  scrapingFrom: String, // supportedPages -> e.g. (lightnovelworld)
  lastChap: String, // last scraped Chapter
  nextChap: String,
  chapterCount: Number,
  chapters: [
    {
      date: { type: Date, default: Date.now },
      title: String,
      chapter: String, // id -> chapter >182< <-- this
      content: Array,
    },
  ],
});

lightNovelSchema.pre('validate', function (next) {
  this.chapterCount = this.chapters.length;
  next();
});

const LightNovel = mongoose.model('LightNovel', lightNovelSchema);
export default LightNovel;
