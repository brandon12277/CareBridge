import { NextResponse } from "next/server"
import mongoose from "mongoose"


import {ObjectId} from "mongodb"
import Post from '@/models/Post';

export async function GET(req) {
    
    try {
        const  id  = req.url.split('?')[1].split('=')[1]; 
       

        
        const post = await Post.findOne({ _id: new ObjectId(id) });

        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

       
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
   
}