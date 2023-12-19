import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import AdminCollection from "../models/admin.js"
import studentCollection from "../models/student.js"
import tutorCollection from "../models/tutor.js"

export const  isStudentBlocked = asyncHandler(async (req,res,next)=>{
    const {email} = req.body
    let student = await studentCollection.findOne({email})
    if(student && student.isBlocked){  
            res.status(402);
            throw new Error("enrtry restricted contact the authority");
    }
    next()
})

export const  isTutorBlocked = asyncHandler(async (req,res,next)=>{
    const {email} = req.body
    let tutor = await tutorCollection.findOne({email})
    if(tutor && tutor.isBlocked){  
            res.status(402);
            throw new Error("enrtry restricted contact the authority");
    }
    next()
})

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers.authorization)
    console.log('after req header')
    token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('after decoded',decoded)
            req.admin = await AdminCollection.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});

export const isStudentAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await studentCollection.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});


export const isTutorAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await tutorCollection.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});
