const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createAtVal => dateFormat(createAtVal),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON:{
            getters: true,
            virtual: true
        }
    },
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;