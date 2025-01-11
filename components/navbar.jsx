
"use client"

import { useState, useEffect } from "react";
import { Poppins } from 'next/font/google'
import { Ruluko } from 'next/font/google'







const Navbar = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [on, setNav] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState()
  const [type,setType] = useState()

  useEffect(()=>{
    setType(localStorage.getItem("type"))
    const userdata = JSON.parse(localStorage.getItem("user"))
    

    if (userdata){
      setUser(userdata.name)
    }else{
      setUser(null)
    }

    const auth = localStorage.getItem("auth")
    if (auth === true){
      setNav(1)
    }else{
      setNav(null)
    }
  },[])


  const handleClick = () => {
    setIsOpen(!isOpen);
    navigateBar()
  };

const handleLogout = () => {
  localStorage.removeItem("auth")
  localStorage.removeItem("user")
  localStorage.removeItem("type")
  setUser(null)
}

  const navigateBar = () => {

    if (on) setNav(null)
    else
      setNav(1)



  };

  useEffect(() => {

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 750);
    };


    window.addEventListener('resize', handleResize);


    handleResize();


    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []);

  const redirectToLink = (url) => {
    window.location.href = url;
  };

  const UnAuthNav = (
    <>
      {isSmallScreen ?
        <div className="p-2 w-full flex flex-col justify-center items-center br-d nav-col nav-bck">
          <div className="p-2 w-full flex justify-center items-center">
            <div className="">
              <img src="/images/logo.png" style={{ width: "150px", height: "auto" }}></img>
            </div>
            <div className="w-full flex justify-end gap-20 mr-5 ">

              <button className="flex items-center justify-center p-2" aria-label="Toggle Menu" onClick={handleClick}>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {
            on ?
              <div id="nav-mob" className="w-full flex flex-col items-center gap-20 mt-5">
                <button onClick={() => redirectToLink('/')} className="def-but pt-1 pr-4 pb-1 pl-4 ">Home</button>
                <button onClick={() => redirectToLink('/')} className="def-but pt-1 pr-4 pb-1 pl-4 ">Contact</button>
                <button onClick={() => redirectToLink('/Login')} className="def-but pt-1 pr-4 pb-1 pl-4 ">Login</button>
                <button onClick={() => redirectToLink('/Login')} className="bg-yellow-500 px-8 py-4 rounded-full shadow">Sign Up</button>


              </div>
              :
              <></>

          }
        </div>
        :
        <div className={` poppins w-full flex flex-row items-center justify-center p-6  nav-bck`}>
          <div className=" ">
            <img src="/images/logo.png" style={{ width: "200px", height: "auto" }}></img>
          </div>
          <div className="w-full flex  items-center justify-end gap-5 mr-10">
            <button onClick={() => redirectToLink('/Login')} className="def-but pt-1 pr-4 pb-1 pl-4 text-black font-bold">Login</button>
            <button onClick={() => redirectToLink('/SignUp')} className="bg-green-500 w-fit font-[400] px-3 py-2 rounded-lg shadow">Sign Up</button>
          </div>

        </div>
      }


    </>

  )


  const authNavUser = (

    <>
      {isSmallScreen ?
        <div className="p-2 w-full flex flex-col justify-center items-center br-d nav-col nav-bck">
          <div className="p-2 w-full flex justify-center items-center">
            <div className="">
              <img src="/images/logo.png" style={{ width: "150px", height: "auto" }}></img>
            </div>
            <div className="w-full flex justify-end gap-20 mr-5 ">

              <button className="flex items-center justify-center p-2" aria-label="Toggle Menu" onClick={handleClick}>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {
            on ?
              <div id="nav-mob" className="w-full flex flex-col items-center gap-5 mt-5">
                <button onClick={() => redirectToLink('/Login')} className="def-but pt-1 pr-4 pb-1 pl-4 font-bold ">Login</button>
                <button onClick={() => redirectToLink('/Login')} className="bg-green-500 w-fit font-[400] px-3 py-2 rounded-lg shadow">Sign Up</button>


              </div>
              :
              <></>

          }
        </div>
        :

        <div className={` poppins w-full flex flex-row items-center justify-center p-6  nav-bck`}>
          <div className=" ">
            <img src="/images/logo.png" style={{ width: "200px", height: "auto" }}></img>
          </div>
          <div className="w-full flex  items-center justify-end gap-5 mr-10">
            <div className="logo w-max flex justify-center items-center gap-3">
              <img src="/images/user.png" alt="user-logo" className="w-6" />
              <div className="text-mid">Welcome, <span className="font-bold text-mid">{user}</span></div>
            </div>
            <button onClick={handleLogout} className="bg-green-500 w-fit font-[400] px-3 py-2 rounded-lg shadow">Sign Out</button>
          </div>

        </div>
      }


    </>


  )

  return (
    <>
      {type? authNavUser:UnAuthNav}
      {console.log(user)}
    </>
  )


}

export default Navbar