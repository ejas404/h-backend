import asyncHandler from "express-async-handler"
import studentCollection from "../../models/student.js";
import bcrypt from 'bcrypt'



export const  getProfile = asyncHandler(async (req,res)=>{
    const userData = await studentCollection.findOne({email : req.user.email} ,{password : 0,twofactor : 0})

    console.log(userData, 'b4 response')
    res.status(200).json(userData)
})

export const  updateProfile = asyncHandler(async (req,res)=>{
    const {name , email, contact} = req.body
    
    const userData = await studentCollection.findOneAndUpdate({email : req.user.email} ,{$set : {name,email,contact}})
    res.status(200).json({success : true, message : 'profile updated successfully'})
})

export const  resetPassword = asyncHandler(async (req,res)=>{
    const {currentPassword , newPassword} = req.body
    console.log(req.body)
    
    const userData = await studentCollection.findOne({email : req.user.email})
    console.log(userData)
    if(userData && (await bcrypt.compare(currentPassword,userData.password))){
        userData.password = newPassword
        await userData.save()
        res.status(200).json({success : true, message : 'password updated successfully'})
    }else{
        throw new Error('password does not matches')
    }
   
})

