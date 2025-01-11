import mongoose, { Schema } from "mongoose"

const PostSchema = new Schema({
    name : String,
    
    descp : String,

    photo : String,

    tag : 
    {
            type: String,
    },

    owner : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', 
      required: true
      },

     upvotes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', 
        }

    ],
   



});




const Post = mongoose.models.Post  || mongoose.model('Post',PostSchema)



export default Post;