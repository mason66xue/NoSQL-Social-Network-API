const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

//aggregate function to get the number of thought overall 

const thoughtCount = async () =>
    Thought.aggregate()
        .count('thoughtCount')
        .then((numberOfThought) => numberOfThought);


const reactionCount = async (thoughtId) =>
    Thought.aggregate([
        { $match: { _id: ObjectId(thoughtId) } },
        { $unwind: '$reactions' },
        {
            $group: {
                _id: ObjectId(thoughtId),
                reactionNum: { $count: '$reactions' }
            }
        }
    ])



module.exports = {

    //get all thought
    getThought(req, res) {
        Thought.find({})
            .then(async(thought) => {
                const thoughtOj ={
                    thoughts,
                    thoughtCount: await thoughtCount(),
                }
                return res.json(thoughtOj)
            })
            .catch((err) => res.status(500).json(err));
    },

    //get a thought 
    getSingleThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId
        })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json({
                        thought,
                        reactionCount: await reactionCount(req.params.thoughtId),

                    })
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought 
    createThought(req, res){
        Thought.create(req.body)
            .then(async (thought) => {
                try {
                    const user = await User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $push: { thoughts: thought._id } },
                        { new: true }
                    );
                    res.json(thought);
                } catch (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //update thought 
    updateThought(req, res){
        Thought. findOneAndUpdate(
            {_id:req.params.thoughtId},
            req.body,
            {new: true}
        )
        .then ((thought)=> {
            if (!thought){
                return res.status(404).json({message: 'Thought not found'});
            }
            res.json(thought);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
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