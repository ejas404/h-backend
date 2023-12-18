import {mongoose} from 'mongoose'

const dbConnect = async ()=>{
    try{    
       const connection = await mongoose.connect(process.env.MONGO_URI)
       console.log('connectd to database')
    }catch(e){
        console.log('database failed to connect')
    }
}

 export default dbConnect
