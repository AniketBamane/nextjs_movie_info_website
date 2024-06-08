import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/db";

export async function GET(request,{params}){
  try {
    await connectToDb()
    const database = mongoose.connection.db
    const movieModel = database.collection("movies")
    console.log(params.id)
    const data = await movieModel.findOne({_id: new mongoose.Types.ObjectId(params.id)})
    return NextResponse.json({movie:data})
  } catch (error) {
    return NextResponse.json({
      error:error.message
    })
  }
} 