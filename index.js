const express = require('express');
const cors = require('cors');
const pool = require('./connection');
const createTableQuery = require('./model/user.model');
const createBooksTableQuery = require('./model/book.modle');
const userRoutes = require('./routers/user.router')
const bookRoutes = require('./routers/book.router')
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      // start server
    app.listen(PORT, ()=> {
     console.log(`server running on http://localhost:${PORT} and database connected`)
    })
      connection.release();
    }
  });

//   create tables 
pool.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } 
  });

pool.query(createBooksTableQuery, (err) => {
    if (err) {
      console.error('Error creating books table:', err);
    } 
  });

// create routes 

app.get('/', async(req, res) => {
    res.send('<h1>Server is Running and connect with database</h1>')
})
app.use('/user',userRoutes)

app.use('/book', bookRoutes)