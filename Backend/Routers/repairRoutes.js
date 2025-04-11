const express = require('express');
const router = express.Router();
const { addRepair } = require('../controllers/repairController');

router.post('/repairs', addRepair);

module.exports = router;
