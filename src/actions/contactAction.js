"use server"

import ContactModel from "../models/Contact";
import { connectToDb } from "@/utils/db";

export const uploadContact = async(formData)=>{
  try{
    await connectToDb()
    const contact = await ContactModel.create({
      name:formData.get("name"),
      email:formData.get("email"),
      message:formData.get("message")
    })
    if(contact){
      return {
        status:200,
        message:"Contact details are uploaded  successfully !"
      }
    }else{
      return {
        status:500,
        message:"failed to create contact details !"
      }
    }
  }catch(e){
    return {
      message:e.message,
      status:500
    }
  }
}