import Users from "@/models/users";

import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import bcrypt from "bcrypt"

export async function POST(request){
    const { email,name,password} =await request.json();
    try{
        
        await connectDb()
        
        console.log("Data : ",name,email,password)
        const finduser = {
            email  : email
        }
         
        console.log(finduser)
        

        
        const user = await Users.findOne(finduser)
         
          console.log(user,user.password)
        if(user.password === ''){
            return NextResponse.json({user},{status:201});
        }
        console.log(user.password)
        if(user){
            
           const res = await bcrypt.compare(password, user.password);
            
          
            
      
            if(res)return NextResponse.json({user},{status:201});
            else
            return NextResponse.json({message:"Not Found"},{status:400});
           
        }
        else{
            return NextResponse.json({message:"Not Found"},{status:400});
        }
       }

       catch(err){
           console.log(err)
       }
        
        
       return NextResponse.json({message:"Not Found"},{status:400});
    
    
    

}