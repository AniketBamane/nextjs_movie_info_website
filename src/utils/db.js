import mongoose, { ConnectionStates } from "mongoose";
import { NextResponse } from "next/server";
import { string } from "zod";

export const connectToDb = async()=>{
  try{
    const connection  =await mongoose.connect(process.env.MONGOOSE_URL)
    console.log("database is connected !")
  }catch(error){
    return  NextResponse.json({message:"error while connecting to database !"})
  }
}