import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"




export async function GET(request){
  const searchparams = request.nextUrl.searchParams
  const email = searchparams.get("email")

  console.log(email)


    

    try {
        
        const data = {
          "email" : email
         }
           
        const user= await Users.find(data)
        
        if(user.length === 0)
       return NextResponse.json(true,{status:201})
      else
        return NextResponse.json(false,{status:400})

      } catch (error) {
        
       
        return NextResponse.json(false,{status:201})
      }

}