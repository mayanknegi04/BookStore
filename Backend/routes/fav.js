const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favourite
router.put("/add-book-to-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        //  find the user in database
        const userData = await User.findById(id);

        // Check if the book is already in the user's favourites
        const isBookFav = userData.favourites.includes(bookid);

        // if book is in favourites
        if (isBookFav) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }

        // add book to the database
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

        // return success
        return res.status(200).json({ message: "Book added to favourites" });

    } catch (error) {
        console.error("Error during adding book to favourites: ", error);
        res.status(500).json({ message: "Server Error" });
    }
})

//remove book from favourites

router.delete("/remove-book-from-fav", authenticateToken, async (req, res) => {
    try {
       const {id,bookid}=req.headers;
       const userData=await User.findById(id);

       //check if book is in user's favourite
      const isBookFav= userData.favourites.includes(bookid);
      
    //   if book is in favourites,remove from the favourites
      if(isBookFav){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
      }

      //return success
      return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        console.error("Error during removing book from favourites: ", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

//get the favourite books
router.get("/get-fav-books",authenticateToken,async(req,res)=>{
    try{
      const {id}=req.headers;
    //   finding the user and getting the full book documents for the books in the favourites using populate
      const userData=await User.findById(id).populate("favourites");

      //extracting only the favourite books 
      const favouriteBooks=userData.favourites;
      
    //   return success
      res.status(200).json({status:"success",data:favouriteBooks});
    }catch(error){
        console.error("Error during fetching favourite books: ", error);
        return res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;