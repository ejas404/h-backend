import multer from 'multer'

const studentStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'./public/uploads/student-profile')
    },
    filename : (req, file, cb) =>{
        cb(null , `${Date.now()}-${file.originalname}`)
    }
})




const tutorStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'./public/uploads/tutor-profile')
    },
    filename : (req, file, cb) =>{
        cb(null , `${Date.now()}-${file.originalname}`)
    }
})



const studentUpload = multer({storage : studentStorage})
const tutorUpload = multer({ storage : tutorStorage})

export {studentUpload , tutorUpload}