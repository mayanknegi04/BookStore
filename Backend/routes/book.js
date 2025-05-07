const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// add book -(admin)
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const { url, title, author, price, desc, language,genre} = req.body;

        const { id } = req.headers;
        const user = await User.findById(id);
        
        // check if user exists and has a admin role
        if (!user || user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to add books" });
        }
        // Validate the input
        if (!url || !title || !author || !price || !desc || !language|| !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // create the new book
        const book = new Book({
            url,
            title,
            author,
            price,
            desc,
            language,
            genre,
        });

        // save the book to the database
        await book.save();

        // return success response
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        console.log("Error during adding book", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put("/update-book/:id", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Check if bookid exists 
        if (!bookid) {
            return res.status(400).json({ message: "Book id required" });
        }

        const { url, title, author, price, desc, language } = req.body;
        
        //update the book 
        const updatedBook=await Book.findByIdAndUpdate(bookid, {
            url, title, author, price, desc, language
        });

         // If book not found, return 404
        if(!updatedBook){
          return res.status(404).json({message:"Book Not Found"});
        }
         // Return success message
        return res.status(200).json({ message: "Book Updated successfully" });
        

    } catch (error) {
        console.log("Error during Updating book", error);
        return res.status(500).json({ message: error });
    }
});

router.delete("/delete-book",authenticateToken,async(req,res)=>{
      try{
         const {bookid}=req.headers;

        // Check if bookid exists 
        if (!bookid) {
            return res.status(400).json({ message: "Book id is required" });
        }

         //find  the book and delete it
         const deletedBook=await Book.findByIdAndDelete(bookid);
         
         // If book not found, return 404
         if(!deletedBook){
            return res.status(404).json({ message: "Book not found" });
         }
          // Return success message
         return res.status(200).json({
            message:"Book deleted successfully"
         })

      }catch(error){
        console.log("Error during deleting the book", error);
        return res.status(500).json({ message: error });
      }
});

// get all books 
router.get("/get-all-books",async(req,res)=>{
    try{
        //find the books and sorting them by the createdAt field 
       const books=await Book.find().sort({createdAt:-1});
       return res.json({
        status:"success",
        data:books,
       });
    }catch(error){
        console.log("Error during fetching all the books",error);
        return res.status(500).json({message:"Something went wrong while fetching books."});
    }
});

// get the recently added books
router.get("/get-recent-books",async(req,res)=>{
    try{
        //find  recently added books
       const books=await Book.find().sort({createdAt:-1}).limit(4);
       return res.json({
        status:"Success",
        data:books,
       });
    }catch(error){
        console.log("Error during fetching all the books",error);
        return res.status(500).json({message:"Something went wrong while fetching books."});
    }
});


// fetching the deatils of the book
router.get("/get-book-by-id/:id",async (req,res)=>{
    try{
        const {id}=req.params;

        //find  book by it's id 
        const book =await Book.findById(id);
        return res.json({
            status:"Succss",
            data:book,
        })
    }catch(error){
        console.log("Error during fetching the book details",error);
        return res.status(500).json({message:"Something went wrong while fetching book detail."});
    }
})

module.exports = router;