import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({error:"Unauthorized - No Token Provided"})
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);

    if(!decode){
      return res.status(401).json({error:"Unauthorized - invalid token"})
    }

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;

    next();

  } catch (error) {
    console.log("Error in protectRoute controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

export default protectRoute;