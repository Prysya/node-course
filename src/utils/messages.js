module.exports = {
  errors: {
    notFound: 'Запрашиваемый ресурс не найден',
    bookNotCreate: 'Ошибка при создании книги',
  },
  success: {
    dataUpdateSuccess: 'Данные успешно обновлены',
    dataDeleteSuccess: 'Данные успешно удалены',
  },
  schemas: {
    isEmpty: 'Поле не может быть пустым',
    isRequired: 'Поле обязательно для заполнения',
  },
  user: {
    passwordIsNotValid:
      'Длинна пароля менее 8 символов, либо пароль не валиден',
    idIsNotFound: 'Нет пользователя с таким id',
    passwordTooShort: 'Длинна пароля должна быть не менее 8 символов',
    nameIsLongOrShort: 'Длинна поля username должна быть от 2 до 30 символов',
  },
  auth: {
    authIsSuccess: 'Авторизация прошла успешно',
    notAuthorised: 'Необходима авторизация',
    wrongUsernameOrPassword: 'Неправильный логин или пароль',
    logout: 'Вы успешно вышли с учетной записи',
    registrationIsSuccess: 'Регистрация прошла успешно',
    usernameIsNotUnique: 'Данный username уже зарегистрирован',
  },
};
