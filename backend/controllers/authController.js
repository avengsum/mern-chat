import bcrypt from "bcryptjs"
import User from "../models/userModel";
import generateTokenSetCookie from "../utils/generateToken.js";

const signup = async (req,res) => {
  try {
    const {fullName , username, password,confirmPassword,gender} = req.body;

    if(password !== confirmPassword){
      return res.status(400).json({error:"Password don't match"})
    }

    const user = await User.findOne({username})

    if(user) {
      return res.status(400).json({error:"Usename already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password:hashPassword,
      gender,
      profilePic:gender === "male" ? boyProfilePic :girlProfilePic
    })

    generateTokenSetCookie(newUser._id,res)

    await newUser.save();

    res.status(201).json({
      _id:newUser._id,
      fullName:newUser.fullName,
      username:newUser.username,
      profilePic:newUser.profilePic,
      })

  } catch (error) {
    console.log("Error in signup controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }

}

const login = async (req,res) => {
  try {
    const {username,password} = req.body;

    const user = User.findOne({username});

    const isPasswordCorrect = await bcrypt.compare(password,user?.password)

    if(!user || !isPasswordCorrect){
      res.status(404).json({error:"user not found"})
    }

    generateTokenSetCookie(user._id,res);

    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      username:user.username,
      profilePic:user.profilePic,
    })
    
  } catch (error) {
    console.log("Error in login controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

const logout = async (req,res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
  } catch (error) {
    console.log("Error in logout controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

export {signup,login,logout}