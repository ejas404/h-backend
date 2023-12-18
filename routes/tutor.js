import express from 'express'
import * as tutorCtrl from '../controllers/tutor/auth.js'

export const tutorRouter = express.Router()

tutorRouter.post('/login', tutorCtrl.login)
tutorRouter.post('/register', tutorCtrl.register)