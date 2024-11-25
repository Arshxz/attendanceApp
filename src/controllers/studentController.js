const db = require('../config/db.sql');

exports.login = (req, res) => {
  res.render('student/login');
};

exports.authenticate = (req, res) => {
  const { email, password } = req.body;
  // Verify credentials
  db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (results.length > 0) {
      req.session.userId = results[0].user_id;
      res.redirect('/student/dashboard');
    } else {
      res.send('Invalid credentials');
    }
  });
};

exports.dashboard = (req, res) => {
  res.render('student/dashboard');
};

exports.schedule = (req, res) => {
  db.query('SELECT * FROM Students WHERE user_id = ?', [req.session.userId], (err, result) => {
    res.render('student/schedule', { schedule: result[0].class_schedule });
  });
};

exports.applyLeave = (req, res) => {
  res.render('student/applyLeave');
};

exports.submitLeave = (req, res) => {
  const { leaveDate } = req.body;
  db.query('INSERT INTO Leave_Requests (student_id, leave_date, status) VALUES (?, ?, ?)', [req.session.userId, leaveDate, 'pending'], (err, result) => {
    if (err) throw err;
    res.send('Leave applied successfully');
  });
};

exports.attendance = (req, res) => {
  db.query('SELECT * FROM Attendance WHERE student_id = ?', [req.session.userId], (err, result) => {
    res.render('student/attendance', { attendance: result });
  });
};