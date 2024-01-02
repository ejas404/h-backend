import express from 'express'
import * as studentCtrl from '../controllers/student/auth.js'
import * as studentProfCtrl from '../controllers/student/profile.js'
import { isStudentAuthenticated, isStudentBlocked } from '../middlewares/auth_middlware.js'
import {studentUpload} from '../config/multer.js'

export const studentRouter = express.Router()

studentRouter.post('/register', studentCtrl.register)

studentRouter.post('/login', studentCtrl.login)
studentRouter.get('/courses',studentCtrl.getCourses)
studentRouter.get('/course/:id',studentCtrl.getSingleCourse)


studentRouter.use(isStudentAuthenticated,isStudentBlocked)
studentRouter.get('/profile', studentProfCtrl.getProfile)
studentRouter.put('/update', studentProfCtrl.updateProfile)
studentRouter.put('/reset-password', studentProfCtrl.resetPassword)
studentRouter.put('/update-pic',studentUpload.single('profile'),studentProfCtrl.updatePic)
studentRouter.get('/profile-image', studentProfCtrl.getProfileImage)
