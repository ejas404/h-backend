import mongoose from 'mongoose'

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String , required  :true},
    cover :  {type : String},
    fee :  {type : Number , requrired  :true},
    tutor : {type : Schema.Types.ObjectId , ref : 'tutor'},
    isAvailable : {type : Boolean , default : true},
    isApproved :{type : Boolean , default : false},
    isTutorMade : {type : Boolean , default : false},
    isDeleted : {type : Boolean , default : false}

})


const courseCollection = mongoose.model('course', courseSchema)

export default courseCollection