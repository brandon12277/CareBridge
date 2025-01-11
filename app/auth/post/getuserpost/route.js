
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Post from '@/models/Post';

export async function GET(req) {

    try {
        
        const id = req.url.split('?')[1].split('=')[1];

        console.log("user id +++++++++++++++++++++++", id)

        if (!id) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        // Fetch posts where the owner matches the provided ID
        const userPosts = await Post.find({ owner: id })

        // console.log("user posts", userPosts)
        return NextResponse.json({ posts: userPosts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching random posts:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }


}


//       .populate("owner") // Populate owner details
//       .populate("upvotes"); // Populate upvotes details

//     return NextResponse.json({ success: true, posts: userPosts }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user posts:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
