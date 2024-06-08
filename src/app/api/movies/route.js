import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDb } from "@/utils/db";
export async function GET(request){
  try{
    const currentPage = parseInt(request.url.split("?")[1].split("=")[1])
    const offsetValue = (currentPage - 1)*8;
    const limitValue = 8
    await connectToDb()
    const database = mongoose.connection.db
    const movieModel =  database.collection("movies")
    const data = await movieModel.find().skip(offsetValue).limit(limitValue);
    const movieData = await data.toArray()

    if(movieData){
      return NextResponse.json({
       movies:movieData
      },{
        status:200
      })
    }else{
      return NextResponse.json({
        message:"error while getting movies!"
      },{
        status:500
      })
    }
  }catch(e){
    console.log(e.message)
    return NextResponse.json({
      message:e.message
    },{
      status:500
    })

  }
}