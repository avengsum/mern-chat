import jwt from 'jsonwebtoken'

const generateTokenSetCookie = async (userId, res) => {
  const token = jwt.sign(userId,process.env.SECRET,{
    expiresIn:"15d",
  })

  res.cookie("jwt",token,{
    maxAge:15*24*60*60*100,
    httpOnly:true,
    sameSite:"strict"
  })
}

export default generateTokenSetCookie;