
"use client"

import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";


import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'

import { getAuth,signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword } from "firebase/auth"
import firebaseApp from "@/utils/firebase";
import { useRouter } from "next/navigation";


const poppinsthick = Poppins({
    weight: '800',
    subsets: ['latin'],
  })

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })





const Login = () =>{

  const[on,SetOn] = useState(null)
  const[google,SetGoog] = useState(null)
  const[error,setErr] = useState(null)
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    password: '',
    email:''
  });
  const handleChange = (e) => {
      const { name, value } = e.target;
     setFormData({
      ...formData,
      [name]: value
    });
  };

  const notify = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);


  const handleForm = async () =>{
    SetOn(1);
     try{
    const login = await axios.post("/auth/routes/user/loginUser",formData)
   

    if(login){
         const auth = getAuth(firebaseApp);
       
        console.log(login.data.user)
        const userCredential = await signInWithEmailAndPassword(auth,login.data.user.email,formData.password);
        localStorage.setItem("user",JSON.stringify(login.data.user))
        localStorage.setItem("auth",true)
        notifySuccess("Congratulation!! You logged in")
        window.location.href= "/"
    }
     }
     catch(err){
      SetOn(null)
        console.log(err.response)
        setErr(err.response.data.message)
     }
  
   
    
      
  }

  const loginWithGoogle = async () => {
    SetGoog(1);
    try {
      
     
       const auth = getAuth(firebaseApp);

         signInWithPopup(auth,new GoogleAuthProvider())
         .then(async (userCredential) => {
            if (userCredential) {
               const user = userCredential.user;
        
         
        
        
        
        const form_data = {
          name : userCredential.user.displayName,
          email : userCredential.user.email,
          password  : '',
          
        }
        
        console.log(form_data)
        try{
        const login = await axios.post("/auth/routes/user/loginUser",form_data)


  if(login){
   console.log(login.data.user)
   localStorage.setItem("user",JSON.stringify(login.data.user))
   localStorage.setItem("auth",true)
   
   router.push("/")
}
}
catch(err){
 console.log(err)
 axios.post('/auth/routes/user/createUser', form_data)
 .then((res)=>{
   console.log(res.data.user)
   localStorage.setItem('user', JSON.stringify(res.data.user));
   localStorage.setItem("auth",true)
   notifySuccess("Congratulation!! You logged in")
   return router.push("/")
 })
 .catch(async err=>{
   
})
}
        
       
        
         
            }
         });
      
      
    }
    catch (error) {
      console.log(error)
    }

   };

 
 
     return(
      <>
     
         <div className="w-full h-100 m-0 flex justify-center items-center flex-col ">
         <div className="w-full flex items-center justify-center  p-5">
         <img src="/images/logo.png" style={{width:"150px",height:"auto"}}></img> 
      </div>
      <div className="w-[60vh] flex flex-col items-center py-6 ">
          <div className="w-full flex items-center justify-center">
          <button className="w-full py-6 px-4">User</button>
          <button className="w-full py-6 px-4">Communities</button>

          </div>
         
          <div className=" w-full shadow-lg rounded-lg px-8 py-10 gap-10 flex justify-center items-center flex-col bg-white">

                      <div className="flex justify-center items-center flex-col">
         
                       <h2 className="font-bold text-2xl text-gray-600">Login</h2>
                       <p>Dont have an account yet? <span><a style={{color:"green"}} href="/SignUp">Sign up</a></span></p>
                       <p className="mt-6">{error}</p>
                       </div>
        
                        <div className="w-full m-5 flex flex-col justify-center items-center gap-5">
                             
                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Email Address</label>
                                 <input onChange={handleChange} type="text" name="email" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex  gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img> Password</label>
                                 <input onChange={handleChange} type="password" name="password" placeholder="Password" class="w-full border-"></input>

                              </div>

                              {

                                  !on?
                              <button onClick={handleForm} className="bg-green-500 px-10 py-2 rounded-full shadow">Login</button>
                              :
                              <>
                                 <ClipLoader
        color={"yellow"}
       
        size={50}
       
      />
                              </>
                               
                                 }
<div className="w-full flex gap-2 items-center justify-center">
   <hr className="h-1  w-full "></hr>
   <h2 className="text-gray-500 w-full ">Or Sign Up Using</h2>
   <hr className="h-1  w-full"></hr>
</div>


{

!google?
<button onClick={loginWithGoogle} className="bg-green-300 px-10 py-2 flex gap-2 items-center  rounded-full shadow"><img className="w-4 w-4" src="images/goog.png"></img>Google</button>

:
<>
<ClipLoader
color={"green"}

size={50}

/>
</>

}

                        </div>
             
      </div>
          
         
            

             


          </div>

         </div>
         

      </>
     )

}

export default Login