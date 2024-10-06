const express = require('express');
const employeeRoutes = require('./employeeRoutes');
const authRoutes = require('./authRoutes');
const transactionRoutes = require('./transactionRoute')
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes); 
router.use('/list_employee', authenticate, employeeRoutes); 
router.use('/postdata', authenticate, transactionRoutes);

module.exports = router;
