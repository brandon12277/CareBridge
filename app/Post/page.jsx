"use client"

import React, { useState,useEffect } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';
const PostPage = ({params}) => {
    
    const router = useRouter();
    const { id } = params;
    const [post, setPost] = useState({
        photo: null,
        photoPreview: null,
        supporters: 5, 
        creator: "williamsbrand879",
        tagLine: "Tu Kya Thoda sa Behen ka....",
        communities: ["BJP", "TMC"],
    });

    useEffect(() => {

        const auth = localStorage.getItem("auth")

        if(!auth){
            router.push("/Login")
        }



        if (id) {
            const fetchPostData = async () => {
                try {
                    const response = await fetch(`/post/ShowPost/?id=${id}`); 
                    const data = await response.json();
                    setPost(data); 
                } catch (error) {
                    console.error("Error fetching post data:", error);
                }
            };

            fetchPostData();
        }
    }, []); 
  
   
  
    return (
        <>
        
        <Navbar/>

      <div className="min-h-screen w-full bg-gray-50 flex flex-col items-start p-6">
        {/* Supporter count and icon */}
        <div className=" w-full flex items-center text-red-600 text-lg mb-4">
          <span className="mr-2">👁️</span> {/* Example Eye Icon */}
          <span>{post.supporters}</span>
        </div>
  
        {/* Title */}
        <h1 className="text-2xl font-bold text-black mb-6">{post.tagLine}</h1>
  
        {/* Image Div */}
        <div
  className="w-full max-w-2xl h-80 bg-gray-200 bg-cover bg-center border border-gray-300 rounded overflow-hidden mb-6"
  style={{
    backgroundImage: post.photoPreview ? `url("/images/logo.png")` : "none",
  }}
>
  {!post.photoPreview && (
    <span className="text-gray-500 flex items-center justify-center h-full">
      No image available
    </span>
  )}
</div>
  
        {/* Created By */}
        <p className="text-sm text-gray-600 mb-4">
          Appeal By{" "}
          <span className="text-red-600 font-semibold">{post.creator}</span>
        </p>
  
        {/* Community Tags */}
        <div className="flex flex-wrap gap-3">
            to
          {post.communities.map((community, index) => (
            <span
              key={index}
              className="bg-red-100 text-green-800 text-sm px-3 py-1 rounded-full border border-red-300"
            >
              {community}
            </span>
          ))}
        </div>

        <div className="w-full py-6 max-w-2xl mb-6">
  <p className="text-gray-700 text-base mb-4">
    This is a random description for this post. You can use this section to provide more details, context, or information about the image or topic being shared.
  </p>
</div>

{/* Upvote Button */}
<div className="w-full max-w-2xl flex items-center">
  <button
    className="flex items-center bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15l7-7 7 7"
      />
    </svg>
    Raise Awareness
  </button>
</div>
      </div>
      </>
    );
  };
  
  export default PostPage;