import Chat from "@/models/chatRoom";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"
import mongoose from "mongoose";


export async function POST(request){
    const  reqdata =await request.json();
    await connectDb()
    
    

    
        console.log(reqdata);

        const chats = await Chat.find({
            $or: [
              { person1: reqdata.pname },  // Check if person1 matches the given name
              { person2: reqdata.pname }   // Check if person2 matches the given name
            ]
          });

          console.log(chats);
      
          // Return the list of distinct associated persons
        //   if(associatedPersons.length > 0 ){
        //     console.log(associatedPersons[0].persons);
            return NextResponse.json({Chats:chats},{status:201});
            
        //   }else{
        //     console.log(",kjgohe");
        //     return NextResponse.json({person:[]},{status:201});

        //   }
       
    


    
    
    
   
    
    
    
    

}