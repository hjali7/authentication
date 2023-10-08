import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from 'bcryptjs'

export async function POST (requset) {
    try {
        const {name , email , password} = await requset.json()
        const HashPass = await bcrypt.hash(password , 10)
        await connect()
        await User.create({name , email , password:HashPass})
        return NextResponse.json({alert :'user loged in'} , {status : 201})
    } catch (error) {
        return NextResponse.json({message : 'went is wrong'} , {status : 500})
    }
}