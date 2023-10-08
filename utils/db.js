import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default function connect () {
   try {
      mongoose.connect(process.env.MONGODB_URI)
      return NextResponse.json({message : 'connection is ok'} , {status : 200})
   } catch (error) {
      return NextResponse.json({message : 'connection failed '} , {status : 501})
   }
}