const db = require('../config/db.sql'); // Assuming db is correctly set up

// Login page
exports.login = (req, res) => {
  res.render('faculty/login'); // Renders login page for faculty
};

// Authenticate faculty login
exports.authenticate = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Faculty WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length > 0) {
      req.session.userId = results[0].user_id;
      res.redirect('/faculty/dashboard'); // Redirect to dashboard after successful login
    } else {
      res.send('Invalid credentials');
    }
  });
};

// Faculty dashboard
exports.dashboard = (req, res) => {
  // Query to get faculty details or dashboard data if necessary
  db.query('SELECT * FROM Faculty WHERE user_id = ?', [req.session.userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('faculty/dashboard', { faculty: result[0] }); // Render dashboard with faculty data
  });
};

// Reschedule class page
exports.rescheduleClass = (req, res) => {
  res.render('faculty/rescheduleClass'); // Renders page to reschedule class
};

// Submit reschedule request
exports.submitReschedule = (req, res) => {
  const { classId, newSchedule } = req.body;
  db.query('UPDATE Faculty SET assigned_classes = ? WHERE user_id = ?', [newSchedule, req.session.userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Class rescheduled successfully');
  });
};

// Approve leave requests
exports.approveLeaves = (req, res) => {
  db.query('SELECT * FROM Leave_Requests WHERE status = "pending"', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('faculty/approveLeaves', { leaveRequests: result }); // Display pending leave requests
  });
};

// Process leave request (approve or reject)
exports.processLeave = (req, res) => {
  const { leaveId, status } = req.body; // Status can be 'approved' or 'rejected'
  db.query('UPDATE Leave_Requests SET status = ? WHERE leave_id = ?', [status, leaveId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Leave request processed');
  });
};

// Mark attendance page
exports.markAttendance = (req, res) => {
  res.render('faculty/markAttendance'); // Renders the page to mark attendance for students
};

// Submit attendance for students
exports.submitAttendance = (req, res) => {
  const { studentId, date, status } = req.body; // status: 'present', 'absent', etc.
  db.query('INSERT INTO Attendance (student_id, date, status) VALUES (?, ?, ?)', [studentId, date, status], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Attendance marked successfully');
  });
};