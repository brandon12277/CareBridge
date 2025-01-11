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
    messages: [{
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users', 
          required: true
        },
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users', 
          required: true
        },
        text: {
          type: String,
          required: true
        },
        date : {
          type : String
        },
      }]

});




const Chat = mongoose.models.ChatRoom || mongoose.model('ChatRoom',ChatSchema)



export default Chat;