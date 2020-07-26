import mongoose from 'mongoose';

export default ({ app }) => {
  const db = mongoose.connection;
  app.context.db = db;

  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('connected to mongodb');
      }
    }
  );
};
