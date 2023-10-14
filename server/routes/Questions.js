import express from 'express'
import { AskQuestion,deleteQuestion } from '../controllers/Questions.js'
import { getAllQuestions } from '../controllers/Questions.js'
import auth from '../middlewares/auth.js'


const router=express.Router()


router.post('/ask',auth,AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id',auth,deleteQuestion )

export default router