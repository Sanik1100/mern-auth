import  jwt  from "jsonwebtoken";
const  userAuth=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json({success:false, message:'Not Authorized.Login Again'})
    }
    try {
    const tokenDecode=jwt.verify(token, process.env.JWT_SECRET);
    if(tokenDecode.id){
        //   req.body.userId=tokenDecode.userId;
        req.user = { id: tokenDecode.id };

    }else{
        return res.json({success:false, message:'Not Authorized.Login Again'});
    }
    next(); //execute controller function
        
    } catch (error) {
        return res.json({success:false, message:error.message}); 
    }

}
export default userAuth;