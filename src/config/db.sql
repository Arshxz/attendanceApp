const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Arsh',
  password: '12345678',
  database: 'student_faculty_portal'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

module.exports = connection;