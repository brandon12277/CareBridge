
import { NextResponse } from "next/server"
import mongoose from "mongoose"


import Post from '@/models/Post';

export async function GET(req){

    try {

        const url = new URL(req.url);
        const tag = url.searchParams.get('comm');
        
        const randomPosts = await Post.find({tag : tag})

        if(!randomPosts)return NextResponse.json({data : false}, { status: 200 });
        
        return NextResponse.json({posts: randomPosts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching random posts:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }

       
 }