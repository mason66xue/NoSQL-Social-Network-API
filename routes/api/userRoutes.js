const router = require('express'). Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} =require('../../controllers/userController');

// get all user 
router.route('/')
.get(getAllUsers)
.post(createUser);

//get single user 
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('./:userId/friends/:friendId')
.post(createUser)
.delete(deleteUser);

module.exports = router;