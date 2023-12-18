import express from 'express'
import * as studentCtrl from '../controllers/student/auth.js'
import { isStudentBlocked } from '../middlewares/auth_middlware.js'

export const studentRouter = express.Router()

studentRouter.post('/register', studentCtrl.register)

studentRouter.use(isStudentBlocked)
studentRouter.post('/login', studentCtrl.login)