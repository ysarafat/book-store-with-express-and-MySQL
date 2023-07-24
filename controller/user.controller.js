
const { v4: uuidv4 } = require('uuid');
const pool = require('../connection');
// create user
const createUser = async (req, res) =>{
    try{
        const id = `ct-${uuidv4().slice(0,5)}`
        const join_date = Date.now();
        const {name, email, password,  gender} = req.body;
        const query =  `
        INSERT INTO users (id, name, email, password, join_date, gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      pool.query(query, [id, name, email, password, join_date, gender], (err, result) => {
          if (err) { 
              res.status(500).json({ error: err.message });
          } else {       
              res.status(200).json({ message: 'User registered successfully',data: result });
          }
      });
  
    }
    catch(err) {
        res.json({
            message: `${err.message}` 
          })
    }
}
// get all users
const getAllUsers = async (req, res) => {
    try {
      const query = ` SELECT * FROM users`;
      pool.query(query,(err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'User registered successfully',data: results })
      }});
    } catch (err) {
        res.json({
            message: `${err.message}` 
          })
    }
  };
module.exports = {
    createUser,
    getAllUsers
}