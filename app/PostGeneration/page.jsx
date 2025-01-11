"use client"

import React, { useState } from "react";

import Navbar from "@/components/navbar";


useEffect(() => {

  auth = localStorage.getItem("auth")

  if(!auth){
      router.push("/Login")
  }
}
);

const PostForm = () => {
  const [post, setPost] = useState({
    name: "",
    description: "",
    fileData: null,
    bufferData: null,
  });

 
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
    try{

      let len = post.description.length
      if(len<100)return;
      if(post.name == '' || post.description == ''){
        if(post.name == '')document.getElementById("name_warn").style.display = "flex";
        return;
      }
       document.querySelectorAll(".article_form")[0].style.display = "none";
       setLoader(1)
    
       
        let form_data = post
        let text = getPlainText(post.description)
        console.log(text)
        form_data["file"]=file
        form_data["name"] = user.name
        console.log(form_data)
        console.log(file)
       const formImg = new FormData()
       
       
       
        
        let check_form_name = {
          "description" : post.name
        }
        let check_form = {
          "description" : text
        }
       
        let check_img = null
        if(file){
        formImg.append('image', file);
        // check_img = await axios.post('https://6e2f-103-51-148-117.ngrok-free.app/image_filter',formImg)
        }
        const check_name = await axios.post('https://speak-flask-text-api.onrender.com/simple',check_form_name)
        const check_descp = await axios.post('https://speak-flask-text-api.onrender.com/simple',check_form)

       



        let name = check_name.data.message
        let descp = check_descp.data.message
        let class_label = !check_img ? 1 : check_img.data.class


        console.log(descp)
        console.log(class_label)
        if(class_label == 0 ||  class_label ==2){
          setLoader(null)
          setBlack(1) 
          document.getElementById("ar_img").style.display = "flex"
          return; 
        }

        if(name.length>0){
            setLoader(null)
            setBlack(1)  
            document.getElementById("ar_name").style.display = "block" 
            return;
            
             
        }

        if(descp.length>0){
          setLoader(null)
          setBlack(1)  
          document.getElementById("ar_descp").style.display = "block" 
          let descp_p = document.getElementById("descp_ml");
          document.getElementById("descp_ml").innerHTML = "";
          let text = getPlainText(formData.description).split('.')
          let defined = formData.description.split('.')
          let itr = 0;
          text.map((elem,idx)=>{
            let spanElem = document.createElement('span')
            spanElem.style.backgroundColor = "#fdeb37"
            spanElem.textContent= elem+"."
            console.log(idx)
            if(idx === descp[itr]){
              // <span style={{backgroundColor:"#fdeb37"}}>{formData.name}</span>
              console.log(defined[idx])
              defined[idx] = "<span style='background-color:#fdeb37'>"+defined[idx]+"</span>"
              descp_p.append(spanElem)
              itr++;
             
            }
            else{
              spanElem.style.backgroundColor = ""
              descp_p.append(spanElem)
              
            }

           
            
          })

          let final_def = defined.join('.')
          console.log(final_def)
          handleEditorChange(final_def)


          
            
          
         
          return;
     }
    
     const formData = {
       "name" : post.name,
       "descp" : post.description,
       "owner" : post
     }

    
      console.log(post)
        let article = await axios.post('/post/CreatePost',post)
        if(article.data){
            console.log(article.data)
            navigate("/")
        }
    }
    catch(e){
        console.log(e)
    }
       

  }

  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen w-full flex items-center justify-center">
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

        />
      </div>

      {/* Description Section */}
      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
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
  </>
  );
};

export default PostForm;