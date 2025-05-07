const mongoose =require("mongoose");

const user =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address: {
        street: {
          type: String,
          required: false, 
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false, 
        },
        postalCode: {
          type: String,
          required: false, 
        },
        country: {
          type: String,
          required: false, 
        },
      },
      phoneNumber: {
        type: String,
        required: false,
      },
    avatar:{
        type:String,
        default:"https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?semt=ais_hybrid",
    },
    role:{
       type:String,
       default:"user",
       enum:["user","admin"],
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"books",
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"books",
       }
    ],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order",
       },
    ],
},
{timestamps:true}
);

module.exports=mongoose.model("user",user);