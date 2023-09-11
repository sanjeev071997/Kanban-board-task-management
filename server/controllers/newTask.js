import Task from '../module/newTask.js'

// create Task Controller
export const createTaskController = async (req, res) => {
    try {
        const { task, cardId, boardId } = req.body;
        const newTask = await Task.create({
            task,
            cardId,
            boardId,
        })
        res.status(200).send({
            success: true,
            message: 'Create New Task',
            data: newTask,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while create task'
        })
    }
}

// Get all task
export const allTaskController = async (req, res) => {
    try {
        const task = await Task.find({cardId:req.params.id}).populate({path:'cardId'})
        res.status(200).send({
            success: true,
            message: 'All task list',
            data: task
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while get all task list'
        })
    }
}

// Complete Controller
export const completeTaskController = async (req, res) => {
    try {
        const completeTask = await Task.findByIdAndUpdate({ _id: req.params.id },
            { "$set": { "complete": false } },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            },
        );
        res.status(200).send({
            success: true,
            message: 'Your Task Is Completed',
            data: completeTask,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Complete task list'
        })
    }
};

// delete Task
export const deleteTaskController = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id });

        res.status(200).send({
            success: true,
            message: "Your Task Is Deleted Successfully"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while todo is deleted'
        })
    }
}