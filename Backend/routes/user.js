const router= require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");

//sign up
router.post('/sign-up',async(req,res)=>{
    try{
     const{username,email,password}=req.body;

    //checking for unique username
     const existingUserName = await User.findOne({username:username});
     if(existingUserName){
        return res.status(400).json({message:"UserName already Exist"});
     }

     // checking for existing email
     const existingEmail = await User.findOne({email:email});
     if(existingEmail){
        return res.status(400).json({message:"email already Exist"});
     }
     
     //Password Validation (at least one special char, one number, one uppercase, and minimum length of 6)
     const passwordRegrx=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
     if(!passwordRegrx.test(password)){
        return  res.status(400).json({message: "Password must contain at least one uppercase letter, one number, one special character, and be at least 6 characters long."});
     }
     
     // hashing the password
     const hashedPassword= await bcrypt.hash(password,10);

     // creating newUser
     const newUser=new User({
        username:username,
        email:email,
        password:hashedPassword,
     });

     //saving the new user to the database
     await newUser.save();

     return res.status(201).json({message:"SignUp successfully"})
       
    }catch(error){
      console.error("Error during sign up:",error);
        res.status(500).json({message:"Internal server error"});
    }
})


//sign in 
router.post("/sign-in",async(req,res)=>{
   try{
      const {username,password}=req.body;

      //check if user exists
      const existingUser=await User.findOne({username});
      if(!existingUser){
         return res.status(400).json({message:"Invalid Credentials"});
      }
      
      //compare passwords
      const isMatched= await bcrypt.compare(password, existingUser.password);
         if(isMatched){

            //creating Jwt token
            const token=jwt.sign({userID:existingUser._id,username:existingUser.username},process.env.JWT_SECRET,
            {expiresIn:"12h"}
            );
            res.status(200).json({message:"SignIn success",
               token:token,
               role:existingUser.role,
               id:existingUser._id
            });
         }else{
            res.status(400).json({message:"Invalid Credentials"});
         }
   }catch(error){
        console.error("Error during signing in: ",error);
        res.status(500).json({ message: "Server Error" });
   }
});

router.get("/get-user-information",authenticateToken,async(req,res)=>{
   try{
     const{id}=req.headers;
     const userData=await User.findById(id).select('-password');
     return res.status(200).json({userData});

   }catch(error){
      console.log("error during getting user info");
      res.status(500).json({message:"Internal server error"});
   }
});

router.put("/update-profile",authenticateToken,async(req,res)=>{
   try{
      console.log(req.body);
      
     const {phoneNumber,address}=req.body;
     const {id}=req.headers;

     let updates={};
    

       // Check if phone number is being updated and validate
   if (phoneNumber) {
         const phoneRegex = /^[0-9]{10}$/; // Simple phone number format check (10 digits)
         if (!phoneRegex.test(phoneNumber)) {
           return res.status(400).json({ message: "Invalid phone number format" });
         }
         updates.phoneNumber = phoneNumber;
       }
     // Validate and update address
     
     if (address) {
      const { street, city, state, postalCode, country } = address;
      if (!street || !city || !state || !postalCode || !country) {
        return res.status(400).json({ message: "Complete address is required" });
      }
      updates.address = address;
    }
    
      console.log(address);
     const updatedUser= await User.findByIdAndUpdate(id,updates,{ new: true });
     console.log(updatedUser);
     if(!updatedUser)  return res.status(404).json({ message: "User not found" });
     res.status(200).json({message:"Profile updated Successfully"});
   }catch(error){
      console.log("error during updating the Profile",error);
      res.status(500).json({message:"Internal server error"});
   }
});

module.exports=router;