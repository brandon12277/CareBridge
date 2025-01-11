import mongoose, { Schema } from "mongoose"

const Communities = new Schema({
    name : String,
    
    descp : String,

    commType : String,

    owner : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', 
      required: true
      },

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
          required: true
        },
        postImg : {
            type  : String
        },
        descp: {
          type: String,
          required: true
        },
      }]



});




const Comms = mongoose.models.Communities  || mongoose.model('Communities',Communities)



export default Comms;