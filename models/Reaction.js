const { Schema, Type } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),

        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280, 
        },
        userName: {
            type: String,
            required: true,

        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFomat(createdAtVal)
        }
    }
)

module.exports = reactionSchema; 