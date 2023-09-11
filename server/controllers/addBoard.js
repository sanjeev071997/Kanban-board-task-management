import board from '../module/addBoard.js'
import todo from '../module/todo.js'

// Create Board
export const createBoardController = async (req, res) => {
    try {
        const { name } = req.body;
        const newBoard = await board.create({
            name,
            todo:todo
        })
        res.status(200).send({
            success: true,
            message: 'New Board created',
            data: newBoard,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while create Board'
        })
    }
}

// Get all Board
export const allBoardController = async (req, res) => {
    try {
        const Board = await board.find({})
        res.status(200).json({
            success: true,
            data:Board
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while get all Board list'
        })
    }
}

// Update Board
export const updateBoardController = async (req, res) => {
    try {
        const updateBoard = {
            name: req.body.name
        }

        const newUpdateBoard = await board.findByIdAndUpdate(req.params.id, updateBoard, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        });

        res.status(200).send({
            success: true,
            message: 'Your Board Updated Successfully',
            data: newUpdateBoard
        })

    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: 'Error while Updated Board'
        })
    }
}

// Delete Board
export const deleteBoardController = async (req, res) => {
    try {
        const DeleteBoard = await board.findByIdAndDelete({ _id: req.params.id })

        res.status(200).send({
            success: true,
            message: "Your Board Is Deleted Successfully",
            data: DeleteBoard
        })

    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: "Error while Board is deleted"
        })
    }
}
