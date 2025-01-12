"use client"

import React, { useState,useEffect } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';
import axios from "axios"
import Post from "@/components/post";




const CommunityPage = () => {
  
  const router = useRouter();
  
  const [comm,setComm] = useState(null)
  const [resolved,setResolved] = useState(null)
  const [pending,setPending] = useState(null)
  const fetchPostData = async () => {
    try {
        const searchParams = new URLSearchParams(window.location.search); 
        const id = searchParams.get('id');

        const response = await axios.get(`/auth/community/GetCommunity?id=${id}`); 
       
        const data = response.data
        const posts = await axios.get(`/auth/post/GetCommPosts?comm=${data.name}`); 
        console.log(data)
        console.log(posts.data.posts)

        if(posts.data.posts){
        const pending = posts.data.posts.map((post) =>{

            if(!post.resolved)return {
                username: post.name,
                taggedUser: post.tag,
                textContent: post.descp,
                imageUrl: post.photo,
                upvotes : post.upvotes.length,
                resolved : post.resolved,
                workInProg : post.workInProgress ? post.workInProgress : false ,
                contacted : post.Contacted ? post.Contacted : false ,
                viewed : post.Viewed ? post.Viewed : false,
                _id : post._id
            }

        })
        const resolved = posts.data.posts.map((post) =>{

            if(post.resolved)return {
                username: post.name,
                taggedUser: post.tag,
                textContent: post.descp,
                imageUrl: post.photo,
                upvotes : post.upvotes.length,
                resolved : post.resolved,
                workInProg : post.workInProgress ? post.workInProgress : false ,
                contacted : post.Contacted ? post.Contacted : false ,
                viewed : post.Viewed ? post.Viewed : false,
                _id : post._id
            }

        })

        console.log(pending,resolved)
        
        setPending(pending)
        setResolved(resolved)
        }

        

        setComm(data) 
    } catch (error) {
        console.error("Error fetching post data:", error);
    }
};

  useEffect(()=>{

    fetchPostData();



  },[])
  
  
 
  const [activeContent, setActiveContent] = useState(''); 

  


  const handleButtonClick = (contentType) => {
    setActiveContent(contentType); 
  };

  return (
    <>

    {

        comm?
        <>
    <Navbar/>
    
    <div className="container mx-auto mt-6 p-8">
    
    <h1 className="text-6xl font-bold text-gray-800 mb-6">{comm.name}</h1>

   
    <p className="text-mid text-gray-600 mb-4">
          Created By : {" "}
          <span className="text-red-600 font-semibold">{comm.owner}</span>
        </p>
        <div className="flex items-center text-center text-lg mb-6">
        <img
        src="/images/locc.png" 
        alt="Community Logo"
        className="w-4 mr-3 rounded-full" 
      />
    <p className="text-lg mb-3"><strong> </strong> {comm.location}</p>
      </div>

   
    <div className="flex items-center text-lg mb-6">
      <img
        src="/images/comm.png" 
        alt="Community Logo"
        className="w-10 h-10 mr-3 rounded-full" 
      />
      <p className="text-lg"><strong></strong> {comm.users.length + 1}</p>
    </div>

    
    <p className="text-base mb-6 text-gray-600 leading-relaxed">{comm.descp}</p>

    
    <div className="flex  mb-6">
      <button
        onClick={() => handleButtonClick('pendingNotifications')}
        className="w-full px-6 py-3 bg-orange-500 text-white rounded-l-lg font-semibold shadow-md hover:bg-orange-600 transition duration-300"
      >
         Pending Notifications
      </button>
      <button
        onClick={() => handleButtonClick('resolvedIssues')}
        className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-r-lg shadow-md hover:bg-green-600 transition duration-300"
      >
         Resolved Issues
      </button>
    </div>

    {/* Conditional rendering based on active content */}
    <div>
      {activeContent === 'pendingNotifications' && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Pending Notifications</h3>
          
          <div className="space-y-6">
          {pending  && pending[0] ? pending.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              taggedUser={post.taggedUser}
              textContent={post.textContent}
              imageUrl={post.imageUrl}
              upvotesCount = {post.upvotes}
              postId = {post._id}
              resolved={post.resolved}
              contacted={post.Contacted}
              work={post.workInProg}
              viewed={post.Viewed}
              isComm={true}
            />
          ))
        :
        <></>}

        </div>
        </div>
      )}

      {activeContent === 'resolvedIssues' && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Resolved Issues</h3>
          <div className="space-y-6">
          {resolved && resolved[0] ? resolved.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              taggedUser={post.taggedUser}
              textContent={post.textContent}
              imageUrl={post.imageUrl}
              upvotesCount = {post.upvotes}
              postId = {post._id}
            />
          ))
        :
        <></>}

        </div>
        </div>
      )}
    </div>
  </div>
  </>
  :
  <></>
}
  </>
  );
};

export default CommunityPage;