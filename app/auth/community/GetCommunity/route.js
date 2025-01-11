import { NextResponse } from "next/server"
import mongoose from "mongoose"

import {ObjectId} from "mongodb"
import Comms from "@/models/communities";

export async function GET(req) {
    
    try {
        const  id  = req.url.split('?')[1].split('=')[1]; 
        
        console.log(id)
        
        const comm = await Comms.findOne({ _id: new ObjectId(id) });

        if (!comm) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

       
        return NextResponse.json(comm, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
   
}