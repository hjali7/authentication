import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST (requst) {
    try {
        await connect()
        const {name} = await requst.json()
        const username = await User.findOne({name}).select("_id")
        return NextResponse.json({username})
    } catch (error) {
        return NextResponse.json({message : 'connection lost'} , {status : 501})
    }
}