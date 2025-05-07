const express= require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
require("./Connection/Connection")

const user =require("./routes/user");
const book=require("./routes/book");
const fav=require("./routes/fav");
const cart=require("./routes/cart");
const order=require("./routes/order");
app.use(express.json());
app.use(cors());

app.use("/api/v1",user);
app.use("/api/v1",book);
app.use("/api/v1",fav);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT,()=>{
    console.log(`server started ${ process.env.PORT}`);
})