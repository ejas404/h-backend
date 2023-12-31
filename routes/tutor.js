import express from 'express'
import * as tutorCtrl from '../controllers/tutor/auth.js'
import * as tutorProfCtrl from '../controllers/tutor/profile.js'
import { isTutorAuthenticated, isTutorBlocked } from '../middlewares/auth_middlware.js'
import { tutorUpload } from '../config/multer.js'

export const tutorRouter = express.Router()

tutorRouter.post('/login', tutorCtrl.login)
tutorRouter.post('/register', tutorCtrl.register)

tutorRouter.use(isTutorAuthenticated, isTutorBlocked)
tutorRouter.get('/profile', tutorProfCtrl.getProfile)
tutorRouter.put('/update', tutorProfCtrl.updateProfile)
tutorRouter.put('/reset-password', tutorProfCtrl.resetPassword)
tutorRouter.put('/update-education',tutorProfCtrl.updateEducation)
tutorRouter.put('/update-pic',tutorUpload.single('profile'),tutorProfCtrl.updatePic)
tutorRouter.put('/update-tags',tutorProfCtrl.updateTags)
tutorRouter.delete('/delete-education/:id', tutorProfCtrl.deleteEducation)