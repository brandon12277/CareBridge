"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import toast, { Toaster } from "react-hot-toast";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { getAuth,signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth"
import firebaseApp from "@/utils/firebase";


const poppinsthick = Poppins({
    weight: '800',
    subsets: ['latin'],
  })

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })

  const notify = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

const SignUp = () =>{
     
   const[on,setOn] = useState(null)
   const[google,setGoog] = useState(null)
   const[checkPass,setCheck] = useState(null)
   const[error,setErr] = useState(null)
   const[usermode,setUserMode]=useState(true);
   const router = useRouter();


 

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email:'',
        confirm_password : '' 
      });
      const handleChange = (e) => {
          const { name, value } = e.target;

          
          setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
          }));

        
      };

      useEffect(() => {
         validatePassword();
       }, [formData.confirm_password,formData.password]);
       

       const loginWithGoogle = async () => {
         setGoog(1)
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
               userProfileSet: false
             }
             
             console.log(form_data)
             try{
             const login = await axios.post("/auth/routes/user/loginUser",form_data)
   

       if(login){
        console.log(login.data.user)
        localStorage.setItem("user",JSON.stringify(login.data.user))
        localStorage.setItem("auth",true)
        notifySuccess("Congratulation!! You logged in")
        window.location.href= "/"
     }
   }
     catch(err){
     
      axios.post('/auth/routes/user/createUser', form_data)
      .then((res)=>{
        console.log(res.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem("auth",true)
        notifySuccess("Congratulation!! You logged in")
        router.push("/")
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

        const handleSignup = async () => {
         
            try{

            setOn(1)
           const auth = getAuth(firebaseApp);
           axios.get('/auth/user/ValidateExistingUser?email='+formData.email)
           .then(async (res)=>{
           
             const userCredential = await createUserWithEmailAndPassword(auth,formData.email, formData.password);
             const user = userCredential.user;
            console.log(userCredential)
             const form_data = {
               name : formData.name,
               email : formData.email,
               password : formData.password
             }
             console.log(form_data)
             axios.post('/auth/user/createUser', form_data)
             .then((response)=>{
               console.log(response.data)
               notifySuccess("Congratulation!! Your account is created")
               router.push("/Login")
             })
             .catch(err=>{
               console.log(err)
               setOn(null)
               setErr(err.data)
             })
            
             
           })
           .catch(async err=>{
            setOn(null)
             console.log(String(err))
             if(err.response || err){
               if(err.response)setErr(err.response.data)
               else
               setErr(String(err))
             }
             
             else
             setErr("The email address is already in use by another account")
     
            
           })
         }
         catch(err){
            setOn(null)
            setErr(err.response)
         }
          
            
           
           
     
          
         
       };
      

      function validatePassword() {
         var password = formData.password;
         var confirmPassword = formData.confirm_password
        
          if(password == '' || confirmPassword == '')return
       

         
         if (password === confirmPassword ) {
             setCheck(1)
             
         } else {
             setCheck(2)
             
         }
     
        
     }

   
 
     return(
       <>
       
         <div className="w-full h-100 flex justify-center items-center flex-col bck-main ">
        <div className="w-full flex items-center justify-center  p-5">
         <img src="/images/logo.png" style={{width:"150px",height:"auto"}}></img> 
        </div>
        <div className="w-[60vh] flex flex-col items-center py-8 ">
          <div className="w-full flex items-center justify-center">
          <button className={usermode ? " bg-green-400 border-gray-500 border-2 rounded-lg w-full p-4" :"border-gray-500 border-2 rounded-lg w-full  p-4"} onClick={()=>{setUserMode(true)}}>User</button>
          <button className={!usermode ? " bg-green-400 border-gray-500 border-2 rounded-lg w-full p-4" :"border-gray-500 border-2 rounded-lg w-full  p-4"} onClick={()=>{setUserMode(false)}}>Communities</button>

          </div>
          {usermode ?
          <div className="w-[65vh] m-2 rounded-lg shadow-lg bg-white px-8 py-10 gap-6 flex justify-center items-center flex-col">

                      <div className="flex justify-center items-center flex-col">
         
                       <h2 className="font-bold text-grey">Sign Up Users</h2>
                       <p>Already have an account? <span><a style={{color:"green"}} href="/Login">Login</a></span></p>
                       <p className="mt-6">{error}</p>
                       </div>
                       
                        
                        <div className="w-full m-2 flex flex-col justify-center items-center gap-2">
                             
                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Email Address</label>
                                 <input onChange={handleChange} type="text" name="email" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Name</label>
                                 <input onChange={handleChange} type="text" name="name" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img> Password</label>
                                 <input  onChange={()=>{handleChange(event)}} type="password" name="password" placeholder="Password" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img>Confirm Password</label>
                                 <input onChange={()=>{handleChange(event)}} type="password" name="confirm_password" placeholder="Password" class="w-full log-input"></input>

                              </div>

                              <p className="">

                                 <span className={` ${checkPass === 1 ? "text-green-600" : checkPass === 2 ? " text-red-500 " : ""}   `} >

                                 {checkPass == 1 ? <>✓ Passwords match</> : checkPass == 2 ? <>✗ Passwords do not match</> : <></>}


                                 </span>

                              </p>

                              {

!on?
<button onClick={handleSignup} className="bg-green-500 px-10 py-2 rounded-full shadow">Sign Up</button>

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
color={"yellow"}

size={50}

/>
</>

}




                        </div>
         
            

             


          </div>
          :

          <div className="w-[65vh] m-2 rounded-lg shadow-lg bg-white px-8 py-10 gap-6 flex justify-center items-center flex-col">

<div className="flex justify-center items-center flex-col">

 <h2 className="font-bold text-grey">Sign Up Community</h2>
 <p>Already have an account? <span><a style={{color:"green"}} href="/Login">Login</a></span></p>
 <p className="mt-6">{error}</p>
 </div>
 
  
  <div className="w-full m-2 flex flex-col justify-center items-center gap-2">

        <div className="form">
           
           <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Community Name</label>
           <input onChange={handleChange} type="text" name="name" placeholder="Community Name" class="w-full log-input"></input>

        </div>

        <div className="form">
           
           <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Email Address</label>
           <input onChange={handleChange} type="text" name="email" placeholder="Email" class="w-full log-input"></input>

        </div>


        {/* <div className="form">
           
           <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Name</label>
           <input onChange={handleChange} type="text" name="name" placeholder="Email" class="w-full log-input"></input>

        </div> */}

        <div className="form">
           
           <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img> Password</label>
           <input  onChange={()=>{handleChange(event)}} type="password" name="password" placeholder="Password" class="w-full log-input"></input>

        </div>

        <div className="form">
           
           <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img>Confirm Password</label>
           <input onChange={()=>{handleChange(event)}} type="password" name="confirm_password" placeholder="Password" class="w-full log-input"></input>

        </div>

        <div className="form">
           
           <label className="font-bold flex items-center gap-2">Description</label>
           <input onChange={handleChange} type="text" name="desc" placeholder="description" class="w-full log-input h-20"></input>

        </div>

        <p className="">

           <span className={` ${checkPass === 1 ? "text-green-600" : checkPass === 2 ? " text-red-500 " : ""}   `} >

           {checkPass == 1 ? <>✓ Passwords match</> : checkPass == 2 ? <>✗ Passwords do not match</> : <></>}


           </span>

        </p>

        {

!on?
<button onClick={handleSignup} className="bg-green-500 px-10 py-2 rounded-full shadow">Sign Up</button>

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
color={"yellow"}

size={50}

/>
</>

}




  </div>






</div>}

          </div>

         </div>
       
       </>
     )

}

export default SignUp