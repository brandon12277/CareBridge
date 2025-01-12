"use client"

import React, { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";


const notify = (msg) => toast.error(msg,{
  duration : 5000,
 });
const PostForm = () => {
  const [error,setError] = useState("")
  const [user,setUser] = useState("")
  const router = useRouter()
  const [post, setPost] = useState({
    name: "",
    description: "",
    fileData: null,
    bufferData: null,
    tag : ""
  });

  
 

  useEffect(() => {

    const auth = localStorage.getItem("auth")
    const user_d = JSON.parse(localStorage.getItem("user"))
    setUser(user_d)
    const type = localStorage.getItem("type")
    if(!auth){
        router.push("/Login")
    }
  },[]
  );
 
  const handleEditorChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPost({
          ...post,
          photoName: file.name,
          fileData: file,
          bufferData: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () =>{
    console.log("Hello")
    try{

       
    
       
       
       const formImg = new FormData()
       
       let check_img;
       
        
       let check_form_name = {
        "description" : post.name
      }
      let check_form = {
        "description" : post.description
      }
       
        if(post.fileData){
        formImg.append('image', post.fileData);
        check_img = await axios.post('http://127.0.0.1:5000/image_filter',formImg)
        }
        const check_name = await axios.post('https://speak-flask-text-api.onrender.com/simple',check_form_name)
        const check_descp = await axios.post('https://speak-flask-text-api.onrender.com/simple',check_form)

       



        let name = check_name.data.message
        let descp = check_descp.data.message
        // let class_label = !check_img ? 1 : check_img.data.class


        console.log(name,descp)
       
        if(class_label == 0 ||  class_label ==2){
          notify("Innapproriate Graphical Image Detected ")
          return;
        }

        if(name.length>0){
            notify("Innapproriate Text has been detected in your Post Name please ")
             return;
            
            
             
        }
        if(descp.length>0){
          notify("Innapproriate Text has been detected in your Report Description please ")
           
          return;
          
           
      }


      

         


          
            
     
    
     const formData = {
       "name" : post.name,
       "descp" : post.description,
       "photo" : post.bufferData,
        "tag" : post.tag,
       "owner" : user._id,
     }

    
      console.log(formData)
        let article = await axios.post('/auth/post/CreatePost',formData)
        if(article.data){
            console.log(article.data)
            router.push("/")
        }

    }
    catch(e){
        console.log(e)
    }
       

  }


  return (
    <>
    <Navbar/>
    <Toaster
  position="top-center"
  reverseOrder={false}
  duration = {60}
/>
   
    <div className="min-h-screen pb-14 w-full flex items-center justify-center">
    <div className="w-[100vh] background-green max-w-3xl  p-6 border shadow-lg rounded">
      {/* Photo Upload Section */}
      <div
        className="h-60 bg-gray-100 rounded flex items-center justify-center border shadow-lg cursor-pointer"
        onClick={() => document.getElementById("photoInput").click()}
      >
        {post.bufferData ? (
          <img
            src={post.bufferData}
            alt="Selected"
            className="h-52 w-52 object-contain"
          />
        ) : (
          <span className="text-gray-500">Select Image File</span>
        )}
      </div>
      <input
        type="file"
        id="photoInput"
        className="hidden"
        accept="image/*"
        name="photo"
        onChange={handlePhotoSelect}
      />

      {/* Article Name Section */}
      <div className="error flex items-center text-center text-red-500">

        {error}

      </div>
      <div className="mt-4">
        <label
          htmlFor="articleName"
          className="block text-sm font-medium text-gray-700"
        >
          Post Title
        </label>
        <input
          type="text"
          id="articleName"
          name="name"
          className="mt-1 block w-full border-0 border-b-2 border-green-600 "
          value={post.name}
          onChange={handleEditorChange}
        />

        <label
          htmlFor="articleName"
          className="block text-sm font-medium text-gray-700"
        >
          Tag
        </label>
        
        <input
          type="text"
          id="tag"
          name="tag"
          className="mt-1 block w-full border-0 border-b-2 border-green-600 "
          onChange={handleEditorChange}
        />
        
       

      {/* Description Section */}
      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Report Description
        </label>
        <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 block w-full border-0 border-b-2 border-green-600 focus:ring-0 focus:outline-none focus:border-green-800"
            value={post.description}
            onChange={handleEditorChange}
            placeholder="Enter the description of the post"
          />
        <button onClick={handleSubmit} className="bg-green-500 px-10 py-2 rounded-full shadow m-2">Create Post</button>
      </div>
    </div>
  </div>
  </div>
  </>
  );
};

export default PostForm;