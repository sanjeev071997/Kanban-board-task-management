import express from 'express'
import {createTodoController,allTodoController,updateTodoController,
    deleteTodoController, doneTodoController  } from '../controllers/todo.js'

const router = express.Router()

router.post('/', createTodoController)
           
router.get('/:id', allTodoController)

router.put('/:id', updateTodoController)

router.delete('/delete/:id',deleteTodoController)

router.put('/done/:id',doneTodoController)

export default router
