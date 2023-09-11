import express from 'express'
import { createBoardController,allBoardController,updateBoardController,deleteBoardController, } from '../controllers/addBoard.js'

const router = express.Router()

router.post('/', createBoardController)
           
router.get('/', allBoardController)

router.put('/:id', updateBoardController)

router.delete('/delete/:id',deleteBoardController)



export default router