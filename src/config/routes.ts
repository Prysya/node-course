export const routes = {
  basePath: '/',
  apiBasePath: '/api',

  user: {
    basePath: '/user',
    userPage: '/me',
    login: '/login',
    signup: '/signup',
    logout: '/logout',
  },

  books: {
    basePath: '/books',
    create: '/create',
    bookId: '/:id',
    edit: '/:id/edit',
  },
} as const;
