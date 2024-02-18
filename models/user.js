const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved, import/extensions
const { regexEmail } = require('../utils/regex.js');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => regexEmail.test(email),
        message: 'Введен некорректный адрес',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('user', userSchema);
