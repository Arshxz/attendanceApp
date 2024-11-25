const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/login', facultyController.login);
router.post('/login', facultyController.authenticate);
router.get('/dashboard', facultyController.dashboard);
router.get('/rescheduleClass', facultyController.rescheduleClass);
router.post('/rescheduleClass', facultyController.submitReschedule);
router.get('/approveLeaves', facultyController.approveLeaves);
router.post('/approveLeave', facultyController.processLeave);
router.get('/markAttendance', facultyController.markAttendance);
router.post('/markAttendance', facultyController.submitAttendance);

module.exports = router;