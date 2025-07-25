import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        default:5

    }

})
const User = mongoose.model('User',userSchema)
export default User