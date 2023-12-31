import asyncHandler from "express-async-handler"
import tutorCollection from "../../models/tutor.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'



export const getProfile = asyncHandler(async (req, res) => {
    const userData = await tutorCollection.findOne({ email: req.tutor.email }, { password: 0, twofactor: 0 })
    res.status(200).json(userData)
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { name, email, contact } = req.body

    const userData = await tutorCollection.findOneAndUpdate(
        {
            email: req.tutor.email
        },
        {
            $set: { name, email, contact }
        })

    
        res.status(200).json({success: true, message: 'profile updated successfully'}
    )
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body

    const userData = await tutorCollection.findOne({ email: req.tutor.email })


    if (userData && (await bcrypt.compare(currentPassword, userData.password))) {
        userData.password = newPassword
        await userData.save()
        res.status(200).json({ success: true, message: 'password updated successfully' })
    } else {
        throw new Error('password does not matches')
    }

})

export const updateEducation = asyncHandler(async (req, res) => {

    const { university, stream, year, country } = req.body

    const educationDetails = {
        ed_id: uuidv4(),
        university,
        stream,
        country,
        year: Number(year)
    }

    const tutorData = await tutorCollection.findOne({ email: req.tutor.email })

    if (tutorData.education) {
        tutorData.education.push(educationDetails)
    } else {
        tutorData.education = [educationDetails]
    }
    await tutorData.save()

    res.json({ educationDetails })
})



export const updatePic = asyncHandler(async (req, res) => {
    console.log('update pic called')
    const { email } = req.tutor
    let tutor = await tutorCollection.findOne({ email })

    if(!req.file.path){
        throw  new Error('multer error')
    }

    if (tutor.profile) {
        fs.unlink(tutor.profile, (err) => {
            if (err) throw new Error('profile image is not deleted');
        })
    }

    tutor.profile = req.file.path
    console.log(tutor.file, 'file printed')
    tutor.save()

    res.json({ msg: 'profile image upadted successfully',path : req.file.path})
})


export const updateTags = asyncHandler(async (req,res)=>{

    const { email } = req.tutor
    const {tag , list} = req.body

    if(!tag || !list) throw new Error('Invalid request') ; 

    let tagList = JSON.parse(list)

    if(Array.isArray(tagList)){ 
        let tutor = await tutorCollection.findOne({ email })

        tutor[tag] = tagList

        await tutor.save()

        res.json({msg : 'successfully updated', tutorTag : {tag , list :  tagList}})
    }else{
        throw new Error('Invalid request')
    }
})


export const deleteEducation = asyncHandler(async (req,res)=>{
    const { email } = req.tutor
    const {id} = req.params

    if(!id) throw new Error('id is not found')
    let tutor = await tutorCollection.findOne({ email })

    let education = tutor.education

    let toDelete ; 
    tutor.education = education.filter((each)=> {
        if(each.ed_id === id){
            toDelete = each
        }else{
            return each
        }
    } )

    if(!toDelete) throw new Error('education data is not founded')

    await tutor.save()

    res.json({toDelete})

})
