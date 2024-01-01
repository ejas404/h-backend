import asyncHandler from "express-async-handler"
import courseCollection from "../../models/course.js"
import tutorCollection from "../../models/tutor.js"

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

    console.log(newCourse)
})



export const getCourses = asyncHandler(async(req,res)=>{
    const courseDetails = await courseCollection.find({isDeleted : false}).populate('tutor', 'name')
    const tutorIds = await courseCollection.distinct('tutor')
    
    const tutorCourses = await tutorCollection.find({_id : {$in : tutorIds}}, {name : 1})
    console.log(tutorCourses)
    
    res.json({courseDetails, tutorCourses})
})
