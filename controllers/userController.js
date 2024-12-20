const User=require("../models/User.js");
const generateToken=require("../utils/generateToken.js");

const registerUser=async(req,res) =>{
    const {name,email,password}=req.body;
    try {
        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:'User already exist'});
        }
        const user=await User.create({
            name,
            email,
            password,
        });

        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }else{
            res.status(400).json({message:'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const authUser=async (req,res) =>{
    const {email,password} =req.body;
    try {
        const user=await User.findOne({email});
        if (user &&(await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user.id),
            });
        }else{
            res.status(401).json({message:'Invalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}
const getUserProfile = async(req,res) =>{
    try {
        const user =await User.findById(req.user._id);
        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
            });
        }else{
            res.status(404).json({message:'User not found'})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
module.exports={
    registerUser,
    authUser,
    getUserProfile,
}