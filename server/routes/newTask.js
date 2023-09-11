import express from 'express'
import {createTaskController, allTaskController, completeTaskController, deleteTaskController} from '../controllers/newTask.js'

const router = express.Router()

router.get('/:id', allTaskController)

router.post('/', createTaskController)

router.put('/complete/:id', completeTaskController)

router.delete('/delete/:id', deleteTaskController)

export default router