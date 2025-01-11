import { NextResponse } from "next/server"
import ShortUniqueId from 'short-unique-id';
import mongoose from "mongoose"
import Post from "@/models/Post";

import { getStorage, ref,getDownloadURL, uploadBytes,uploadString,uploadBytesResumable } from "firebase/storage"

import firebaseApp from "@/utils/firebase";




function getCurrentDateTimeString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}:${seconds}`;

  const dateTimeString = `${dateString} ${timeString}`;

  return dateTimeString;
}


async function file_url(buff){

const storage = getStorage(firebaseApp);
const { randomUUID } = new ShortUniqueId({ length: 10 });
console.log(randomUUID)
const storageRef = ref(storage, "carebridge/"+randomUUID()+getCurrentDateTimeString());




await uploadString(storageRef, buff, 'data_url');
const downloadURL = await getDownloadURL(storageRef);

return downloadURL
}

export async function POST(request){

    const { name,descp,owner,tag,photo} =await request.json();
    
    const img = await file_url(photo)
    const data ={
        "name":name,
        "descp" :descp,
        "photo" : img,
        "tag" : tag,
        "owner" : owner

        }
       console.log(data)
        await Post.create(data);
   


    return NextResponse.json({data},{status:201});
   
    
    
    
    

}