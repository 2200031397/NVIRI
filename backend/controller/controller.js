const connection = require('../db'); // Import from the new db.js
const jwt = require('jsonwebtoken');


const getLocations = (req, res) => {
  const sql = 'SELECT * FROM locations';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching locations:', err);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
};

const getApplianceSuggestions = (req, res) => {
  const searchTerm = req.query.q;
  const sql = 'SELECT * FROM appliances WHERE appliances LIKE ?';
  const values = [`%${searchTerm}%`];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching appliance suggestions:', err);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
};

const getFeaturedTechnicians = (req, res) => {
  const sql = 'SELECT * FROM technicians ORDER BY rating DESC LIMIT 10';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching featured technicians:', err);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
};

const loginTechnician = (req, res) => {
  const { email, password } = req.body;
  
  const query = 'SELECT * FROM technicians WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(404).send({ error: 'Technician not found' });
    const technician = results[0];
    console.log(technician);
    // Simple password comparison without bcrypt
    if (password !== technician.password) {
      return res.status(401).send({ error: 'Invalid password' });
    }

   

    res.status(200).send("success");
  });

};
  const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM user WHERE email = ?'; // Replace 'users' with your actual table name
    connection.query(query, [email], (err, results) => {
      if (err) return res.status(500).send({ error: err.message });
      if (results.length === 0) return res.status(404).send({ error: 'User not found' });
  
      const user = results[0];
  
      // Simple password comparison without bcrypt
      if (password !== user.password) {
        return res.status(401).send({ error: 'Invalid password' });
      }
  
      // Generate a token if needed
      // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).send("success"); // Optionally, send the token in the response
    });

  };

module.exports = { getLocations, getApplianceSuggestions, getFeaturedTechnicians, loginTechnician, loginUser };
