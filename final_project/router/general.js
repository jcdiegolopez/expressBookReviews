const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
 const { username, password } = req.body;
      if( username && password){
            if(isValid(username)){
                  users.push({"username": username, "password": password});
                  return res.status(200).json({message: "User registered successfully"});
            }
            else{
                  return res.status(400).json({message: "User already exists"});
            }
      }
      else{
          return res.status(400).json({message: "Invalid input"});
      }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    if (!books[req.params.isbn]) {
        return res.status(404).json({message: "Book not found"});
    }
  return res.status(200).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    const book = Object.values(books).find(book => book.author === author);
    if (book) {
          res.json(book);
    } else {
          res.status(404).send('Book not found');
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);
    if (book) {
          res.json(book);
    } else {
          res.status(404).send('Book not found');
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    if (!books[isbn]) {
          res.status(404).send('Book review not found');
    } else {
          res.json(books[isbn].reviews);
    }
});

module.exports.general = public_users;
