const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');

// /api/users
router.route('/users').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/users/:userId').get(getSingleUser);

module.exports = router;
