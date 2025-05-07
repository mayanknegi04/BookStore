const router=require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");

//add book to cart
router.put("/add-book-to-cart",authenticateToken,async(req,res)=>{
   try{
     const {bookid,id}=req.headers;

     //fecthing the user data from database
     const userData=await User.findById(id);

      // Check if the book is already in the user's cart
     const isBookInCart=userData.cart.includes(bookid);

       // If the book is already in the cart, return a message
     if(isBookInCart){
        return res.json({
            status:"success",
            message:"Book is already in cart"
        });
     }
    //  add the book to the user's cart
     await User.findByIdAndUpdate(id,{$push:{cart:bookid}});

    //  return success
     return res.status(200).json({
        message:"Book added to cart"
     });

   }catch(error){
    console.log("error during adding the book to cart",error);
    res.status(500).json({message:"Internal server error"});
   }
});

//remove book from cart
router.delete("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
      const {bookid}=req.params;
      const {id}=req.headers;

     //  remove the book from the user's cart 
      await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
 
     //  return success
      return res.status(200).json({
         message:"Book removed from cart"
      });

    }catch(error){
     console.log("error during removing the book to cart",error);
     res.status(500).json({message:"Internal server error"});
    }
 });

 //fetch the user cart
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("cart");
        // fetch the cart according to recently added
        const cart=userData.cart;
        
       //  return success
        return res.status(200).json({
          data:cart
        });
  
      }catch(error){
       console.log("error during fetching user cart",error);
       res.status(500).json({message:"Internal server error"});
      }
});
module.exports=router;