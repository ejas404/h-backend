import express from 'express'
import * as adminCtrl from '../controllers/admin/auth.js'
import * as dashCtrl from '../controllers/admin/dashboard.js'

export const adminRouter = express.Router()

adminRouter.post('/login', adminCtrl.postLogin)
adminRouter.get('/users',  dashCtrl.getUsers)
adminRouter.put('/users/update', dashCtrl.editUser)
adminRouter.delete('/users/:id', dashCtrl.deleteUser)
adminRouter.put('/users/block/:id',dashCtrl.blockUser)
adminRouter.put('/users/unblock/:id',dashCtrl.unblockUser)