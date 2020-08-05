import mongoose from 'mongoose';

// helpfull link
// https://stackoverflow.com/questions/29078753/how-to-reference-another-schema-in-my-mongoose-schema
const novelChapterSchema = new mongoose.Schema({
  content: Array,
});

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
      content: { type: mongoose.Schema.Types.ObjectId, ref: 'NovelChapter' },
    },
  ],
});

lightNovelSchema.pre('validate', function (next) {
  this.chapterCount = this.chapters.length;
  next();
});

export const NovelChapter = mongoose.model('NovelChapter', novelChapterSchema);
export const LightNovel = mongoose.model('LightNovel', lightNovelSchema);
