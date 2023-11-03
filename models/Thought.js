const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],
});

function formatDateThought(date) {
    return dayjs(date).format('MM-DD-YYYY:HH:mm:ss');
}

thoughtSchema.virtual('formatDateThought').get(function () {
    return formatDateThought(this.createdAt);
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema); // Singular name 'Thought'

module.exports = Thought;
