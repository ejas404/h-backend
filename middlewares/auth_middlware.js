import studentCollection from "../models/student.js"
import asyncHandler from "express-async-handler"

export const  isStudentBlocked = asyncHandler(async (req,res,next)=>{
    const {email} = req.body
    let student = await studentCollection.findOne({email})
    if(student && student.isBlocked){  
            res.status(402);
            throw new Error("enrtry restricted contact the authority");
    }
    next()
})