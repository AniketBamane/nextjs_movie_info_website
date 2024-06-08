import mongoose from "mongoose";

const contactModel = mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    required: true,
  },
  message: {
    type:String,
    required: true,
  }
},{
  timestamps: true,
})

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactModel)

export default ContactModel