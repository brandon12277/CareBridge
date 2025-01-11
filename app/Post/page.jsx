"use client"

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';
import axios from "axios"
import StatusBar from "@/components/statusBar";
import Post from "@/components/post";
const PostPage = ({ params }) => {

  const router = useRouter();
  const [status, setStatus] = useState(null)
  const [post, setPost] = useState(null
  );
  const [owner, setOwner] = useState(null
  );
  const [user, setUser] = useState(null
  );

  const [posts, setPosts] = useState([])

  const Upvote = async () => {

    const data = {
      id: post._id,
      user_id: user._id

    }

    const give = await axios.post("/auth/post/UpdatePost/Upvote", data)

    if (give) {
      console.log("given upvote")
    }

  }

  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const userdata = JSON.parse(localStorage.getItem("user"));
    const id = userdata._id
    // const id = "67823ed537f161d67fcc53cf"
    const auth = localStorage.getItem("auth")
    setUser(JSON.parse(localStorage.getItem("user")))
    console.log(id)
    if (!auth) {
      router.push("/Login")
    }

    const bdata = axios.get(
      `/auth/post/getuserpost?id=${id}`
    ).then((data) => {
      setPosts(data.data.posts)
      console.log("testing data", data.data.posts)
    })






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

  const [pos, setpos] = useState()

  const postlength = () => {
    setpos(posts.length)
  }
  postlength

  return (
    <>

      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <div className="space-y-6">


          {/* {console.log("length++++++++++++++++++++++++++++++++++++++++++++++++++++",posts.length)} */}
          {posts.length === 0 ? (<h1 className="text-center font-bold">No Posts Yet</h1>) :
            posts ? posts.map((post, index) => (
              <Post
                key={post._id}
                postId={post._id}
                username={post.name}
                taggedUser={post.tag}
                textContent={post.descp}
                imageUrl={post.photo}
                upvotesCount={post.upvotes.length}
              />
            )) : (
              <></>
            )

          }
        </div>
      </div>


    </>
  );
};

export default PostPage;