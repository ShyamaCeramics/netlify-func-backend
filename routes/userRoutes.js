const express = require('express');
const funcs = require("../controllers/userController");

const getUserDetails = funcs.getUserDetails;
const saveUserDetails = funcs.saveUserDetails;

const router = express.Router();

router.get('/fetch', getUserDetails);
router.post('/save', saveUserDetails);

module.exports = router;
