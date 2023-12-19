import express from 'express'
import * as studentCtrl from '../controllers/student/auth.js'
import * as studentProfCtrl from '../controllers/student/profile.js'
import { isStudentAuthenticated, isStudentBlocked } from '../middlewares/auth_middlware.js'

export const studentRouter = express.Router()

studentRouter.post('/register', studentCtrl.register)
studentRouter.post('/login', studentCtrl.login)

studentRouter.use(isStudentBlocked, isStudentAuthenticated)
studentRouter.get('/profile', studentProfCtrl.getProfile)
studentRouter.put('/update', studentProfCtrl.updateProfile)
studentRouter.put('/reset-password', studentProfCtrl.resetPassword)