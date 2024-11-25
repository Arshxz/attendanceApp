const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const studentRoutes = require('./src/routes/studentRoutes');
const facultyRoutes = require('./src/routes/facultyRoutes');

const app = express();
// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static('public'));


// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Arsh',
  password: '12345678',
  database: 'student_faculty_portal'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Routes
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Student-Faculty Portal!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});