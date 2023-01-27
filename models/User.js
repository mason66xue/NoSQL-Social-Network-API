const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'please enter a valid email'],
        },
         thoughts: [toughtSchema],
         friends: [userSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;