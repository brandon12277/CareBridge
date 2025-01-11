// components/Post.js
import { useState } from "react";
import { useRouter } from "next/navigation";
const Post = ({ username, taggedUser, textContent, imageUrl,upvotesCount,postId,resolved,work,contacted,viewed,isComm }) => {
    const [upvotes, setUpvotes] = useState(0);

    const router = useRouter()
    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    return (
        <div onClick={()=>{
            router.push(`/Post?id=${postId}`)
        }} className="p-6 border border-gray-300 rounded-xl bg-white shadow-lg">
            <div className="flex w-full gap-20">
            <div className="font-bold text-4xl">{username}</div>
            {
                isComm ? 
                <div className="flex gap-6 items-center">
                   <button>Acknowledged</button>  <button>Contact Owner</button>  <button>Work in Progress</button>  <button>Mark as Resolved</button>
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


            <div className="flex items-center gap-1 mt-4">
                <img className="w-5" src="images/upvote.png" alt="upvote-logo" /> {upvotesCount}
            </div>
        </div>
    );
};

export default Post;
