import Todo from '../module/todo.js'

// Create Todo
export const createTodoController = async (req, res) => {
    try {
        const { title, desc,labels, colors,date, task,boardId } = req.body;
        const newTodo = await Todo.create({
            title,
            desc,
            labels,
            date,
            colors,
            task,
            boardId
        })
        res.status(200).send({
            success: true,
            message: 'Todo created',
            data: newTodo,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while create todo'
        })
    }
}

// Get all todo
export const allTodoController = async (req, res) => {
    try {
        const todo = await Todo.find({boardId:req.params.id}).populate({path:'boardId'})
        res.status(200).send({
            success: true,
            message: 'All todo list',
            data: todo
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while get all todo list'
        })
    }
}

// Update todo
export const updateTodoController = async (req, res) => {
    try {
        const updateTodo = {
            title: req.body.title,
            desc: req.body.desc,
            labels:req.body.labels,
            date:req.body.date,
            labels:req.body.labels,
            colors:req.body.colors
        }

        const newUpdateTodo = await Todo.findByIdAndUpdate(req.params.id, updateTodo, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        });

        res.status(200).send({
            success: true,
            message: 'Your Todo Updated Successfully',
            data: newUpdateTodo
        })

    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: 'Error while Updated todo'
        })
    }
}

// Delete Todo
export const deleteTodoController = async (req, res) => {
    try {
        const DeleteTodo = await Todo.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            success: true,
            message: "Your Todo Is Deleted Successfully",
            data: DeleteTodo
        })

    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: "Error while todo is deleted"
        })
    }
}

// Complete Todo
export const doneTodoController = async (req, res) => {
    try {
        const done = await Todo.findByIdAndUpdate({ _id: req.params.id },
            { "$set": { "complete": false }},
            {
                new: true,
                runValidators: true,
                useFindAndModify: true,
            });
        res.status(200).send({
            success: true,
            message: 'Your Todo Is Done',
            data: done
        })
    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: "Error while done todo"
        })
    }
};