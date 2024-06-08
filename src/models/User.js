import mongoose from "mongoose";
import { type } from "os";

const userModel = mongoose.Schema({
  name: {
    type:String,
    required: true,
    unique: true,

  },
  email: {
    type:String,
    required: true,
    unique: true,
  },
  imageUrl:{
    type:String,
    required: true,
  }
},{
  timestamps: true,
})

const UserModel = mongoose.models.User || mongoose.model('User', userModel)
export default UserModel