1. запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
   ```javascript
    db.books.insertMany([ 
      { title: title1, description: description1, authors: authors1}, 
      { title: title2, description: description2, authors: authors2}, 
      { title: title3, description: description3, authors: authors3}, 
    ])
    ``` 
2. запрос для поиска полей документов коллекции books по полю title
   ```javascript
    db.books.find({
      title: {
        "$exists": value
      }
    })
    ``` 
3. запрос для редактирования полей: description и authors коллекции books по \_id записи

   ```javascript
    db.books.updateOne([ 
      { _id: id }, 
      { $set: { description: newDescription, authors: newAuthors }}
    ])
    ``` 
