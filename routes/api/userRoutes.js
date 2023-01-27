const router = require('express'). Router();
const {
    getUser,
    getSingleUser,
    createUser,
} =require('../controllers/userController');

// get all user 
router.route('/')
.get(getUser)
.post(createUser);

//get single user 
router.route('/:userId')
.get(getSingleUser);