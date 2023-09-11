import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    task: {
        type:String,
        required:false
    },

    complete: {
        type: Boolean,
        default: true,
    },

    cardId: {
        type: String,
        required: true
    },

    boardId: {
        type: String,
        required: true
    },

}, { timestamps: true });

const task = mongoose.model('task', TaskSchema);

export default task;