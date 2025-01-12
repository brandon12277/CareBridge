"use client"
import {useEffect, useState } from 'react';
import axios from "axios"
// import Chatinbox from "./chatinbox";
import io from "socket.io-client";

 const socket = io.connect("http://localhost:5000");
function ChatBot() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inbox,setInbox]=useState(false);
  const [messages,setMessage]=useState({});
  const [messagesReceived,setMessagesReceived]=useState([]);
  const [personsroom,setPersons]=useState([]);
  const [certainperson,setcertainPerson]=useState({});
  const userid=localStorage.getItem('user');
  const user = JSON.parse(userid);
  const enterinbox=async(person)=>{
    setInbox(true);
    const userid=localStorage.getItem('user');
    const user = JSON.parse(userid);
    console.log(user.name);
    const roomgenerate = await axios.post("/auth/chat",{room:person.roomId,p1:person.person1,p2:person.person2,messages:messages});
     socket.emit("join_room", {room:person.roomId});
     setcertainPerson(person);
  }
  const messagesend=async()=>{
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // const userid=localStorage.getItem('user');
    // const user = JSON.parse(userid);
    const person1=user.name;
    const person2=user.name===certainperson.person2 ? certainperson.person1:certainperson.person2;
    const message={
        sender:person1,
        reciever:person2,
        text:messages,
        date:formattedTime,
    }    ;
    const data={
        
            person1:person1,
            person2:person2,
            roomId:certainperson.roomId,
            message:message
        
    }
    
    socket.emit("send_message",data);
    const roomgenerate = await axios.post("/auth/chat",{room:certainperson.roomId,p1:certainperson.person1,p2:certainperson.person2,messages:message});
    

    const chat=document.getElementById('chat');
    chat.innerHTML+=addChat(message.text,message.date);
    
    

  }
  const sendChat = (msg,time)=>{

       

       
        
    // let data = {
    //     "sender":
    // }



//    const sendText = await axios.post("/auth/routes/chat/addChat",data)
   
    return `
    <div className="w-auto flex justify-start bg-green-200 items-center">
        <div className="p-1  chat-block-send">

                  <p class="flex  items-center">${msg}</p>
                  <p class="time-text"> ${time}</p>

        </div>

    </div>
    `
}

const addChat = (msg,time)=>{

    

 
  return `
  <div className="w-auto flex justify-start bg-green-200 items-center">
        <div className="p-1  chat-block-send">

                <p className="flex items-center">${msg}</p>
                <p className="time-text"> ${time}</p>

      </div>

  </div>
  `
}

  useEffect(() => {
    const fetchperson=async()=>{
    const userid=localStorage.getItem('user');
    const user = JSON.parse(userid);
    console.log(user.name);
    const allperson = await axios.post("/auth/chatperson",{pname:user.name});
    console.log("All preson");
    console.log(allperson.data.Chats);
    if(allperson.data.Chats.length==0)
    {
        const roomgenerate = await axios.post("/auth/chat",{room:"abc",p1:user.name,p2:"Soumik",messages:messages});
        //allperson = await axios.post("/auth/chatperson",{pname:user.name});
    }
    
    setPersons(allperson.data.Chats);

    setMessagesReceived(prevMessagesReceived => [...prevMessagesReceived, allperson.data.Chats[0]]);
    console.log("previous messages");
    console.log(messagesReceived);
    }

    fetchperson();

     socket.on("receive_message", (data) => {
      const chat=document.getElementById('chat');
      chat.innerHTML+=sendChat(data.messages.text,data.messages.date);
       console.log("message recieved");
       console.log(data);
       
        console.log(messagesReceived);
     });
    },[socket]);

  

  
//   const filteredPersons = personsroom.filter(person =>
//     person.toLowerCase().includes(searchQuery.toLowerCase())
//   );


  return (
    <div className='flex'>
    {inbox ? 
        <div className="max-w-sm w-full h-[300px] bg-white shadow-lg rounded-lg p-4 flex flex-col">
        
        <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 rounded-lg p-2 overflow-auto scrollbar-thumb scrollbar-thumb-rounded">
          
          {messagesReceived[0].messages!=undefined && messagesReceived[0].messages.map((element , index) => (
            
            <div className={element.sender===user.name ?"flex justify-end  ":"flex justify-start  gap-2"}  key={index}>
            {/* {props.messages.socketId!==props.socketid.id && <p className="bg-[#8576FF] p-2 rounded-full text-white h-10  font-bold">{props.messages.sender[0]}</p>} */}
            <div className={element.sender===user.name ?"bg-[#8576FF] rounded-xl rounded-tr-none p-2 max-w-[75%] shadow-2xl":"bg-[#31363F] rounded-xl rounded-tl-none p-2 max-w-[75%] shadow-2xl"}>
                <p className=" text-sm text-blue-600  ">{element.sender}</p>
                <p className="text-white  text-sm">{element.text}</p>
                <p className="text-white  text-sm">{element.date}</p>
                {/* <p className="text-white font-semibold text-lg">{props.messages.socketId}</p> */}
            </div>
            </div>
            ))}

            <div id="chat"></div>

        </div>
  
        {/* Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => {setMessage(e.target.value);}}
          />
          <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none" onClick={messagesend}>
            Send
          </button>
        </div>
      </div>
      
       :

    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-4">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a person"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Persons List */}
      <div className="h-64 overflow-y-auto">
        {personsroom.length > 0 ? (
          <ul className="space-y-2">
            {personsroom.map((person, index) => (
              <li
                key={index}
                className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={()=>{enterinbox(person)}}
              >
                <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                  {user.name===person.person2 ? person.person1[0]:person.person2[0]}
                </div>
                <span className="ml-3 text-gray-700">{user.name===person.person2 ? person.person1:person.person2}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No persons found.</p>
        )}
      </div>
    </div>}
    </div>
  );
}

export default ChatBot;

