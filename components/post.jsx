// components/Post.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios"


const notify = (msg) => toast.success(msg,{
  duration : 5000,
 });
const Post = ({ username, owner,taggedUser, textContent, imageUrl,upvotesCount,postId,resolved,work,contacted,viewed,isComm }) => {
    const [upvotes, setUpvotes] = useState(0);
   const [openBlack,setBlack] = useState(null)
   const[msg,setMsg] = useState(null)
   console.log(owner)
    const router = useRouter()
    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    const handleChange = (e) => {
        setMsg({
          msg :value,
        });
      };
    const handleMessage = async () =>{

        const getUser = await axios.get(`/auth/user/getUser?id=${owner}`)
        console.log(getUser.data.name)
        const send = await axios.post("/auth/chat/",{person1 : getUser.data.name,person2  :username,roomId:"abc",message : {sender : username,reciever : getUser.data.name ,text : "i am want to connect",date: "12-01-2025" }})


        
         
    }
    const messageDiv = (

        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Send a Message</h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message here..."
          onChange={handleChange}
        />
        <button onClick={handleMessage} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          Send Message
        </button>
      </div>
    </div>
       
    )

    

    const handleAck = async () =>{
           
          const res = await axios.post("/auth/post/UpdatePost/Status",{ postId : postId,status : "Viewed"})
        console.log(res)
          if(res){
            notify("Update status")
          }
          
    }
    const handleWork = async () =>{
           
        const res = await axios.post("/auth/post/UpdatePost/Status",{ postId : postId,status : "workInProgress"})
      console.log(res)
        if(res){
          notify("Update status")
        }
        
  }


  const handleResolved = async () =>{
           
    const res = await axios.post("/auth/post/UpdatePost/Status",{ postId : postId,status : "resolved"})
  console.log(res)
    if(res){
      notify("Update status")
    }
    
}
  function handleB (){

     setBlack(1)  
  }
    const handleContact = async () =>{
           
        const res = await axios.post("/auth/post/UpdatePost/Status",{ postId : postId,status : "Viewed"})
      console.log(res)
        if(res){
          notify("Update status")
        }
        
  }

    return (
        <div  className="p-6 border border-gray-300 rounded-xl bg-white shadow-lg">
             <Toaster
              position="top-center"
              reverseOrder={false}
              duration = {60}
            />
            {
                openBlack?
            <div>
                {messageDiv}
            </div>
            :
            <></>
            }
            <div className="flex w-full gap-20">
            <div className="font-bold text-4xl">{username}</div>
            {
                isComm ? 
                <div className="flex gap-6 items-center">
                   <button className="def-but pt-1 pr-4 pb-1 pl-4 text-black font-bold" onClick={handleAck}>Acknowledged</button>  
                   <button onClick={handleB}>Contact Owner</button>  
                   <button onClick={handleWork}>Work in Progress</button>  
                   <button onClick={handleResolved}>Mark as Resolved</button>
                </div>
                :
                <></>
            }
           

            </div>
            
            <div className="italic mt-4 text-gray-600"><span className="font-semibold">To:</span> {taggedUser}</div>

            {/* content */}

            <div className="flex justify-center gap-4 items-center">
                <div className="my-4 w-11/12 text-mid text-justify">{textContent}</div>
                <div>{imageUrl && <img src={imageUrl} alt="Post Image" className="w-full rounded-lg" />}</div>
            </div>


            <div className="flex items-center gap-20 mt-4">
            <div className="flex"><img className="w-5" src="images/upvote.png" alt="upvote-logo" /> {upvotesCount}</div>
                
                <button className="" onClick={()=>{
            router.push(`/Post?id=${postId}`)
        }}>View  Post</button>
            </div>
        </div>
    );
};

export default Post;