import { Books } from 'models';
import uuid from 'uuid';

export const getAllBooksView = async (req, res, next) => {
  try {
    const books = await Books.find().select('-__v');

    res.render('index', {
      title: 'Библиотека',
      books,
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
    });
  } catch (err) {
    next(err);
  }
};

export const getBookInfo =
  (isUpdate: Boolean) =>
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await Books.findById(id).select('-__v');

      if (!book) {
        res.status(404).redirect('/404');
      }

      if (isUpdate) {
        res.render('books/update', {
          title: 'update | ' + book.title,
          book,
          isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
        });
      } else {
        res.render('books/view', {
          title: book.title,
          book,
          isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
          user: req.user,
        });
      }
    } catch (err) {
      next(err);
    }
  };

export const postBookUpdate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { title, description, authors } = req.body;

    await Books.findByIdAndUpdate(
      id,
      { title, description, authors },
      {
        lean: true,
        returnDocument: 'after',
      },
    );

    res.redirect('/books/' + id);
  } catch (err) {
    next(err);
  }
};

export const getBookCreate = async (req, res) => {
  res.render('books/create', {
    title: 'create | book',
    book: { title: '', description: '', authors: [] },
    isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
  });
};

export const postBookCreate = async (req, res, next) => {
  try {
    const { title, description, authors } = req.body;

    const newBook = new Books({
      fileBook: 'test',
      fileName: 'test',
      id: uuid.v4(),
      title,
      description,
      authors,
      favorite: 'test',
    });

    await newBook.save();

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
