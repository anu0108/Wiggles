require("dotenv").config();
const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");


module.exports.Login = async (req, res, next)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password ){
        return res.json({message:'All fields are required'})
    }

    const foundUser=await UserModel.findOne({email:email})
        
    if(foundUser){
        result= await bcrypt.compare(password,foundUser.password)
        if(result==true){
            const token=jwt.sign({
                email: foundUser.email,
            }, process.env.JWT_SECRET_KEY ,{
                expiresIn: 3*24*60*60,
            });
            res.cookie("token", token, {
                maxAge:1000*60*100, 
                withCredentials: true,
                httpOnly: false,
            });

            return res.json({status: 'ok', data: token})
        }
        else{
            console.log("login failed");
        }
        
    }
    else{
        console.log("User Not find");
    }
};
