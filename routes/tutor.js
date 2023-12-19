import express from 'express'
import * as tutorCtrl from '../controllers/tutor/auth.js'
import * as tutorProfCtrl from '../controllers/tutor/profile.js'

export const tutorRouter = express.Router()

tutorRouter.post('/login', tutorCtrl.login)
tutorRouter.post('/register', tutorCtrl.register)

tutorRouter.get('/profile', tutorProfCtrl.getProfile)
tutorRouter.put('/update', tutorProfCtrl.updateProfile)
tutorRouter.put('/reset-password', tutorProfCtrl.resetPassword)