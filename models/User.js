const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: (value) => {
                    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value);
                },
                message: 'Not a valid email'
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },],
    }
);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

const User = model('user', userSchema);

module.exports = User;
