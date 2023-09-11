import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },

    desc: {
        type: String,
        required: false,
    },

    labels: {
        type: Array,
        required: false
    },

    colors: {
        type: String,
        required: false
    },

    date: {
        type: String,
        required: false,
    },

    task: {
        type:String,
        required:false
    },

    complete: {
        type: Boolean,
        default: true,
    },

    boardId: {
        type: String,
        required: true
    },

}, { timestamps: true });

const todo = mongoose.model('todo', TodoSchema);

export default todo;