import asyncHandler from "express-async-handler"
import courseCollection from "../../models/course.js"
import tutorCollection from "../../models/tutor.js"
import * as fs from 'fs'

export const addCourse = asyncHandler(async(req,res)=>{

    const {title , fee , tutor , description } = req.body

    let courseFee = Number(fee)
    let courseTitle = title
    let courseDesc = description
    let tutorId = tutor

    const newCourse = await courseCollection.create({
        title : courseTitle,
        fee : courseFee,
        description : courseDesc,
        tutor : tutorId
    })

    res.json({newCourse})
})



export const getCourses = asyncHandler(async(req,res)=>{
    const courseDetails = await courseCollection.find({isDeleted : false}).populate('tutor', 'name')
    const tutorIds = await courseCollection.distinct('tutor')
    
    const tutorCourses = await tutorCollection.find({_id : {$in : tutorIds}}, {name : 1})
    
    res.json({courseDetails, tutorCourses})
})


export const updateCourseCover = asyncHandler ( async(req,res)=>{
    const {id} = req.params
    const course = await courseCollection.findById(id)

    if(!req.file.path){
        throw  new Error('multer error')
    }

    if(course.cover){
        fs.unlink(course.cover,(err)=>{
            if(err) throw new Error('profile image is not deleted');

            console.log('file removed successfully')
        })
    }
    
    course.cover = req.file.path
    course.save()

    res.json({ msg : 'profile image upadted successfully', path : req.file.path})

})


export const getSingleCourse = asyncHandler(async(req,res)=>{
    console.log('inside get single course')
    const {id} = req.params
    
    const courseDetails = await courseCollection.findById(id).populate('tutor','name')

    if(!courseDetails) throw new Error('no course matches the id')

    res.json({courseDetails})
})


export const updateCourse = asyncHandler(async(req,res)=>{

    console.log('from update course')
    const {id} = req.params
    const {title , fee , tutor , description } = req.body

    const course = await courseCollection.findById(id)

    if(!course) throw new Error('invalid course id');

    let courseFee = Number(fee)
    let courseTitle = title
    let courseDesc = description
    let tutorId = tutor

    course.title = courseTitle
    course.fee = courseFee
    course.description = courseDesc
    course.tutor = tutorId

    await course.save()

    const updatedCourse = await courseCollection.findById(id).populate('tutor', 'name')
    

    res.json({updatedCourse})
})



export const courseApprove = asyncHandler(async(req,res)=>{

    console.log('from update course')
    const {id} = req.params
    
    const course = await courseCollection.findById(id)

    course.isApproved = true 
    course.request = 'Approved'

    await course.save()
   

    const updatedCourse = await courseCollection.findById(id).populate('tutor', 'name')
    

    res.json({ courseDetails : updatedCourse})
})

