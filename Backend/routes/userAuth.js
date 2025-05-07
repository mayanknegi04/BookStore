const jwt=require("jsonwebtoken");

const authenticateToken=(req,res,next)=>{
  const authHeader=req.headers["authorization"];
  const token=authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({message:"Authentication token required"});
  }

  //verify the token
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return res.status(401).json({message:err});
    }

    //attach user info to request object
    req.user=user;

    //continue to next middleware or route handler
    next();
  });
};

module.exports={authenticateToken};