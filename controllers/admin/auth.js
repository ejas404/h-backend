import AdminCollection from "../../models/admin.js"
import asyncHandler from "express-async-handler"
import { generateToken } from "../../utility/token.js"


// admin authentication handling functions

export const postLogin = asyncHandler( async (req,res)=>{

    const {email , password} = req.body
    const admin = await AdminCollection.findOne({email})

    if(!admin && !(await admin.checkPassword(password))){
        throw new Error('invalid id or password')
    }

    const token = generateToken(res, admin._id)

    const userDetails = {name : 'Admin', email: admin.email, role : 'Admin'}

    res.status(200).json({
        success : true,
        token,
        user : userDetails
    })
})

export const register = asyncHandler(async (req,res)=>{
    await AdminCollection.create({email : 'admin456@gmail.com',password : 'admin456'})
})