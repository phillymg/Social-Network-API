const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

function formatDateReact(date) {
    return dayjs(date).format('MM-DD-YYYY:HH:mm:ss')
}

reactionSchema.virtual('formatDateReact').get(function () {
    return formatDateReact(this.createdAt);
})


module.exports = reactionSchema;
