import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// On Save Hook, encrypt password
// "pre" -> Before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // has (encrypt) the password using salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

export default User;
