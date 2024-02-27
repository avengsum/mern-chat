import jwt from 'jsonwebtoken';

const generateTokenSetCookie =  (userId, res) => {
  const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'15d',
  })

  console.log(process.env.SECRET)
  res.cookie("jwt",token,{
    maxAge:15*24*60*60*100,
    httpOnly:true,
    sameSite:"strict"
  })
}

export default generateTokenSetCookie;