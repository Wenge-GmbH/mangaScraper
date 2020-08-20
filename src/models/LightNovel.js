import mongoose from 'mongoose';

// helpfull link
// https://stackoverflow.com/questions/29078753/how-to-reference-another-schema-in-my-mongoose-schema
const novelChapterSchema = new mongoose.Schema({
  content: Array,
});

const lightNovelSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, lowercase: true }, // add custom setter {set: () => {}} https://mongoosejs.com/docs/schematypes.html -> All Schema Types
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
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  chapters: [
    {
      date: { type: Date, default: Date.now },
      title: String,
      chapter: String, // id -> chapter >182< <-- this
      content: { type: mongoose.Schema.Types.ObjectId, ref: 'NovelChapter' },
    },
  ],
});

lightNovelSchema.pre('save', function (next) {
  this.updated = Date.now();
  return next();
});

lightNovelSchema.pre('validate', function (next) {
  this.chapterCount = this.chapters.length;
  next();
});

export const NovelChapter = mongoose.model('NovelChapter', novelChapterSchema);
export const LightNovel = mongoose.model('LightNovel', lightNovelSchema);
