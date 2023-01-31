const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

// api/thought

router.route('/')
.get(getThought)
.get(getSingleThought)
.post(createThought);

//api/thought/:thoughtID 
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);



module.exports = router;