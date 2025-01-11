import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose";


import bcrypt from "bcrypt"


export async function POST(request){
    const { email,name,password} =await request.json();
    await connectDb()
    
    

    try{

        const data ={
            "name":name,
            "email" : email,
            "password" : password,
        }
    
        let user = "";
        if(password === ''){
           user = await Users.create(data);
           return NextResponse.json({user},{status:201});

        }
        else
        {
    bcrypt.genSalt(3, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            data["password"] = hash

                
           
             user =  await Users.create(data);
             return;
            
        });
    });
     
    console.log(user)
    return NextResponse.json({user},{status:201});
     }



    
    }
    catch(err){
        console.log(err)

        return NextResponse.json(false,{status:400});

    }
   
    
    
    
    

}