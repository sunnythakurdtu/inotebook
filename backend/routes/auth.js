const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router=express.Router();
const JWT_data='sunny is good bo$y'
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const User=require('../models/User.js')
//router1 create a new user using post
router.post('/createuser',[body('name',"invalid name").isLength({min:3}),body('email','invali email').isEmail(),body('password','password should be at least 5 character').isLength({min:5})],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether there is some error in it
    try {
        let success=false;
   //check whether email wit this user exists already
let user= await User.findOne({email:req.body.email});
if(user){
   return(res.status(400).json({success,error:"user exists with this email id already"}))
}
const salt=await bcrypt.genSalt(10)
const secPass= await bcrypt.hash(req.body.password,salt)
    user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    // .then(user => res.json(user)).catch(err=>{
    //     res.json({error:'please enter unique value'})
    // })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_data);
success=true;
    res.json({success,authtoken}) } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})
// router2 Authenticate user using post /api/auth/login
router.post('/login',[body('email','invali email').isEmail(),body('password','password should not be blank').exists()],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({error:"Login with correct cerendential"})
        }
        const passwordcompare= await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            success=false;
            res.status(400).json({success,error:"Login with correct cerendential"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_data);
    success=true
        res.json({success,authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
    
    
})
// router3 get loggged in user details using post /api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
    
    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
    
    
})
module.exports=router