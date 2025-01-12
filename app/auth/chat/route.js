import Users from "@/models/chatRoom";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"
import mongoose from "mongoose";


export async function POST(request){
    const  reqdata =await request.json();
    await connectDb()
    
    

    
        console.log(reqdata);

        const roomdetails = await Users.findOne({roomId:reqdata.room});

        if(!roomdetails){

        console.log("messagebox is being created");

        const data ={
            "person1":reqdata.p1,
            "person2" :reqdata.p2,
            "roomId":reqdata.room,
            
        }

        const user = new Users(data);

        await user.save();
        return NextResponse.json({status:201});
    
    } 
    else{

        console.log("message is being updated");
        if(Object.keys(reqdata.messages).length !=0)
        {
            
            console.log("updated");
            console.log(reqdata);
            Users.updateOne(
            { roomId: reqdata.room}, 
            { $push: { messages: { sender:reqdata.messages.sender, receiver:reqdata.messages.reciever ,text:reqdata.messages.text, date:reqdata.messages.date} } }  // Push new object to hobbies array
            ).then(result => {
                console.log('Object added successfully:', result);
              })
              .catch(err => {
                console.error('Error adding object:', err);
              });
        }
          return NextResponse.json({status:201});



    } 
    
     
    


    
    
    
   
    
    
    
    

}