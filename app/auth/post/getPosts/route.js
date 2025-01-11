
import { NextResponse } from "next/server"
import mongoose from "mongoose"


import Post from '@/models/Post';

export async function GET(req){

    try {
        
        const randomPosts = await Post.aggregate([
            { $sample: { size: 10 } } 
        ])

        console.log(randomPosts)
        return NextResponse.json({posts: randomPosts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching random posts:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }

       
 }