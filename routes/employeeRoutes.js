const express = require('express');
const { postEmployee, getEpmloyees } = require('../controllers/employeeController');

const router = express.Router();

router.post('/post_employee', postEmployee)
router.post('/list_employee', getEpmloyees);

module.exports = router;
