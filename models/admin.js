import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema


//admin schema datas
const adminSchema = new Schema({
    password : {type:String, required:true},
    email : {type:String, required:true},
    twofactor : {type : Boolean},
    role : {type : String , default : 'Admin'},
})

//user schema


adminSchema.method.checkPassword = async (pwd)=>{
    return await bcrypt.compare(pwd,this.password)
}



const AdminCollection = mongoose.model('admin',adminSchema)

export default AdminCollection