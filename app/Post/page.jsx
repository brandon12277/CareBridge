"use client"

import React, { useState,useEffect } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

import axios from "axios"
import StatusBar from "@/components/statusBar";
const PostPage = ({params}) => {
    
    const router = useRouter();
    const [status,setStatus] = useState(null)
    const [post, setPost] = useState(null
       );
    const [owner, setOwner] = useState(null
       );
       const [user, setUser] = useState(null
       );

       const Upvote = async () =>{

        const data = {
            id : post._id,
            user_id : user._id

        }

        const give = await axios.post("/auth/post/UpdatePost/Upvote",data)

        if(give){
            console.log("given upvote")
        }
         
       }

    useEffect(() => {
        
        const searchParams = new URLSearchParams(window.location.search); 
        const id = searchParams.get('id');
        const auth = localStorage.getItem("auth")
        setUser(JSON.parse(localStorage.getItem("user")))
        console.log(id)

        if(!auth){
            router.push("/Login")
        }




       
            const fetchPostData = async () => {
                try {
                    const response = await fetch(`/auth/post/ShowPost?id=${id}`); 
                    const data = await response.json();
                    console.log(data)
                    const owner = await axios.get(`/auth/user/getUser?id=${data.owner}`)
                    console.log(owner.data.name)
                    setOwner(owner.data.name);
                    let status = 0
                    if (data.Viewed) {
                            status++;
                          } 
                          if (data.Contacted) {
                            status++;
                          } 
                          if (data.workInProgress) {
                            status++;
                          } 
                          if (data.resolved) {
                            status++;
                          } 
                    setStatus(status)
                    setPost(data) 

                } catch (error) {
                    console.error("Error fetching post data:", error);
                }
            };

            fetchPostData();

        

    }, []); 
  
   
  
    return (
        <>
        
        <Navbar/>

        {
            post?
            <div className="min-h-screen w-full bg-gray-50 flex flex-col items-start p-6">
        {/* Supporter count and icon */}
        <div className=" w-full flex items-center text-red-600 text-lg mb-4">
          <span className="mr-2">👁️</span> {/* Example Eye Icon */}
          <span>{post.upvotes.length}</span>
        </div>
        <div>
          {!status?
          <StatusBar
            currentStatus={status}
          
            

          />
          :
          <></>
        }
        </div>
  
        {/* Title */}
        <h1 className="text-2xl font-bold text-black mb-6">{post.name}</h1>



  
        {/* Image Div */}
        <div
  className="w-full max-w-2xl h-80 bg-gray-200 bg-cover bg-center border border-gray-300 rounded overflow-hidden mb-6"
  style={{

    backgroundImage: `url("${post.photo}")` ,
  }}
>
  {!post.photo && (

    <span className="text-gray-500 flex items-center justify-center h-full">
      No image available
    </span>
  )}
</div>
  
        {/* Created By */}
        <p className="text-sm text-gray-600 mb-4">
          Appeal By{" "}

          <span className="text-red-600 font-semibold">{owner}</span>

        </p>
  
        {/* Community Tags */}
        <div className="flex flex-wrap gap-3">
            to

          
            <span
             
              className="bg-red-100 text-green-800 text-sm px-3 py-1 rounded-full border border-red-300"
            >
              {post.tag}
            </span>
          

        </div>

        <div className="w-full py-6 max-w-2xl mb-6">
  <p className="text-gray-700 text-base mb-4">

   {post.descp}

  </p>
</div>

{/* Upvote Button */}
<div className="w-full max-w-2xl flex items-center">
  <button

  onClick={Upvote}

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

      :
      <></>

        }


      </>
    );
  };
  
  export default PostPage;