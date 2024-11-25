const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/login', studentController.login);
router.post('/login', studentController.authenticate);
router.get('/dashboard', studentController.dashboard);
router.get('/schedule', studentController.schedule);
router.get('/applyLeave', studentController.applyLeave);
router.post('/applyLeave', studentController.submitLeave);
router.get('/attendance', studentController.attendance);

module.exports = router;