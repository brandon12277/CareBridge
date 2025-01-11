import Users from "@/models/communities";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose";


import bcrypt from "bcrypt"


export async function POST(request){
    const  reqdata =await request.json();
    await connectDb()
    
    

    try{
        console.log(reqdata);
        const data ={
            "name":reqdata.comm_name,
            "descp" :reqdata.desc,
            "commType":reqdata.type,
            "location":reqdata.location,
            "owner":reqdata.email,
            "password" :reqdata.password,
        }
    
        let user = "";
        if(reqdata.password === ''){
           user = await Users.create(data);
           return NextResponse.json({user},{status:201});

        }
        else
        {
    bcrypt.genSalt(3, function(err, salt) {
        bcrypt.hash(reqdata.password, salt, async function(err, hash) {

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