const express = require('express');
const router = express.Router();
const { authUser, registerUser, getAllUsers, updateUserBlockStatus, getUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/', registerUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getAllUsers);
router.put('/:id/block', protect, admin, updateUserBlockStatus);

module.exports = router;
