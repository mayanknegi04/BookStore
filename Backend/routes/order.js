const {authenticateToken}=require("./userAuth");
const Book =require("../models/book");
const Order=require("../models/order");
const User=require("../models/user");
const router=require("express").Router();
//place order
router.post("/place-order",authenticateToken,async(req,res)=>{
   try{
     const {id}=req.headers;
     const {order}=req.body;

     for(const orderData of order){
        const newOrder=new Order({user:id,book:orderData._id});
        const orderDataFromDb=await newOrder.save();

        //  Update the user's orders
        await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDb._id}});

        //remove the book from the cart
        await User.findByIdAndUpdate(id,{
            $pull:{cart:orderData._id},
        });
      }
        return res.status(200).json({
           message:"Order Placed successfully",
        });
   }catch(error){
      console.log("Error during placing order",error);
      return res.status(500).json({message:"Internal Server Error"});
   }
});

//get order history of particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try{
       const {id}=req.headers;
       const userData=await User.findById(id).populate({
        path:"orders",
        populate:{path:"book"},
       });
       
       const orderData=userData.orders.reverse();
       return res.json({
        status:"Success",
        data:orderData,
       });
    }catch(error){
        console.log("Error during getting user orders",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//get all orders (admin)
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try{
       const {id}=req.headers;
       const userData=await Order.find()
       .populate({
        path:"book",
       })
       .populate({
        path:"user",
       })
       .sort({createdAt:-1});
 
       return res.json({
        status:"Success",
        data:userData,
       });
    }catch(error){
        console.log("Error during getting all orders",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//update order (admin)
router.put("/update-satus/:id",authenticateToken,async(req,res)=>{
    try{
       const {id}=req.params;
       await Order.findByIdAndUpdate(id,{status:req.body.status});
       return res.json({
        status:"Success",
        message:"Status Updated Successfully"
       });
    }catch(error){
        console.log("Error during updating status of order",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports=router;