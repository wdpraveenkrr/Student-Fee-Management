import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json({success:false, message:"Not Authorized. Login Again"})
    }

try {

    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)

    // console.log(tokenDecode);
    
   
    if(!tokenDecode?.id){
        return res.json({success:false, message:"Not Authorized Login Again"})        
    }
   
    req.userId = tokenDecode.id
    
    next();

} catch (error) {
    res.json({success:false, message:error.message})    
}

}

export default adminAuth;