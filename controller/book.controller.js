const pool = require('../connection');
const { v4: uuidv4 } = require('uuid');
// save book
const saveBookWithUserRelation = async (req, res) => {
  try {
    const id = uuidv4().slice(0,6)
    const { title, price, description, author, rating, release_date, user } = req.body;
    const query = `
      INSERT INTO books (id, title, price, description, author, rating, release_date, user)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
   pool.query(query, [id, title, price, description, author, rating, release_date, user], (err, result) => {
        if (err) { 
            res.status(500).json({ error: err.message });
        } else {       
            res.status(200).json({ message: 'Book added successfully',data: result });
        }
    });
  } catch (err) {
    res.json({
        message: `${err.message}` 
      })
  }
};

// get all book 
const getAllBooks = (req, res) => {
    try{
        const query = `SELECT books.*, users.name AS user_name, users.email AS user_email FROM books INNER JOIN users ON books.user = users.id`;
        pool.query(query, (err, results) => {
            if (err) {
                res.status(500).json({status: false, error: err.message });
            } else {
                res.status(200).json({ status: true,data: results });
            }
        })

    } catch  (err) {
        res.status(500).json({
            status: false,
            message: "There was a server side error"
          })
      }
}

// update a book
const updateBook = (req, res) =>{
    try{
        const {id} = req.params;
        const { title, price, description, author, rating, release_date } = req.body;
        const query = `
          UPDATE books
          SET title = ?, price = ?, description = ?, author = ?, rating = ?, release_date = ?
          WHERE id = ? 
    `;
        pool.query(query, [title, price, description, author, rating, release_date, id], (err, result) => {
            if (err) {
                res.status(500).json({status: false, error: err.message });
            } else {
                res.status(200).json({ status: true, data: result });
            }
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "There was a server side error"
          })
    }
}

module.exports = {
  saveBookWithUserRelation,
  getAllBooks,
  updateBook
};
