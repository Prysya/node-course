const uuid = require("uuid");

const {
  randMovie,
  randLine,
  randFullName,
  randDirectoryPath,
  randBoolean,
} = require("@ngneat/falso");

const { generatePathToBook } = require("../utils");

module.exports = class {
  constructor({
    id = uuid.v4(),
    title = randMovie(),
    description = randLine({ lineCount: 2 }),
    authors = [...Array(Math.floor(Math.random() * 3 + 1))].map(randFullName),
    favorite = randBoolean().toString(),
    fileCover = randDirectoryPath({ length: 2 }).join(""),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = `book_${id}`;
    this.fileBook = generatePathToBook(id);
  }
};
