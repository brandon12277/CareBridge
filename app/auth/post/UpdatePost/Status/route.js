
import { NextResponse } from "next/server"
import mongoose from "mongoose"

import {ObjectId} from "mongodb"
import Post from '@/models/Post';

export async function POST(req) {
    try {
    
      const body = await req.json();
      const { postId, status } = body;
  
      if (!postId || !status) {
        return NextResponse.json({ message: "postId and status are required" }, { status: 400 });
      }
  
     
      await connectToDatabase();
  
    
      const updateFields = {
        resolved: false,
        workInProgress: false,
        Contacted: false,
        Viewed: false,
      };
  
     
      if (status === "resolved") {
        updateFields.resolved = true;
      } else if (status === "workInProgress") {
        updateFields.workInProgress = true;
      } else if (status === "Contacted") {
        updateFields.Contacted = true;
      } else if (status === "Viewed") {
        updateFields.Viewed = true;
      } else {
        return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
      }
  
   
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedPost) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
      console.error("Error updating post:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }