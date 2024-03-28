const jwt = require('jsonwebtoken');
const JWT_data='sunny is good bo$y'
const fetchuser=(req,res,next)=>{
//get the user from jwt token and add it to req object
const authtoken=req.header('auth-token')
if(!authtoken){
    res.status(401).send({error:"please authenticate token"});}
    try {
        const data=jwt.verify(authtoken,JWT_data)
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate token"});
    }

}
module.exports=fetchuser