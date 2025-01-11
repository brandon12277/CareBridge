"use client"


import {useState,useEffect} from "react"




import DefaultPage from "../components/landingPage"



 


const Home = () =>{

  const [user,setUser] = useState(null)
  let auth = 1 ;
  if (typeof window !== 'undefined'){

  
  auth =localStorage.getItem("auth")
  }
  
  
  
  useEffect(()=>{

      if (typeof window !== 'undefined'){

      let userdata = localStorage.getItem("user")
      
      
      // console.log(userdata)
      // setUser(JSON.parse(userdata))
      
      }

      

     
      
       
  },[])

  

 

 
     return(
      <>

{
 auth && !user?
    <DefaultPage/>
 :
    user ?
    <DefaultPage/>
    :
    <DefaultPage/>
}
   

      </>

     )

}

export default Home