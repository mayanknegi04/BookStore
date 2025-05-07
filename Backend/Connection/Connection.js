const mongoose=require("mongoose");

const connectToDatabase=async()=>{
   try{
     await mongoose.connect(process.env.URL);
     console.log("Connection to database");
   }catch(error){
    console.log("Connection failed during connecting to database");
   }
};

connectToDatabase();