import mongoose from "mongoose"

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.CONN_STR,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
         })
        console.log("Connected to db")
    }
    catch(err){
      console.log(err)
    }
};

export default connectDb;