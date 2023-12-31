import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema


//admin schema datas
const tutorSchema = new Schema({
    name : {type:String, required:true},
    password : {type:String, required:true},
    email : {type:String, required:true},
    profile : {type : String},
    role : {type : String , default : 'Tutor', immutable : true},
    twofactor : {type : Boolean},
    isBlocked : {type : Boolean, default : false},
    contact : {type : String},
    education : [
        {
            ed_id : {type : String, required : true}, 
            university : {type : String, required : true},
            stream : {type : String, required : true},
            year : {type : Number, required : true},
            country : {type : String, required : true},
        }
    ],
    language :{type :  [String], default : ['eg : English']},
    teaches : {type :  [String], default : ['eg : Science']},
    field : {type :  [String], default : ['eg : Computer Science']},
})

//user schema


tutorSchema.methods.checkPassword = async function (pwd){
    return await bcrypt.compare(pwd,this.password)
}

tutorSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const tutorCollection = mongoose.model('tutor',tutorSchema)

export default tutorCollection