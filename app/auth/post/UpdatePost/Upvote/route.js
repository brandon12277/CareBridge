import { NextResponse } from "next/server"
import mongoose from "mongoose"

import {ObjectId} from "mongodb"
import Post from '@/models/Post';

export async function POST(req) {
    
    try {
        const  {id,user_id}  = await req.json()
       
        
        const post = await Post.findOne({ _id: new ObjectId(id) });
        
        if (post.upvotes.includes(id)) {
            return NextResponse.json({mes : "Already there"},{status:200});
        }
       
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, upvotes: { $ne: user_id } }, 
            { $push: { upvotes: user_id } }, 
            { new: true } 
          );
    
          

       
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
   
}