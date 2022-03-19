const uuid = require("uuid");

const {randMovie, randLine, randFullName, randDirectoryPath, randFileName, randBoolean} = require('@ngneat/falso');

module.exports.Book = class {
  constructor({
    id = uuid.v4(),
    title = randMovie(),
    description = randLine({ lineCount: 2 }),
    authors = [...Array(Math.floor(Math.random() * 3 + 1))].map(randFullName),
    favorite = randBoolean().toString(),
    fileCover = randDirectoryPath({ length: 2 }).join(""),
    fileName = randFileName({ extension: "jpg" }),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
};
