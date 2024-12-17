const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
 return !users.includes(username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.find(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;
  if( username && password){
    if(authenticatedUser(username,password)){
      let accessToken = jwt.sign({
        data: username
    }, 'fingerprint_customer', { expiresIn: 60 * 60 });
    req.session.authorization = {
        accessToken, username
    };
    return res.status(200).send("User successfully logged in");
    }else{
      return res.status(401).json({message: "Invalid credentials"});
    }
  }else{
    return res.status(400).json({message: "Invalid input"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization['username'];
  const isbn = req.params.isbn;
  const review = req.body.review;
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  if (!review) {
    return res.status(400).json({message: "Invalid input"});
  }
  if(books[isbn].reviews[username]){
    books[isbn].reviews[username] = review;
    return res.status(200).json({message: "Review updated successfully"});
  }
  if(!books[isbn].reviews[username]){
    books[isbn].reviews[username] = review;
    return res.status(200).json({message: "Review created successfully"});
  }
  
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization['username'];
  const isbn = req.params.isbn;
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  if(!books[isbn].reviews[username]){
    return res.status(400).json({message: "Review not found from you"});
  }
  if(books[isbn].reviews[username]){
    delete books[isbn].reviews[username];
    return res.status(200).json({message: "Review deleted successfully"});
  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
