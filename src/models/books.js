const {Schema, model} = require('mongoose');

const booksSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  favorite: {
    type: String,
    required: true
  },
  fileCover: {
    type: String,
    default: 'https://source.unsplash.com/random/'
  },
  fileName: {
    type: String,
    required: true
  }
})

module.exports = model('book', booksSchema);
