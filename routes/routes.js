const express = require('express');
const employeeRoutes = require('./employeeRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRoutes); 
router.use('/employees', employeeRoutes); 

module.exports = router;
