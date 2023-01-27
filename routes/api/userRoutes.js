const router = require('express'). Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
} =require('../controllers/userController');

// get all user 
router.route('/')
.get(getUser)
.post(createUser);

//get single user 
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(removeUser);

router.route('./:userId/friends/:friendId')
.post(createUser)
.delete(removeUser);