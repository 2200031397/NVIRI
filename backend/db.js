const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'charan123@',
  database: 'nviri_db',
};

// Create MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to MySQL
connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1); // Exit process if connection fails
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
