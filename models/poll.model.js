const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: [{ name: { type: String, required: true }, votes: { type: Number, default: 0 } }]
}, { timestamps: true }
);

module.exports = mongoose.model('Poll', Poll);
