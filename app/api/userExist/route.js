import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST (requst) {
    try {
        await connect()
        const {email} = await requst.json()
        const user = await User.findOne({email}).select('_id')
        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json({message : 'connection failed'} , {status : 500})
    }
}