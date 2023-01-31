const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

    //get all thought
    getThought(req, res) {
        Thought.find({})
            .then((thought) => {
                console.log(thought);
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },

    //get a thought 
    getSingleThought(req, req) {
        Thought.findOne({
            _id: req.params.thoughtId
        })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought 
    createThought(req, req) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //delete thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists' })
                    : Thought.findOneAndUpdate(
                        { thought: req.params.thoughtId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'thought deleted'
                    })
                    : res.json({ message: 'sucessfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add reaction to a thought 
    addReaction(req, res) {
        console.log('you are adding a reaction');
        console.log(req.body);
        student.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidator: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove a reaction from thought 
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: { $In: [req.params.reactionId] } } } },
            { runValidator: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought with this Id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },



};