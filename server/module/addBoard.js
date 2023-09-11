import mongoose from 'mongoose'

const AddBoardSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },

    todoBoardId: {
        type: mongoose.Schema.Types.ObjectId, ref:'todo',      
    }

}, {timestamps:true});

const board = mongoose.model('addBoard', AddBoardSchema);

export default board;