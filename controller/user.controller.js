const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const pool = require('../connection');

// create user
const createUser = async (req, res) =>{
    try{
        const id = `ct-${uuidv4().slice(0,5)}`
        const join_date =new Date();
        const {name, email,   gender} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
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
// login user 
const loginUser = (req, res) => {
    try{
        const {emailOrId, password} = req.body;
        const query = 'SELECT * FROM users WHERE email=? OR id=?';
        pool.query(query,[emailOrId, emailOrId], async  (err, user)=> {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else if  (user && user.length > 0) {
                const isPasswordValid = await bcrypt.compare(password, user[0].password);
                 if (isPasswordValid) {
                    const token = jwt.sign(
                        {id: user[0].id,
                        email: user[0].email},
                        process.env.JWT_SECRET, {expiresIn: '1h'}
                    );
                    res.status(200).json({
                        status: true,
                        message: "Authentication successful",
                        access_token: token
                    });
                 } else {
                    res.status(401).json({
                        status: false,
                        message: "Authentication failed! Incorrect Password",   
                    });
                 }
            } else {
                res.status(440).json({
                    status: true,
                    message: "User not found",
                });
            }
        })
    }catch{
        res.status(500).json({
            status: false,
            message: "There was server side error"
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
    getAllUsers,
    loginUser
}