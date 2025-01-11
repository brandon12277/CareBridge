import Users from "@/models/users";
import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { ObjectId } from 'mongodb';

export async function GET(req){
   
    const id  = req.url.split('?')[1]?.split('=')[1]; 


    const user = await Users.findOne({_id : new ObjectId(id)})

    return NextResponse.json(user, { status: 200 });
     
}