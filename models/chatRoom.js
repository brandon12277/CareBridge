import mongoose, { Schema } from "mongoose"

const ChatSchema = new Schema({
    person1 : {
        type: String,
        required  : [true]
    },
    person2 : {
        type: String,
        required  : [true]
    },
    roomId : String,
    messages: [{
        sender: {
      type: String,
      required: true,  
    },
    receiver: {
      type: String,
      required: true,  
    },
    text: {
      type: String,
      required: true,  
    },
    date: {
      type: Date,  // Better to store this as a Date type
      default: Date.now,  // Defaults to the current date and time
    }
      }]

});




const Chat = mongoose.models.ChatRoom || mongoose.model('ChatRoom',ChatSchema)



export default Chat;