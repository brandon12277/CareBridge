import mongoose, { Schema } from "mongoose"

const Communities = new Schema({
    name : String,
    
    descp : String,

    commType : String,

    location : String,

    
    owner: String,
    
    password:String,

     moderators : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', 
        }

    ],
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', 
            
        }

    ],
    posts: [{

        poster: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users', 
          
        },
        postImg : {
            type  : String
        },
        descp: {
          type: String,
          
        },
      }]



});




const Comms = mongoose.models.Communities  || mongoose.model('Communities',Communities)



export default Comms;