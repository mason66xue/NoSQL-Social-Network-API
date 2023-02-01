const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    //get all users 
    getAllUsers(req, res){
        User.find({})
            .then((users) =>{
                console.log(users);
                res.json(users)
            })
            .catch((err)=>res.status(500).json(err))
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .select('--v')
        .populate({
            path: 'thoughts',
            model: 'user'    
        })
        .populate({
            path: 'friends',
            model: 'user'
        })
        .then((user) =>
        !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        })
    }, 
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user
            ? res.status(404).json({message: "No user with that ID"})
            : Thought.deleteMany({_id: {$in: user.thoughts}})
        )
        .then(()=>
            res.json({message: 'User and Thoughts deleted'}))
            .catch((err)=>{
                console.log(err)
                return res.status(500).json(err)
            })
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user 
              ? res.status(404).json({message: "No user with that id!"})
              : res.json(user)
        })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json(err);
        })
    }
}